export const ANALYSIS_PROMPT = (text: string) => `
Analyze the following text, which represents the content of a webpage. 
Identify the 5 most important keywords or phrases that best capture the essence of the page's content.
For each keyword or phrase, provide a brief explanation of why it is important in the context of the page's subject matter.

Respond ONLY with valid JSON in this format:
{ 
  "keywords": [
    { 
      "word": "keyword", 
      "explanation": "reason for its significance on this page"
    }
  ] 
}

Text: ${text.substring(0, 10000)}
`;
