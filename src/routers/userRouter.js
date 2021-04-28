import express from "express";
import { edit, removeUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", removeUser );

export default userRouter;