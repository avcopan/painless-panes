import React from "react";
import Webcam from "react-webcam";
import { measureWindow } from "../cv/cv";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageInput from "../components/FormPageInput";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";
import {
  updateWindowDimensions,
  updateWindowFrame,
} from "../store/sagas/window.saga";
import Button from "../components/Button";

export default function FormPageAddImages() {
  const dispatch = useDispatch();

  // image height, width, and desired frame states
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [desiredFrame, setDesiredFrame] = useState(null);
  const [dimensionsStatus, setDimensionsStatus] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [renderToast, setRenderToast] = useState(false);

  // file upload states

  // final blob file state
  const [imgSrc, setImgSrc] = useState(null);

  // base64 encoded image to show preview of captured image
  const [preview, setPreview] = useState(null);

  // state that controls whether the preview is displayed
  const [verifyImage, setVerifyImage] = useState(0);

  // const [imageEditPreview, setImageEditPreview] = useState(null);

  // page loading state - need to attach spinner (if needed)
  // const [loading, setLoading] = useState(true);

  // store selections
  const windows = useSelector((store) => store.allWindows);
  const currentWindowId = useSelector((store) => store.currentWindowId);
  const frameTypes = useSelector((store) => store.frames);
  const project = useSelector((store) => store.project);

  useEffect(() => {
    dispatch(actions.getFrames());
  }, []);

  useEffect(() => {
    const currentWindow = windows.find((window) => {
      return window.id == currentWindowId;
    });

    if (currentWindow && currentWindow.image !== null) {
      setImageHeight(currentWindow.height);
      setImageWidth(currentWindow.width);
      setDesiredFrame(currentWindow.desired_frame_id);
      setPreview(
        `https://painless-panes.s3.amazonaws.com/${currentWindow.image}`
      );
      setVerifyImage(true);
      setFormFilled(true);
    } else {
      setDimensionsStatus(false);
      setImageHeight("");
      setImageWidth("");
      setDesiredFrame(null);
      setPreview(null);
      setVerifyImage(null);
      // setLoading(false);
      setFormFilled(false);
    }
  }, [currentWindowId, windows]);

  const saveDimensions = () => {
    const dimensionsToSend = { currentWindowId, imageWidth, imageHeight };
    dispatch(updateWindowDimensions(dimensionsToSend));
    setDimensionsStatus(true);
    setRenderToast(true);
    setTimeout(() => {
      setRenderToast(false);
    }, 2000);
  };

  const updateFrameType = () => {
    const frameToSend = { currentWindowId, frameType: desiredFrame };
    dispatch(updateWindowFrame(frameToSend));
    setFormFilled(true);
    setRenderToast(true);
    setTimeout(() => {
      setRenderToast(false);
    }, 2000);
  };

  const addNewWindow = () => {
    dispatch(actions.addWindow({ project_id: project.id }));
    dispatch(actions.getAllWindows({ project_id: project.id }));
    setRenderToast(false);
  };

  // handles sending the image capture to AWS in base64
  const sendPhotoToServer = (event) => {
    event.preventDefault();

    // when a photo is submitted, the server adds a window to the current project
    // it then sets the current window ID in the redux store, and also
    // dispatches a POST request to upload the photo to S3
    const formData = new FormData();
    formData.append("image", imgSrc);
    formData.append("project_id", project.id);
    formData.append("current_window_id", currentWindowId);
    dispatch(actions.addWindowPhoto(formData));
    setVerifyImage(null);
    // dispatch(setCurrentWindowId(null));
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  // inits the webcam
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    setVerifyImage(true);
    const imageURI = webcamRef.current.getScreenshot();
    setPreview(imageURI);

    measureWindow(imageURI)
      .then((result) => {
        console.log("measureWindow return:", result);
        console.log(
          "Using annotated image?",
          result.annotated_image ? "Yes" : "No"
        );
        setImgSrc(
          result.annotated_image ? result.annotated_image : result.image
        );
      })
      .catch(console.error);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <FormPageHeader text="Take a photo of the window you desire to have replaced" />

      {/* {loading ? (
        <div>loading</div>
      ) : ( */}
      <>
        {!preview && (
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
        )}
        {preview && (
          <>
            <p>Preview:</p>
            <img src={preview} />
            {verifyImage && imgSrc && (
              <Button onClick={sendPhotoToServer} text="Save" />
            )}
            {verifyImage && (
              <Button
                onClick={() => {
                  setPreview(null);
                  setVerifyImage(null);
                }}
                text="Retake"
              />
            )}
          </>
        )}
        {!preview && <Button onClick={capture} text="Capture Image" />}
      </>
      {/* )} */}
      {/* <Button text="Add additional windows" onClick={addNewWindow}></Button> */}

      <FormPageInput
        placeholder="Window Width"
        value={imageWidth}
        setValue={setImageWidth}
        status={dimensionsStatus}
      />
      <FormPageInput
        placeholder="Window Height"
        value={imageHeight}
        setValue={setImageHeight}
        status={dimensionsStatus}
      />
      {imageWidth && imageHeight && !dimensionsStatus && (
        <Button onClick={saveDimensions} text="Save Dimensions" />
      )}
      {/* Conditional rendering of the ability to choose frame, dependent
      on the dimensions being set */}
      {(dimensionsStatus || formFilled) && (
        <Button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
          text="Click to choose desired frame"
        />
      )}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={updateFrameType}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              Save
            </button>
          </form>
          <h3 className="font-bold text-lg">Desired Window Frame</h3>
          <ul className="py-4">
            {/* --TODO-- Ensure that the user can only select one frame at a time */}
            {frameTypes.map((frameType) => (
              <li key={frameType.id}>
                <input
                  type="radio"
                  name="radio-1"
                  className="radio"
                  checked={frameType.id == desiredFrame}
                  onChange={(event) => {
                    setDesiredFrame(frameType.id);
                  }}
                />
                <label> {frameType.name}</label>
                <img src={frameType.image} alt={frameType.name} />
              </li>
            ))}
          </ul>
        </div>
      </dialog>
      {/* Toast that renders after the formFilled state is true  */}
      {renderToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Saved!</span>
          </div>
        </div>
      )}
      {/* Add window button renders when the form is filled */}
      {formFilled && (
        <Button text="Add another window" onClick={addNewWindow} />
      )}
      {/* Nav buttons render when the form is filled. Might need to
      relook at how we handle buttons, or change the buttons for this
      page prop-wise */}
      {formFilled && (
        <FormPageButtonsContainer>
          <FormPageNavigationButtons page={4} />
        </FormPageButtonsContainer>
      )}
    </>
  );
}
