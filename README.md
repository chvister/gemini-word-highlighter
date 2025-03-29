# Gemini Word Highlighter Chrome Extension

This Chrome extension uses the Gemini AI model to analyze text on webpages, highlight important keywords, and display tooltips with explanations when hovering over the highlighted keywords.

## Prerequisites

- **Node.js v18 or higher**: Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).
- **Gemini API Key**: You need to generate an API key from the Gemini website.

### 1. Generate an API Key

- Go to the [Gemini API page](https://ai.google.dev/gemini-api/docs/api-key)
- Follow the instructions to generate your API key.
- Add to .env for Playwright

### 2. Install Dependencies

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

### 2. Build the Extension

```bash
npm run build
```

### 4. Load the Extension in Chrome

- Open Chrome and go to chrome://extensions/.
- Enable Developer Mode by toggling the switch in the top right corner.

- Click Load unpacked and select the dist/ folder generated after the build.
