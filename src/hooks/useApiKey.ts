import { useState, useEffect } from "react";
import { MessageType } from "../shared/types";

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState("");
  const [isKeyValid, setIsKeyValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    chrome.storage.local.get(["apiKey"], (result) => {
      if (result.apiKey) {
        setApiKey(result.apiKey);
        setIsKeyValid(true);
      }
      setIsLoading(false);
    });
  }, []);

  const saveApiKey = async () => {
    if (!apiKey.trim()) return;

    setIsLoading(true);
    setError("");

    chrome.runtime.sendMessage(
      { type: MessageType.CHECK_API_KEY, data: apiKey },
      (response) => {
        console.log("Message received:", response);
        if (chrome.runtime.lastError) {
          setError(chrome.runtime.lastError.message || "Connection failed");
        } else if (response?.error) {
          setError(response.error);
        } else {
          chrome.storage.local.set({ apiKey });
          setIsKeyValid(true);
        }
        setIsLoading(false);
      }
    );
  };

  return { apiKey, setApiKey, isKeyValid, isLoading, error, saveApiKey };
};
