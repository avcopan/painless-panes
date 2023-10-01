export default function Button({ text, onClick, className = "btn-primary my-1" }) {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {text}
    </button>
  );
}
