import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";

export default function HowToMeasureWindows() {
  const VIDEO_ID = "y4DLls4kr84";
  return (
    <>
      <p>
        <a
          href="/printable-scale-tag.pdf"
          download
          className="link link-secondary"
        >
          Click here
        </a>{" "}
        to download and print a scale tag for photo measurement.
      </p>
      <br />
      <p>Alternatively, here's how to measure the windows yourself:</p>
      <iframe
        className="w-full aspect-video"
        src="https://www.youtube.com/embed/y4DLls4kr84"
      ></iframe>
      <FormPageButtonsContainer>
        <FormPageNavigationButtons page={3} />
      </FormPageButtonsContainer>
    </>
  );
}
