import mongoose from "mongoose";

const conmmentSchema = new mongoose.Schema({

  text: { type: String, require: true },

  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },

  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video"},

  createdAt: { type: Date, required: true, default: Date.now},
  
});

const Comment = mongoose.model("Comment", conmmentSchema);

export default Comment;