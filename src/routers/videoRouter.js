import express from "express";

const videoRouter = express.Router();

const handelWatchVideo = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", handelWatchVideo);

export default videoRouter;