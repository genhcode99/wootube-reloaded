import mongoose from "mongoose";


// -----< Video DB의 모델 모양을 설정: 스키마(개요) >-----
const videoSchema = new mongoose.Schema({
  title: {type: String, required: true, trim: true, maxLength: 80},
  description: {type: String, required: true, trim: true, minLength: 20},
  createdAt: {type: Date, required: true, default: Date.now},
  hashtags: [{type: String, trim: true}],
  meta: {
    views: {type:Number, default:0 , required:true},
    rating: {type:Number, default:0, required:true}
  }
});

// -----< Mongoose Middle Ware 설정 >-----
  // Upload 시 Hashtags에 #을 붙여주는 Middle Ware
videoSchema.pre("save", async function(){
  this.hashtags = this.hashtags[0]
  .split(",")
  .map(word => word.startsWith("#") ? word:`#${word}`);
});


// -----< Video DV의 모델을 정의 >-----
const Video = mongoose.model("Video", videoSchema);


export default Video;
