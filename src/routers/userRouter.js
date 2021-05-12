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

import {
  protectorMiddleware,
  publicOnlyMiddelware,
  uploadFile
} from "../middlewares";

const userRouter = express.Router();

// Log Out
userRouter.get("/logout", protectorMiddleware,logout);

// Edit Profile
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFile.single("avatar"), postEdit);

// Change Password
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getchangePassword)
  .post(postchangePassword);

// GitHub
userRouter
  .get("/github/start", publicOnlyMiddelware, startGithubLogin);

userRouter
  .get("/github/finish", publicOnlyMiddelware, finishGithubLogin);

// See
userRouter
  .get("/:id", see);

export default userRouter;