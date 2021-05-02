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


// -----< Video DV의 모델을 정의 >-----
const Video = mongoose.model("Video", videoSchema);


export default Video;
