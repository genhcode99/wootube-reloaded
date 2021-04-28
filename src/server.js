//app 선언

import express from "express";

const PORT = 4000;

const app = express();


//-----< MIDDLE WARE >-----
import logger from "morgan";

app.use(logger("dev"));

//-----< CONTROLLER >-----
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