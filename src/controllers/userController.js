// -----< User DB Model 가져오기 >-----
import User from "../models/User";

// -----< bcrypt 가져오기 >-----
import bcrypt from "bcrypt";

// -----< Join (get) >-----
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });


// -----< Join (post) >-----
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location} = req.body;
  const pageTitle = "Join";

  if(password !== password2){
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match."
    });
  }

  const exists = await User.exists({$or: [{username},{email}]})
  if(exists){
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken."
    });
  }
  
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    res.redirect("/login");
  } catch(error){
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};


// -----< Log In (get) >-----
export const getLogin = (req, res) => res.render("login",{ pageTitle: "Log In" });


// -----< Log In (post) >-----
export const postLogin = async (req, res) => {

  const { username, password} = req.body;
  const pageTitle = "Log In";
  const user = await User.findOne({username})

  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists."
    })
  }

  const ok = await bcrypt.compare(password, user.password);
  if(!ok){
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password"
    })
  }

  req.session.loggedIn = true;
  req.session.user = user;
  
  return res.redirect("/")
}

// -----< GitHub Login >-----
export const startGithubLogin = (req, res) => {
  const baseURL = "https://github.com/login/oauth/authorize";
  const config ={
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};

export const finishGithubLogin = async(req, res) => {
  const baseURL = "https://github.com/login/oauth/access_token"
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  const data = await fetch(finalURL,{
    method: "POST",
    headers: {
      Accept: application/json,
    },
  });
  const json= await data.json();
  console.log(json);
}






export const logout = (req, res) => res.send("Log Out")
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");