import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";

export default function HowToMeasureWindows() {
  const VIDEO_ID = "y4DLls4kr84";
  return (
    <>
      <p>
        We will try to measure your window from the photo on the next page, but
        here's how to measure it yourself.
      </p>
      <br />
      <iframe
        className="w-screen aspect-video"
        src="https://www.youtube.com/embed/y4DLls4kr84"
      ></iframe>
      <FormPageButtonsContainer>
        <FormPageNavigationButtons page={3} />
      </FormPageButtonsContainer>
    </>
  );
}
