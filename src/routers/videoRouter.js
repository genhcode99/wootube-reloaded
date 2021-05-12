import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo
} from "../controllers/videoController";

import {
  protectorMiddleware,
  videoUpload
} from "../middlewares";

const videoRouter = express.Router();


// -----< Watch >-----
videoRouter.get("/:id([0-9a-f]{24})", watch);


// -----< Edit >-----
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);


// -----< Upload >-----
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);


// -----< Delete >-----
videoRouter
  .all(protectorMiddleware)
  .get("/:id([0-9a-f]{24})/delete", deleteVideo)


export default videoRouter;