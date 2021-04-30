let videos = [
  {
    title: "First Video",
    rating:5,
    comments:2,
    createdAt: "2minutes ago",
    views:25,
    id:1,
  },
  {
    title: "Second Video",
    rating:5,
    comments:2,
    createdAt: "2minutes ago",
    views:59,
    id:2,
  },
  {
    title: "Third Video",
    rating:5,
    comments:2,
    createdAt: "2minutes ago",
    views:59,
    id:3,
  },
  ];

// -----< Home >-----
export const trending = (req, res) => {
  return res.render("home", {pageTitle: "Home", videos})
};


// -----< Watch >-----
export const watch = (req, res) => {
  const {id} = req.params;
  const video = videos[id-1];
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video});
};


// -----< Edit >-----
export const getEdit = (req, res) => {
  const {id} = req.params;
  const video = videos[id-1];
  return res.render("edit", {pageTitle:`Editing: ${video.title}`, video});
};
export const postEdit = (req, res) => {

  //req.params 는 url 상 :id 또는 :something 을 가르키고, req.body는 form에서 submit된 key-value 데이터 이다.
  const {id} = req.params;
  const {title} = req.body;

  videos[id-1].title = title;
  return res.redirect(`/videos/${id}`);
};


// -----< Upload >-----
export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle:"Upload Video"});
};

export const postUpload = (req, res) => {
  // here we will add a video to the videos array.
  return res.redirect("/");
};