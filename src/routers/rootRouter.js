import express from "express";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { publicOnlyMiddelware } from "../middlewares";

const rootRouter = express.Router();

// -----< Home >-----
rootRouter.get("/", home);


// -----< Join >-----
rootRouter.route("/join").all(publicOnlyMiddelware).get(getJoin).post(postJoin);


// -----< Log In >-----
rootRouter.route("/login").all(publicOnlyMiddelware).get(getLogin).post(postLogin);


rootRouter.get("/search", search)


export default rootRouter;