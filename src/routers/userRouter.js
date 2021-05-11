import express from "express";
import {
  getEdit,
  postEdit,
  finishGithubLogin,
  logout,
  see,
  startGithubLogin
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddelware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware,logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddelware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddelware, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;