//-----< Express app 선언 >-----
import express from "express";


const app = express();

//-----< Import >-----
import logger from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


//-----< Pug - 뷰 엔진을 퍼그로 세팅 >----- 
app.set("view engine", "pug");


//-----< Current Working Direcroty 변경 >
app.set("views", process.cwd() + "/src/views"); 


//-----< MIDDLE WARE >-----
      //Logger
app.use(logger("dev"));

      //Express가 form 태그에서 제출된 정보를 자바스크립트로 이해시키는 방법의 미들웨어
      app.use(express.urlencoded({extended: true}));

      //세션 (로그인 상태 쿠키 등을 제어)  
app.use(session({
  secret: "Hello!",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/wootube"}),
}))

      //Local Middle Ware
app.use(localMiddleware);

//-----< Router setting >-----

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

