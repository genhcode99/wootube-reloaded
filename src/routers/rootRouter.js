import express from "express";
import { getJoin, postJoin, login } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

// -----< Home >-----
rootRouter.get("/", home);

// -----< Join >-----
rootRouter.route("/join").get(getJoin).post(postJoin);


rootRouter.get("/login", login);
rootRouter.get("/search", search)


export default rootRouter;