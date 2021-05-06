// -----< User DB Model 가져오기 >-----
import User from "../models/User"

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
  const pageTitle = "Log In"
  const exists = await User.exists({username})
  if (!exists) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists."
    })
  }


  res.end();
}







export const logout = (req, res) => res.send("Log Out")
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");