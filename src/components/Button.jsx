export default function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn btn-primary my-1.5">
      {text}
    </button>
  );
}
