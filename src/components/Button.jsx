export default function Button({
  text,
  onClick,
  className = "btn-primary my-1",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
