import mongoose from "mongoose";


// -----< User DB의 스키마 만들기 >-----
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required:true },
  location: String,
});


// -----< User DB의 모델을 정의 >-----
const User = mongoose.model('User', userSchema);


export default User;