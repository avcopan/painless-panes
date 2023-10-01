export default function Button({ text, onClick, className = "my-1" }) {
  return (
    <button onClick={onClick} className={`btn btn-primary ${className}`}>
      {text}
    </button>
  );
}
