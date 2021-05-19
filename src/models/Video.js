import mongoose from "mongoose";


// -----< Video DB의 모델 모양을 설정: 스키마(개요) >-----
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 80
  },
  fileUrl: {
    type: String,
    required: true,
  },
  thumbUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 10
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  meta: {
    views: {
      type: Number,
      default: 0,
      required: true
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`)
});

// -----< Video DB의 모델을 정의 >-----
const Video = mongoose.model("Video", videoSchema);


export default Video;