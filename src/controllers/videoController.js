// --------------------< DB 가져오기 >--------------------
import User from "../models/User";
import Video from "../models/Video"
import Comment from "../models/Comment"
import { async } from "regenerator-runtime";


// --------------------< Home >--------------------
export const home = async (req, res) => {

  const videos = await Video.find({}).sort({
    createdAt: "desc"
  }).populate("owner");
  return res.render("home", {
    pageTitle: "Home",
    videos
  });

};

// --------------------< Watch >--------------------
export const watch = async (req, res) => {
  const { id } = req.params;
  //populate : (몽구스) 연결된 다른 모델의 정보를 가져온다.
  const video = await Video.findById(id).populate("owner").populate("comments");

  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found." });
  }

  return res.render("watch", { pageTitle: video.title, video });
};


// --------------------< Edit (get) >--------------------
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const { user: { _id } } = req.session;
  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found." });
  }
  if (String(video.owner) !== String(_id)) { 
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};


// --------------------< Edit (post) >--------------------
export const postEdit = async (req, res) => {

  //req.params 는 url 상 :id 또는 :something 을 가르키고, req.body는 form에서 submit된 key-value 데이터 이다.
  const { user: { _id } } = req.session;
  const { id } = req.params;
  const { title, description, hashtags} = req.body;
  const video = await Video.exists({ _id: id });

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found." });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video.");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags)
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};

// --------------------< Upload (get) >--------------------
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};


// --------------------< Upload (post) >--------------------
export const postUpload = async (req, res) => {
  const { user: { _id }  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl:video[0].location,
      thumbUrl: thumb[0].location,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags)
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message
    });
  }
};


// --------------------< Delete Video >--------------------
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const { user: { _id } } = req.session;
  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found." });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};


// --------------------< Search >--------------------
export const search = async (req, res) => {

  const { keyword } = req.query;
  let videos = [];

  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i")
      },
    }).populate("owner");
  }

  return res.render("search", { pageTitle: "Search", videos});
}


// --------------------< View Count >--------------------
export const registerView = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

// --------------------< Comment >--------------------
export const createComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const { user } = req.session;
  const video = await Video.findById(id);

  if(!video){
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: user._id,
    video : id,
  });

  video.comments.push(comment._id);
  video.save();

  return res.status(201).json({newCommentId: comment._id});
};
// --------------------< Delete Comment >--------------------
export const deleteComment = async (req, res) =>{
  const { userId } = req.body;
  const commentId = req.params.id;
  const comment = await Comment.findById(commentId);
  const owner = comment.owner;

  if(`${userId}` !== `${owner}`) {
    return res.redirect("/");
  }
  await Comment.findByIdAndRemove(commentId);
  return res.status(200).json({deletedCommentId: commentId});

};