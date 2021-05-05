//-----< Express app 선언 >-----
import express from "express";


const app = express();


//-----< Pug - 뷰 엔진을 퍼그로 세팅 >----- 
app.set("view engine", "pug");


//-----< Current Working Direcroty 변경 >
app.set("views", process.cwd() + "/src/views"); 


//-----< MIDDLE WARE >-----
import logger from "morgan";

app.use(logger("dev"));

  //  Express가 form 태그에서 제출된 정보를 자바스크립트로 이해시키는 방법의 미들웨어
app.use(express.urlencoded({extended: true}));


//-----< Router setting >-----
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter"
import userRouter from "./routers/userRouter"

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

