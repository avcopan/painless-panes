export default function Stepper({ page }) {
  return (
    <>
      <div className="divider" />
      <ul className="steps">
        <li className={page === "1" ? "step step-primary" : "step"}>Email</li>
        <li className={page === "2" ? "step step-primary" : "step"}>Zip</li>
        <li
          className={
            page === "3" || page === "4" ? "step step-primary" : "step"
          }
        >
          Windows
        </li>
        <li className={page === "5" ? "step step-primary" : "step"}>Review</li>
        <li className={page === "6" ? "step step-primary" : "step"}>
          Confirmation
        </li>
      </ul>
    </>
  );
}
