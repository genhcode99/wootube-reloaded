import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload
} from "../controllers/videoController";

const videoRouter = express.Router();

// -----< Upload >-----
videoRouter.route("/upload").get(getUpload).post(postUpload);


// -----< Watch >-----
videoRouter.get("/:id", watch);


// -----< Edit >-----
videoRouter.route("/:id/edit").get(getEdit).post(postEdit);


export default videoRouter;