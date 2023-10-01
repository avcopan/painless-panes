import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function FormPageNavigationButtons({
  page,
  onClickNext = undefined,
  showNextButton = true,
  nextButtonText = "Next",
  centerContent = null,
}) {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(`/form/${Number(page) - 1}`);
  };

  const navigateNext = () => {
    if (onClickNext) {
      onClickNext();
    }
    navigate(`/form/${Number(page) + 1}`);
  };

  return (
    <>
      <div>{page > 1 && <Button text="Back" onClick={navigateBack} />}</div>
      {centerContent}
      <div>
        {showNextButton && (
          <Button text={nextButtonText} onClick={navigateNext} />
        )}
      </div>
    </>
  );
}
