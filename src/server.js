//app 선언

import express from "express";

const PORT = 4000;

const app = express();


//-----< MIDDLE WARE >-----
import logger from "morgan";

app.use(logger("dev"));

//-----< CONTROLLER >-----
const globalRouter = express.Router();
const handleHome = (req, res) => res.send("home");
globalRouter.get("/", handleHome);

const videoRouter = express.Router();
const handelWatchVideo = (req, res) => res.send("Watch Video");
videoRouter.get("/watch", handelWatchVideo);

const userRouter = express.Router();
const handelEditUser = (req, res) => res.send("Edit User");
userRouter.get("/edit", handelEditUser);

app.use("/", globalRouter)
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// app.get("/", handleHome);
// app.get("/login", handleLogin);

//외부 접속 listen

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} ⛴`);

app.listen(PORT, handleListening);