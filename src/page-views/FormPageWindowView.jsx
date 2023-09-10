import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageInput from "../components/FormPageInput";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";

export default function FormPageWindowView() {
  const dispatch = useDispatch();
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  return (
    <>
      <FormPageHeader text="Window Size" />
      <FormPageInput
        placeholder="Height"
        value={height}
        setValue={setHeight}
        type="text"
      />
      <FormPageInput
        placeholder="Width"
        value={width}
        setValue={setWidth}
        type="text"
      />
      <FormPageButtonsContainer>
        <FormPageNavigationButtons page={4} />
      </FormPageButtonsContainer>
    </>
  );
}
