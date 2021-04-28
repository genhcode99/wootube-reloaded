//app 선언

import express from "express";

const PORT = 4000;

const app = express();



//----------< app 설정 >----------

//MIDDLE WARE
const methodLogger = (req, res, next) => {
  console.log("METHOD", req.method);
  next();
};
const routerLogger = (req, res, next) => {
  console.log("PATH", req.path);
  next();
};

app.use(methodLogger, routerLogger);


//HANDLER
const handleHome = (req, res) => {
  console.log("I will respond.");
  return res.send("Hello!");
};

const login = (req, res) => {
  return res.send("login");
}

app.get("/", handleHome);
app.get("/login", login);

//외부 접속 listen

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} ⛴`);

app.listen(PORT, handleListening);