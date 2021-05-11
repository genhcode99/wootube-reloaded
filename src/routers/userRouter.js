import express from "express";
import {
  getEdit,
  postEdit,
  finishGithubLogin,
  logout,
  see,
  startGithubLogin,
  getchangePassword,
  postchangePassword
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddelware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware,logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getchangePassword)
  .post(postchangePassword);
userRouter.get("/github/start", publicOnlyMiddelware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddelware, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;