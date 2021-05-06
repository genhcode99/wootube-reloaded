// -----< User DB Model 가져오기 >-----
import User from "../models/User"

// -----< Get Join >-----
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });


// -----< Post Join >-----
export const postJoin = async (req, res) => {
  const { name, username, email, password, location} = req.body
  await User.create({
    name,
    username,
    email,
    password,
    location,
  })
  res.redirect("/login");
};

export const login = (req, res) => res.send("Login");

export const logout = (req, res) => res.send("Log Out")
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");