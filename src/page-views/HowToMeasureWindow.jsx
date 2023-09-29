import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";

export default function HowToMeasureWindows() {
  const VIDEO_ID = "y4DLls4kr84";
  return (
    <>
      <FormPageHeader text="How do we measure a window?" />
      <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/y4DLls4kr84"
      ></iframe>
      <FormPageButtonsContainer>
        <FormPageNavigationButtons page={3} />
      </FormPageButtonsContainer>
    </>
  );
}
