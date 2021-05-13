// -----<Video DB 가져오기 >-----
import User from "../models/User";
import Video from "../models/Video"


// -----< Home >-----
export const home = async (req, res) => {

  const videos = await Video.find({}).sort({
    createdAt: "desc"
  });
  return res.render("home", {
    pageTitle: "Home",
    videos
  });

};


// -----< Watch >-----
export const watch = async (req, res) => {
  const {
    id
  } = req.params;
  //populate : (몽구스) 연결된 다른 모델의 정보를 가져온다.
  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res.render("404", {
      pageTitle: "Video Not Found."
    });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video
  });
};


// -----< Edit (get) >-----
export const getEdit = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    user: {
      _id
    }
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", {
      pageTitle: "Video Not Found."
    });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", {
    pageTitle: `Edit: ${video.title}`,
    video
  });
};


// -----< Edit (post) >-----
export const postEdit = async (req, res) => {

  //req.params 는 url 상 :id 또는 :something 을 가르키고, req.body는 form에서 submit된 key-value 데이터 이다.
  const {
    user: {
      _id
    }
  } = req.session;
  const {
    id
  } = req.params;
  const {
    title,
    description,
    hashtags
  } = req.body;
  const video = await Video.exists({
    _id: id
  });

  if (!video) {
    return res.status(404).render("404", {
      pageTitle: "Video Not Found."
    });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags)
  });

  return res.redirect(`/videos/${id}`);
};


// -----< Upload (get) >-----
export const getUpload = (req, res) => {

  return res.render("upload", {

    pageTitle: "Upload Video"

  });

};


// -----< Upload (post) >-----
export const postUpload = async (req, res) => {
  const {
    user: {
      _id
    }
  } = req.session;
  const {
    path: fileUrl
  } = req.file;
  const {
    title,
    description,
    hashtags
  } = req.body;

  try {

    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
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


// -----< Delete Video >-----
export const deleteVideo = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    user: {
      _id
    }
  } = req.session;
  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", {
      pageTitle: "Video Not Found."
    });
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};


// -----< Search >-----
export const search = async (req, res) => {

  const {
    keyword
  } = req.query;
  let videos = [];

  if (keyword) {

    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i")
      },
    });
    console.log(videos)

  }

  return res.render("search", {
    pageTitle: "Search",
    videos
  });
}