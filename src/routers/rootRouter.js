import express from "express";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

// -----< Home >-----
rootRouter.get("/", home);


// -----< Join >-----
rootRouter.route("/join").get(getJoin).post(postJoin);


// -----< Log In >-----
rootRouter.route("/login").get(getLogin).post(postLogin);


rootRouter.get("/search", search)


export default rootRouter;