import { EnhancedGenerateContentResponse } from "@google/generative-ai";
import { ApiResponse, KeyWord, MessageType } from "../shared/types";

export const processResult = (
  response: EnhancedGenerateContentResponse
): KeyWord[] => {
  const responseText = response.text();
  const cleanedText = responseText.replace(/```json|```/g, "");

  try {
    const parsed = JSON.parse(cleanedText);
    if (!Array.isArray(parsed?.keywords) || parsed.keywords.length === 0) {
      throw new Error("Invalid response format");
    }
    console.log("Parsed AI response successfully:", parsed.keywords);
    return parsed.keywords;
  } catch (error) {
    console.error("Parsing AI response failed:", error);
    return [];
  }
};

export const safeExecute = async <T>(
  fn: () => Promise<T>,
  errorMessage: string
): Promise<T | ApiResponse> => {
  try {
    return await fn();
  } catch (error) {
    console.error(errorMessage, error);
    return { success: false, error: errorMessage };
  }
};

export const handleError = (error: unknown): ApiResponse => {
  const message = error instanceof Error ? error.message : error?.toString();
  console.error(message);
  return { success: false, error: message };
};

export const getActiveTab = async (): Promise<chrome.tabs.Tab | null> => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      if (!tab?.id || !tab.url?.startsWith("http")) {
        console.warn("No valid active tab found");
        resolve(null);
        return;
      }

      resolve(tab);
    });
  });
};

export const getPageText = (tabId: number): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(
      tabId,
      { type: MessageType.GET_PAGE_TEXT },
      (response: ApiResponse<string>) => {
        if (chrome.runtime.lastError?.message) {
          console.warn(
            "Communication error with content script:",
            chrome.runtime.lastError.message
          );
          resolve(null);
          return;
        }

        resolve(response?.data || null);
      }
    );
  });
};
