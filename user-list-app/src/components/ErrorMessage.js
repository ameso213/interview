import "./ErrorMessage.css";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p className="error-box__title">Couldn't load the directory</p>
      <p className="error-box__detail">{message}</p>
      {onRetry && (
        <button type="button" className="error-box__retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}