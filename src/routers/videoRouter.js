import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload
} from "../controllers/videoController";

const videoRouter = express.Router();


// -----< Watch >-----
videoRouter.get("/:id([0-9a-f]{24})", watch);


// -----< Edit >-----
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);


// -----< Upload >-----
videoRouter.route("/upload").get(getUpload).post(postUpload);


export default videoRouter;