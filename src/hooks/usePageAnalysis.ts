import { useState } from "react";
import { ApiResponse, KeyWord, MessageType } from "../shared/types";

export const usePageAnalysis = () => {
  const [keywords, setKeywords] = useState<KeyWord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzePage = async () => {
    setIsLoading(true);
    setError("");

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab?.id) {
      setError("No active tab found");
      setIsLoading(false);
      return;
    }

    chrome.runtime.sendMessage(
      { type: MessageType.ANALYZE_TEXT },
      (response: ApiResponse) => {
        if (chrome.runtime.lastError) {
          setError(chrome.runtime.lastError.message || "Connection failed");
        } else if (response?.error) {
          setError(response.error);
        } else if (response.success) {
          setKeywords(response.data as KeyWord[]);
        }
        setIsLoading(false);
      }
    );
  };

  return { keywords, isLoading, error, analyzePage };
};
