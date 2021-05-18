//-----< Express app 선언 >-----
import express from "express";

const app = express();

//-----< Import >-----
import logger from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import {
      localMiddleware
} from "./middlewares";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";


//-----< Pug - 뷰 엔진을 퍼그로 세팅 >----- 
app.set("view engine", "pug");


//-----< Current Working Direcroty 변경 >
app.set("views", process.cwd() + "/src/views");


//-----< MIDDLE WARE >-----
//Logger
app.use(logger("dev"));

//Express가 form 태그에서 제출된 정보를 자바스크립트로 이해시키는 방법의 미들웨어
app.use(express.urlencoded({
      extended: true
}));

//세션 (로그인 상태 쿠키 등을 제어)  
app.use(session({
      secret: process.env.COOKIE_SECRET,
      //모든 방문자에게 쿠키를 주지않고,
      //로그인 한 User 에게만 쿠키를 주기위해,
      //{ resave, saveUninitialized }:false => session 의 정보가 추가 되거나 변형되었을때만 쿠키를 준다.
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
            mongoUrl: process.env.DB_URL
      }),
}))

//Local Middle Ware
app.use(localMiddleware);

//-----< Router setting >-----


app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;