import { MessageType, ApiRequest, ApiResponse, KeyWord } from "../shared/types";
import { highlightWords } from "./highlight";

const registerEventListeners = () => {
  chrome.runtime.onMessage.addListener(
    (
      message: ApiRequest,
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response?: ApiResponse) => void
    ) => {
      console.log("Message received:", message);

      if (message.type === MessageType.GET_PAGE_TEXT) {
        sendResponse({ success: true, data: document.body.innerText });
      }

      if (message.type === MessageType.HIGHLIGHT_KEYWORDS) {
        console.log("Keywords to highlight:", message.data);
        highlightWords(message.data as KeyWord[]);
        sendResponse({ success: true });
      }

      return true;
    }
  );
};

registerEventListeners();
