//app 선언

import express from "express";

const PORT = 4000;

const app = express();



//app 설정

const handleHome = () => console.log("Somebody is tring to go home.");

app.get("/", handleHome);




//외부 접속 listen

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} ⛴`);

app.listen(PORT, handleListening);