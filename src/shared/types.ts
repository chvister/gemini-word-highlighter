export enum MessageType {
  ANALYZE_TEXT = "ANALYZE_TEXT",
  CHECK_API_KEY = "CHECK_API_KEY",
  HIGHLIGHT_KEYWORDS = "HIGHLIGHT_KEYWORDS",
  GET_PAGE_TEXT = "GET_PAGE_TEXT",
}

export interface KeyWord {
  word: string;
  explanation: string;
}

export interface ApiRequest<T = string | KeyWord[]> {
  type: MessageType;
  data: T;
}

export interface ApiResponse<T = string | KeyWord[]> {
  error?: string;
  success: boolean;
  data?: T;
}
