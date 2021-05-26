//--------------------< Import >--------------------
import express from "express";
import { registerView, createComment, deleteComment } from "../controllers/videoController"

const apiRouter = express.Router();

//--------------------< Views >--------------------
apiRouter.post("/videos/:id([0-9a-f]{24})/views", registerView);

//--------------------< Comments >--------------------
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

//--------------------< Delete Comments >--------------------
apiRouter.delete("/comment/:id([0-9a-f]{24})", deleteComment);

export default apiRouter;