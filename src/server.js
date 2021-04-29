//-----< Express app 선언 >-----
import express from "express";

const PORT = 4000;
const app = express();


//-----< MIDDLE WARE >-----
import logger from "morgan";


app.use(logger("dev"));


//-----< Router setting >-----
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter"
import userRouter from "./routers/userRouter"


app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


//-----< 외부 request 를 듣게 준비하고 있어라 >-----
const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} ⛴`);

app.listen(PORT, handleListening);