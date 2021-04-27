//app 선언

import express from "express";

const PORT = 4000;

const app = express();



//app 설정

const handleHome = (req, res) => {
  return res.send("I still love you.");
};
const handleLogin = (req, res) => {return res.send("Login here.")};

app.get("/", handleHome);
app.get("/login", handleLogin);




//외부 접속 listen

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} ⛴`);

app.listen(PORT, handleListening);