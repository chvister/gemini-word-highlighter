import { KeyWord } from "../shared/types";

const AnalysisResults = ({
  keywords,
  isLoading,
  error,
}: {
  keywords: KeyWord[];
  isLoading: boolean;
  error: string;
}) => (
  <div className="analysis-section">
    {error && <p className="error-message">{error}</p>}

    {keywords.length > 0 ? (
      <div className="word-list">
        {keywords.map(({ word, explanation }) => (
          <div key={word} className="word-item">
            <div className="word-text">{word}</div>
            <div className="word-explanation">{explanation}</div>
          </div>
        ))}
      </div>
    ) : (
      !isLoading && (
        <p className="text-gray-500 text-sm">
          Click "Analyze Page" to find important keywords
        </p>
      )
    )}

    {isLoading && keywords.length === 0 && (
      <p className="loading-state">Processing content...</p>
    )}
  </div>
);
export default AnalysisResults;
