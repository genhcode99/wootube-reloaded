//--------------------< Import >--------------------
import express from "express";
import { registerView, createComment } from "../controllers/videoController"

const apiRouter = express.Router();

//--------------------< Views >--------------------
apiRouter.post("/videos/:id([0-9a-f]{24})/views", registerView);

//--------------------< Comments >--------------------
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;