// -----<Video DB 가져오기 >-----
import Video from "../models/Video"


// -----< Home >-----
export const home = async (req, res) => {

  const videos = await Video.find({});
  return res.render("home", {pageTitle: "Home", videos});

};


// -----< Watch >-----
export const watch = async (req, res) => {
  const {id} = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", {pageTitle: "Video Not Found."});
  }
  return res.render("watch", { pageTitle: video.title , video});
};


// -----< Get Edit >-----
export const getEdit = async (req, res) => {
  const {id} = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", {pageTitle: "Video Not Found."});
  }
  return res.render("edit", {pageTitle:`Edit: ${video.title}`, video});
};


// -----< Post Edit >-----
export const postEdit = async (req, res) => {

  //req.params 는 url 상 :id 또는 :something 을 가르키고, req.body는 form에서 submit된 key-value 데이터 이다.
  const {id} = req.params;
  const {title, description, hashtags} = req.body;
  const video = await Video.exists({ _id:id });

  if (!video) {
    return res.render("404", {pageTitle: "Video Not Found."});
  }

  await Video.findByIdAndUpdate(id, {
    title, 
    description,
    hashtags : hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`),
  });
 
  return res.redirect(`/videos/${id}`);
};


// -----< Get Upload >-----
export const getUpload = (req, res) => {

  return res.render("upload", {

    pageTitle: "Upload Video"

  });

};


// -----< Post Upload >-----
export const postUpload = async (req, res) => {

  const {title, description, hashtags} = req.body;

  try {

    await Video.create(
      {
      title,
      description,
      hashtags: hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`)
      }
    );

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {pageTitle: "Upload Video", errorMessage: error._message});
  }
};

