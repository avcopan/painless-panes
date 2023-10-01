export default function Stepper({ page }) {
  const pageNum = Number(page);

  return (
    <ul className="steps">
      <li className={pageNum >= 1 ? "step step-primary" : "step"}>Email</li>
      <li className={pageNum >= 2 ? "step step-primary" : "step"}>Zip</li>
      <li
        className={pageNum >= 3 || pageNum >= 4 ? "step step-primary" : "step"}
      >
        Windows
      </li>
      <li className={pageNum >= 5 ? "step step-primary" : "step"}>Review</li>
      <li className={pageNum >= 6 ? "step step-primary" : "step"}>
        Confirmation
      </li>
    </ul>
  );
}
