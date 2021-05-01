// -----<Video DB 가져오기 >-----
import Video from "../models/Video"


// -----< Home >-----
export const home = async (req, res) => {

  const videos = await Video.find({});
  return res.render("home", {pageTitle: "Home", videos});

};


// -----< Watch >-----
export const watch = (req, res) => {
  const {id} = req.params;
  return res.render("watch", { pageTitle: `Watching:`, });
};


// -----< Edit >-----
export const getEdit = (req, res) => {
  const {id} = req.params;
  return res.render("edit", {pageTitle:`Editing: `, });
};
export const postEdit = (req, res) => {

  //req.params 는 url 상 :id 또는 :something 을 가르키고, req.body는 form에서 submit된 key-value 데이터 이다.
  const {id} = req.params;
  const {title} = req.body;

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

  const {
    title,
    description,
    hashtags
  } = req.body;

  try {

    await Video.create({

      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`)
    });

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message
    });
  }
};

