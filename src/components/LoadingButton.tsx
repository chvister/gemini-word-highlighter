const LoadingButton = ({
  onClick,
  isLoading,
  children,
}: {
  onClick: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}) => (
  <button className="btn" onClick={onClick} disabled={isLoading}>
    {isLoading ? (
      <>
        <span className="loader"></span> Loading...
      </>
    ) : (
      children
    )}
  </button>
);
export default LoadingButton;
