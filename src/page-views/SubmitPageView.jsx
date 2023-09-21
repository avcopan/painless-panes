import { useDispatch, useSelector } from "react-redux";
import FormPageHeader from "../components/FormPageHeader";

export default function SubmitPageView() {
  return (
    <>
      <FormPageHeader text="Thank you for choosing our services!" />
      <p className="mb-5">
        We have successfully received your request. A confirmation email has
        been sent, and our team is diligently working on measuring your windows
        and preparing an upfront pricing estimate tailored to your needs.
      </p>
      <p>
        You can expect an email within the next 72 hours with a qualifying
        estimate.
      </p>
    </>
  );
}
