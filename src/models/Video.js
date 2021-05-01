import mongoose from "mongoose";


// -----< Video DB의 모델 모양을 설정: 스키마(개요) >-----
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{type:String}],
  meta: {
    views: Number,
    rating: Number,
  }
});


// -----< Video DV의 모델을 정의 >-----
const Video = mongoose.model("Video", videoSchema);


export default Video;
