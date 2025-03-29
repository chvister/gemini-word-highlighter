import { KeyWord } from "../shared/types";

export const highlightWords = (keywords: KeyWord[]) => {
  const style = document.createElement("style");
  style.textContent = `
    .gemini-highlight {
      background-color: #e6f3ff;
      padding: 2px 4px;
      border-radius: 4px;
      cursor: help;
      position: relative;
    }
    .gemini-highlight:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 0.9em;
      white-space: nowrap;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  const wordsMap = new Map(
    keywords.map((k) => [k.word.toLowerCase(), k.explanation])
  );
  const regex = new RegExp(
    `\\b(${keywords.map((k) => escapeRegExp(k.word)).join("|")})\\b`,
    "gi"
  );

  document.querySelectorAll("body *").forEach((element) => {
    if (
      element.childNodes.length === 1 &&
      element.childNodes[0].nodeType === Node.TEXT_NODE
    ) {
      const text = element.childNodes[0].textContent || "";
      const newHTML = text.replace(regex, (match) => {
        const explanation =
          wordsMap.get(match.toLowerCase()) || "Important keyword";
        return `<span class="gemini-highlight" data-tooltip="${explanation}">${match}</span>`;
      });

      if (newHTML !== text) {
        const wrapper = document.createElement("span");
        wrapper.innerHTML = newHTML;
        element.replaceChild(wrapper, element.childNodes[0]);
      }
    }
  });
};

export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
