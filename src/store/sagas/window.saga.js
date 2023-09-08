import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { setCurrentWindow } from "../reducers/window.reducer";

// action types
export const ADD_WINDOW = "ADD_WINDOW";

// action functions
export const addWindow = (payload) => {
  return { type: ADD_WINDOW, payload };
};

// action worker sagas
export function* addWindowSaga(action) {
  const project_id = action.payload.project_id;
  try {
    const response = yield axios.post(
      `/api/window/:${action.payload.project_id}`,
      action.payload
    );
    const windowId = yield response.data;
    // yield put(updateWindows({ proj_id: project_id, window_id: windowId }));
    // setCurrentWindow will work better for our purposes - it will return only
    // the current window's ID. we can utilize specific queries to GET windows by
    // project
    yield put(setCurrentWindow({ window_id: windowId }));
    console.log("Window ID from server --> ", windowId);
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* windowSaga() {
  yield takeLatest(ADD_WINDOW, addWindowSaga);
}
