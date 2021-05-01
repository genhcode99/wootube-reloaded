// -----<Video DB 가져오기 >-----
import Video from "../models/Video"

// -----< Home >-----
export const home = (req, res) => {
  Video.find({},(error, videos) => {});
  return res.render("home", {pageTitle: "Home", })
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


// -----< Upload >-----
export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle:"Upload Video"});
};

export const postUpload = (req, res) => {
  const {title} = req.body;
  return res.redirect("/");
};