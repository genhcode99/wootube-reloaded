import express from "express";

const userRouter = express.Router();

const handelEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handelEditUser);

export default userRouter;