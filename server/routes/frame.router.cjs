const express = require("express");
const query = require("../queries/frame.query.cjs")

const router = express.Router();

/**
 * @api {get} /frame - Get all frames from database
 */
router.get("/", async (_, res) => {
    try {
      frames = await query.getFrame();
      res.status(200).send(frames);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  module.exports = router;