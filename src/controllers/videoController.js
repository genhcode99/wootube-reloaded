export const trending = (req, res) => {
  const videos = [
    {
      title: "Hello",
    },
    {
      title: "Video #2"
    },
    {
      title: "What's up"
    }
  ];
  return res.render("home", {pageTitle: "Home", videos})
};
export const search = (req, res) => res.send("search");

export const upload = (req, res) => res.send("Upload");
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const deleteVideo = (req, res) => res.send ("Delete Video")