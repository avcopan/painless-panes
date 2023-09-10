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
  const user = req.user;
  try {
    const project = await query.getListOfWindows(user.projectId);
    console.log(`Get all windows for project ${user.projectId}:`, project);
    res.send(project);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});



module.exports = router;
