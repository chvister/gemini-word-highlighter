import LoadingButton from "./LoadingButton";

const ApiKeyInput = ({
  apiKey,
  setApiKey,
  isLoading,
  saveApiKey,
  error,
}: {
  apiKey: string;
  setApiKey: (value: string) => void;
  isLoading: boolean;
  saveApiKey: () => void;
  error: string;
}) => (
  <div className="input-group">
    <input
      type="password"
      className="api-input"
      placeholder="Enter Gemini API Key"
      value={apiKey}
      onChange={(e) => setApiKey(e.target.value)}
      disabled={isLoading}
    />
    <LoadingButton onClick={saveApiKey} isLoading={isLoading}>
      Save API Key
    </LoadingButton>
    {error && <p className="error-message">{error}</p>}
  </div>
);
export default ApiKeyInput;
