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
videoRouter.get("/:id(\\d+)", watch);


// -----< Edit >-----
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);


// -----< Upload >-----
videoRouter.route("/upload").get(getUpload).post(postUpload);


export default videoRouter;