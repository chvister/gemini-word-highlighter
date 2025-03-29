import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiRequest, ApiResponse, MessageType } from "../shared/types";
import {
  getActiveTab,
  getPageText,
  handleError,
  processResult,
  safeExecute,
} from "./helpers";
import { ANALYSIS_PROMPT } from "./constants";

let genAI: GoogleGenerativeAI;

const initializeGenAI = () => {
  chrome.storage.local.get(["apiKey"], (result) => {
    if (result.apiKey) {
      genAI = new GoogleGenerativeAI(result.apiKey);
      console.log("API key loaded from storage and genAI initialized");
    } else {
      console.warn("No API key found in storage");
    }
  });
};

const validateApiKey = (apiKey: string): Promise<ApiResponse> => {
  if (!apiKey) return Promise.resolve(handleError("API key is missing"));

  return safeExecute(async () => {
    const testAI = new GoogleGenerativeAI(apiKey);
    await testAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent("Test connection");
    genAI = testAI;
    console.log("API key validated successfully");
    return { success: true };
  }, "Invalid API key");
};

const analyzeActiveTab = async (): Promise<ApiResponse> => {
  const tab = await getActiveTab();
  if (!tab) return handleError("No valid active tab found");

  console.log(`Sending GET_PAGE_TEXT message to tab ${tab.id}`);
  const text = await getPageText(tab.id!);
  if (!text) return handleError("Failed to retrieve page text");

  console.log("Page text received, preparing AI prompt");
  const prompt = ANALYSIS_PROMPT(text);

  if (!genAI) return handleError("API key not initialized");

  return safeExecute(async () => {
    const result = await genAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent(prompt);
    const keywords = processResult(result.response);
    console.log("Analysis successful, keywords:", keywords);

    chrome.tabs.sendMessage(tab.id!, {
      type: MessageType.HIGHLIGHT_KEYWORDS,
      data: keywords,
    });

    return { success: true, data: keywords };
  }, "Analysis failed");
};

const registerEventListeners = () => {
  chrome.runtime.onMessage.addListener(
    (
      request: ApiRequest<string>,
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response: ApiResponse) => void
    ) => {
      switch (request.type) {
        case MessageType.CHECK_API_KEY:
          validateApiKey(request.data).then(sendResponse).catch(handleError);
          return true;

        case MessageType.ANALYZE_TEXT:
          analyzeActiveTab().then(sendResponse).catch(handleError);
          return true;

        default:
          return false;
      }
    }
  );
};

initializeGenAI();
registerEventListeners();
