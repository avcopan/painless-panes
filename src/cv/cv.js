import axios from "axios";

// The address of the deployed Painless Panes CV server
const CV_SERVER_ADDRESS =
  "https://painless-panes-cv-25b4b9560fd0.herokuapp.com";

/** Measure a window through a call to the CV API
 *
 * @param {*} imageURI A URI of the image
 * @returns {Object} The original image and, if the measurement was successful, also the
 *    annotated image, the width, and the height:
 *      {
 *        image: <Blob>,
 *        annotated_image: <Blob>,
 *        width: <Number>,          # if successful
 *        height: <Number>,         # if successful
 *        error_message: <String>   # if unsuccessful
 *      }
 */
export async function measureWindow(imageURI) {
  // Get the original image as a Blob
  const imageBlob = await (await fetch(imageURI)).blob();

  // Create form data for sending the image in a POST request
  const formData = new FormData();
  formData.append("image", imageBlob);

  // No matter what, return the original image as a blob
  const measurementData = { image: imageBlob };

  try {
    // Send the POST request and get the response
    const response = await axios.post(
      `${CV_SERVER_ADDRESS}/cv/api/window/measure`,
      formData,
      {
        responseType: "blob",
      }
    );

    measurementData.annotated_image = await response.data;
    measurementData.width = response.headers.width;
    measurementData.height = response.headers.height;
    measurementData.error_message = response.headers.error_message;
  } catch (error) {
    console.error(error);
  }

  return measurementData;
}
