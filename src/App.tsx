import "./App.css";
import AnalysisResults from "./components/AnalysisResults";
import ApiKeyInput from "./components/ApiKeyInput";
import LoadingButton from "./components/LoadingButton";
import { useApiKey } from "./hooks/useApiKey";
import { usePageAnalysis } from "./hooks/usePageAnalysis";

const App = () => {
  const {
    apiKey,
    setApiKey,
    isKeyValid,
    isLoading: isKeyLoading,
    error: keyError,
    saveApiKey,
  } = useApiKey();
  const {
    keywords,
    isLoading: isAnalyzing,
    error: analysisError,
    analyzePage,
  } = usePageAnalysis();

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">📜 Page Analyzer 🌟</h1>
      </div>

      {!isKeyValid ? (
        <ApiKeyInput
          apiKey={apiKey}
          setApiKey={setApiKey}
          isLoading={isKeyLoading}
          saveApiKey={saveApiKey}
          error={keyError}
        />
      ) : (
        <>
          <LoadingButton onClick={analyzePage} isLoading={isAnalyzing}>
            Analyze Page
          </LoadingButton>
          <AnalysisResults
            keywords={keywords}
            isLoading={isAnalyzing}
            error={analysisError}
          />
        </>
      )}
    </div>
  );
};
export default App;
