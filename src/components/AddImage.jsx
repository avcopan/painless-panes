// import React from "react";
// import Webcam from "react-webcam";
// import Button from "./Button";
// import { useState, useEffect } from "react";
// import actions from "../store/actions";
// import { useDispatch, useSelector } from "react-redux";
// import { measureWindow } from "../cv/cv";

// export default function AddWindowImage() {
//   const dispatch = useDispatch();
//   // file upload states

//   // final blob file state
//   const [imgSrc, setImgSrc] = useState(null);

//   // base64 encoded image to show preview of captured image
//   const [preview, setPreview] = useState(null);

//   // state that controls whether the preview is displayed
//   const [verifyImage, setVerifyImage] = useState(0);

//   // const [imageEditPreview, setImageEditPreview] = useState(null);

//   // page loading state - need to attach spinner (if needed)
//   const [loading, setLoading] = useState(true);

//   // store selections
//   const project = useSelector((store) => store.project);
//   const currentWindowId = useSelector((store) => store.currentWindowId);
//   const windows = useSelector((store) => store.allWindows);

//   // const addNewWindow = () => {
//   //   dispatch(actions.addWindow({ project_id: project.id }));
//   //   setPreview(null);
//   //   setVerifyImage(null);
//   // };

//   // handles sending the image capture to AWS in base64
//   const sendPhotoToServer = (event) => {
//     event.preventDefault();

//     // when a photo is submitted, the server adds a window to the current project
//     // it then sets the current window ID in the redux store, and also
//     // dispatches a POST request to upload the photo to S3
//     const formData = new FormData();
//     formData.append("image", imgSrc);
//     formData.append("project_id", project.id);
//     formData.append("current_window_id", currentWindowId);
//     dispatch(actions.addWindowPhoto(formData));
//     setVerifyImage(null);
//     // dispatch(setCurrentWindowId(null));
//   };

//   const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "user",
//   };

//   // inits the webcam
//   const webcamRef = React.useRef(null);

//   // event handler for taking a picture and updating the imgSrc state to the
//   // base64 value of the image
//   const capture = React.useCallback(() => {
//     setVerifyImage(true);
//     const imageURI = webcamRef.current.getScreenshot();
//     setPreview(imageURI);

//     measureWindow(imageURI)
//       .then((result) => {
//         console.log("measureWindow return:", result);
//         console.log(
//           "Using annotated image?",
//           result.annotated_image ? "Yes" : "No"
//         );
//         setImgSrc(
//           result.annotated_image ? result.annotated_image : result.image
//         );
//       })
//       .catch(console.error);
//   }, [webcamRef, setImgSrc]);

//   useEffect(() => {
//     const currentWindow = windows.find(
//       (window) => {
//         return window.id == currentWindowId;
//       },
//       [currentWindowId]
//     );

//     // setImageEditPreview(currentWindow.image);
//     if (currentWindow && currentWindow.image !== null) {
//       setPreview(
//         `https://painless-panes.s3.amazonaws.com/${currentWindow.image}`
//       );
//       setVerifyImage(true);
//     } else {
//       setPreview(null);
//       setVerifyImage(null);
//     }
//     setLoading(false);
//   }, [currentWindowId]);

//   return (
//     <>
//       {loading ? (
//         <div>loading</div>
//       ) : (
//         <>
//           {!preview && (
//             <Webcam
//               audio={false}
//               height={720}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width={1280}
//               videoConstraints={videoConstraints}
//             />
//           )}
//           {preview && (
//             <>
//               <p>Preview:</p>
//               <img src={preview} />
//               {verifyImage && imgSrc && (
//                 <Button onClick={sendPhotoToServer} text="Save" />
//               )}
//               {verifyImage && (
//                 <Button
//                   onClick={() => {
//                     setPreview(null);
//                     setVerifyImage(null);
//                   }}
//                   text="Retake"
//                 />
//               )}
//             </>
//           )}
//           {!preview && <Button onClick={capture} text="Capture Image" />}
//         </>
//       )}
//       {/* <Button text="Add additional windows" onClick={addNewWindow}></Button> */}
//     </>
//   );
// }
