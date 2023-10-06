import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import Button from "../components/Button";
import FormPageHeader from "../components/FormPageHeader";
import FormPageButtonsContainer from "../components/FormPageButtonsContainer";
import FormPageNavigationButtons from "../components/FormPageNavigationButtons";
import FormPageInput from "../components/FormPageInput";

export default function FormPageEmailView() {
  const user = useSelector((store) => store.user);

  return user.email ? (
    <FormPageVerifiedEmailView email={user.email} />
  ) : (
    <FormPageUnverifiedEmailView />
  );
}

function FormPageVerifiedEmailView({ email }) {
  return (
    <>
      <FormPageHeader text={`Your email ${email} has been verified!`} />
      <FormPageButtonsContainer>
        <FormPageNavigationButtons page={1} />
      </FormPageButtonsContainer>
    </>
  );
}

function FormPageUnverifiedEmailView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const sendVerificationEmail = () => {
    // Send the email
    const payload = { email };
    dispatch(actions.sendEmail(payload));
    // Show dialog box instructing the user to check their email
    window.modal1.showModal();
  };

  return (
    <>
      <FormPageHeader text="Please enter your email:" />
      <FormPageInput
        placeholder="Enter email here"
        value={email}
        setValue={setEmail}
      />
      <FormPageButtonsContainer>
        <div></div>
        <Button text="Verify" onClick={sendVerificationEmail} />
        {/* Dialog box opens on click */}
        <dialog id="modal1" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* If there is a button in form, it will close the dialog box */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <p className="py-4">
              Click the link we sent to {email} to verify your email address.
            </p>
            <p>
              If you are on a PC, open the link on your phone for best results.
            </p>
          </div>
        </dialog>
      </FormPageButtonsContainer>
    </>
  );
}
