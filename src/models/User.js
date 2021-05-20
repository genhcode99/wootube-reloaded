import bcrypt from "bcrypt"
import mongoose from "mongoose";


// -----< User DB의 스키마 만들기 >-----
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  
  avatarUrl: String,
  
  socialOnly: { type: Boolean, default: false },

  username: { type: String, required: true, unique: true },

  password: { type: String },

  name: { type: String, required: true },

  location: String,
  
  comments:[{ type:mongoose.Schema.Types.ObjectId, ref:"Comment" }],

  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],


});

// -----< Mongoose Middle Ware >-----
// password 보안
userSchema.pre("save", async function () {
  //isModified 는 수정되었을때 라는 의미로 생각하면됨!
  //Pass word 가 변경사항이 있을때 해쉬로 변환하라 라는 뜻!
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

// -----< User DB의 모델을 정의 >-----
const User = mongoose.model('User', userSchema);


export default User;