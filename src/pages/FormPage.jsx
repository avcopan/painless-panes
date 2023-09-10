import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageEmailView from "../page-views/FormPageEmailView";
import FormPageZipView from "../page-views/FormPageZipView";
import FormPageWindowView from "../page-views/FormPageWindowView";

export default function FormPage() {
  const { page = 1 } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUser());
    dispatch(actions.getProject());
  }, [page]);

  return (
    <div className="w-full pl-12 pr-12 flex flex-col items-center justify-center">
      {page == 1 && <FormPageEmailView />}
      {page == 2 && <FormPageZipView />}
      {page == 4 && <FormPageWindowView />}
    </div>
  );
}
