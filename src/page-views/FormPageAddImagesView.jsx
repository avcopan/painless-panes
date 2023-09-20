import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageInput from "../components/FormPageInput";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";
import AddWindowImage from "../components/AddImage";
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

  // store selections
  const windows = useSelector((store) => store.allWindows);
  const currentWindowId = useSelector((store) => store.currentWindowId);
  const frameTypes = useSelector((store) => store.frames);

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
    } else {
      setDimensionsStatus(false);
      setImageHeight("");
      setImageWidth("");
      setDesiredFrame(null);
    }
  }, [currentWindowId, windows]);

  const saveDimensions = () => {
    const dimensionsToSend = { currentWindowId, imageWidth, imageHeight };
    dispatch(updateWindowDimensions(dimensionsToSend));
    setDimensionsStatus(true);
  };

  const updateFrameType = () => {
    const frameToSend = { currentWindowId, frameType: desiredFrame };
    dispatch(updateWindowFrame(frameToSend));
  };

  return (
    <>
      <FormPageHeader text="Take a photo of the window you desire to have replaced" />

      <AddWindowImage />
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
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <Button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
        text="Click to choose desired frame"
      ></Button>
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
      <FormPageButtonsContainer>
        <FormPageNavigationButtons page={4} />
      </FormPageButtonsContainer>
    </>
  );
}
