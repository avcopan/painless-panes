/**
 * Window-related routes
 *
 *Prefix: /api/window
 *
 *
 *@api {POST} /api/window/:projectId Create a new window for this project and get the new window’s ID
 */
const query = require("../queries/window.query.cjs");

const express = require("express");
const {
  requireAuthenticationMiddleware,
} = require("../middlewares/auth.middleware.cjs");

// AWS Declarations
const {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const router = express.Router();

/** 
@apiParam {Number} projectId The project ID to create this window for
@apiSuccess {Object} response The window ID: {“id”: <Number>}
*/
router.post(
  "/:projectId",
  requireAuthenticationMiddleware,
  async (req, res) => {
    const projectId = req.params.projectId;
    console.log(projectId);
    try {
      const windowId = await query.addWindow(projectId);
      res.status(200).send(windowId);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

/** 
@api {GET} /api/window/:projectId Get all windows for a project
@apiSuccess {Object[]} response A list of window objects:
[
{"id": <Number>, "image": <String>, "height": <Number>, "width": <Number>, "desired_frame_id": <Number>, "project_id": <Number>},
...
]
*/

router.get("/:projectId", requireAuthenticationMiddleware, async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await query.getListOfWindows(projectId);
    // console.log(`Get all windows for project ${projectId}:`, project);
    res.send(project);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post(
  `/photoUpload/aws`,
  requireAuthenticationMiddleware,
  async (req, res) => {
    try {
      const imageData = req.files.image.data;
      const imageKey1 = `${req.user.id}/${req.files.image.md5}`; // folder/file
      const command1 = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: imageKey1, // folder/file
        Body: imageData, // image data to upload
      });
      const uploadResult1 = await s3Client.send(command1);

      const annotatedImageData = req.files.annotated_image.data;
      const imageKey2 = `${req.user.id}/${req.files.annotated_image.md5}`; // folder/file
      const command2 = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: imageKey2, // folder/file
        Body: annotatedImageData, // image data to upload
      });
      const uploadResult2 = await s3Client.send(command2);

      console.log("WHAT IS UPLOAD RESULT", uploadResult1);
      const response1 = {
        message: "File 1 uploaded successfully",
        result: uploadResult1,
      };

      const response2 = {
        message: "File 2 uploaded successfully",
        result: uploadResult2,
      };
      console.log("WHAT IS RESPONSE 1", response1);
      console.log("WHAT IS RESPONSE.RESULT", response1.result.ETag);
      res
        .status(200)
        .json({ originalImageKey: imageKey1, annotatedImageKey: imageKey2 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

// send back the bucket path to store in the database
// used for accessing the photos
// s3Client
//   .send(command)
//   .then((response) => {
//     res.send(imageKey).status(200);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
//   const annotatedImageData = req.files.annotated_image.data
//   const command2 = new PutObjectCommand({
//     Bucket: process.env.AWS_BUCKET,
//     Key: imageKey, // folder/file
//     Body: annotatedImageData, // image data to upload
//   });
//   s3Client
//   .send(command2)
//   .then((response) => {
//     res.send(imageKey).status(200);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// });

/**
 * Update the specified column for the specified window
 * @param {Object} windowPathResponse A string containing the folder/file name of the path to the image in AWS S3
 *   'folder/file/ <String>
 */ router.put(
  "/:windowId/:columnToUpdate",
  requireAuthenticationMiddleware,
  async (req, res) => {
    const windowId = req.params.windowId;
    const columnToUpdate = req.params.columnToUpdate;
    try {
      if (columnToUpdate === "height" || columnToUpdate === "width") {
        query.updateWindow(windowId, columnToUpdate, req.body);
      } else if (columnToUpdate === "desired_frame_id") {
        console.log(req.body);
        query.updateWindow(windowId, columnToUpdate, {
          desiredFrameId: Number(req.body.desiredFrameId),
        });
      } else {
        const bodyToSend = req.body.data;
        console.log(bodyToSend);
        query.updateWindow(windowId, columnToUpdate, {
          imagePath: bodyToSend,
        });
      }
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
