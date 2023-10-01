import { useDispatch, useSelector } from "react-redux";
import FormPageHeader from "../components/FormPageHeader";

export default function SubmitPageView() {
  return (
    <>
      <FormPageHeader text="Thank you for choosing our services!" />
      <p className="mb-5">
        We have received your request and sent you a confirmation email.
        Our team is diligently working on preparing a pricing estimate for you.
      </p>
      <p>
        You can expect an email within the next 72 hours with a qualifying
        estimate.
      </p>
    </>
  );
}
