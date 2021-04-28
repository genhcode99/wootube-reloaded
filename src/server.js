//app 선언

import express from "express";

const PORT = 4000;

const app = express();



//----------< app 설정 >----------

//MIDDLE WARE
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  next();
};

app.use(logger);


//HANDLER
const handleHome = (req, res) => {
  return res.send("I'love middleware");
};

app.get("/", handleHome);


//외부 접속 listen

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} ⛴`);

app.listen(PORT, handleListening);