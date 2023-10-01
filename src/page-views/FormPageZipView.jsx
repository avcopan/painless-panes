import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageHeader from "../components/FormPageHeader";
import FormPageInput from "../components/FormPageInput";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";

export default function FormPageZipView() {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.project);
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    if (project.zip) {
      setZipCode(project.zip);
    }
  }, [project]);

  return (
    <>
      <FormPageHeader text="Please enter your zip code:" />
      <FormPageInput
        placeholder="Enter zip here"
        value={zipCode}
        setValue={setZipCode}
      />
      <FormPageButtonsContainer>
        <FormPageNavigationButtons
          page={2}
          onClickNext={() =>
            dispatch(actions.updateProjectZipCode({ zipCode }))
          }
        />
      </FormPageButtonsContainer>
    </>
  );
}
