import express from "express";
import {
  watch,
  getEdit,
  postEdit
} from "../controllers/videoController";

const videoRouter = express.Router();

// Watch
videoRouter.get("/:id(\\d+)", watch);

//Edit
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;