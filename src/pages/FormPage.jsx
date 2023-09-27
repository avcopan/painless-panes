import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import FormPageEmailView from "../page-views/FormPageEmailView";
import FormPageZipView from "../page-views/FormPageZipView";
import HowToMeasureWindows from "../page-views/HowToMeasureWindow";
import FormPageAddImages from "../page-views/FormPageAddImagesView";
import FormPageConfirmation from "../page-views/FormPageConfirmation";
import SubmitPageView from "../page-views/SubmitPageView";

export default function FormPage() {
  const { page = 1 } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((store) => store.project);

  useEffect(() => {
    dispatch(actions.getUser());
    dispatch(actions.getProject());
  }, [page]);

  useEffect(() => {
    if (project.id) {
      dispatch(actions.getAllWindows({ project_id: project.id }));
    }
  }, [project]);

  useEffect(() => {
    dispatch(actions.getFrames());
  }, []);

  return (
    <div className="w-full pl-12 pr-12 flex flex-col items-center justify-center">
      {page == 1 && <FormPageEmailView />}
      {page == 2 && <FormPageZipView />}
      {page == 3 && <HowToMeasureWindows />}
      {page == 4 && <FormPageAddImages />}
      {page == 5 && <FormPageConfirmation />}
      {page == 6 && <SubmitPageView />}
    </div>
  );
}
