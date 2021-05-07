require('dotenv').config()

import mongoose from "mongoose";

// -----< Mongo DB 연결 >-----
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false,
  useCreateIndex: true
});

// -----< DB 연결상태 >-----
const db = mongoose.connection;

  // 오류발견시 콘솔에 띄워줌 (항상)
const handleError = (error) => console.log(" ❌ DB Error", error);
db.on("error", handleError);

  // DB 연결시 콘솔에 띄워줌 (한번)
const handleOpen = () => console.log("Connected to DB ✅")
db.once("open", handleOpen);

//-----< create read update delete CRUD >-----
