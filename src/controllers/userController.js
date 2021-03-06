// -----< User DB Model 가져오기 >-----
import User from "../models/User";
import Video from "../models/Video";

// -----< 가져오기 >-----
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { async } from "regenerator-runtime";


// -----< Join (get) >-----
export const getJoin = (req, res) => res.render("join", {
  pageTitle: "Join"
});


// -----< Join (post) >-----
export const postJoin = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    password2,
    location
  } = req.body;
  const pageTitle = "Join";

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match."
    });
  }

  const exists = await User.exists({
    $or: [{
      username
    }, {
      email
    }]
  })
  if (exists) {
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
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};


// -----< Log In (get) >-----
export const getLogin = (req, res) => res.render("login", {
  pageTitle: "Log In"
});


// -----< Log In (post) >-----
export const postLogin = async (req, res) => {

  const pageTitle = "Log In";
  const {
    email,
    password
  } = req.body;
  const user = await User.findOne({
    email,
    socialOnly: false
  })

  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists."
    })
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password"
    })
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/")
}


// -----< GitHub Log In >-----
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};


export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";

  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };

  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })).json();

  if ("access_token" in tokenRequest) {
    const {
      access_token
    } = tokenRequest;
    const apiUrl = "https://api.github.com";

    // User Data
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`
        },
      })
    ).json();
    console.log(userData);

    // Email Date
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);

    if (!emailObj) {
      // set notification
      return res.redirect("/login");
    }

    let user = await User.findOne({
      email: emailObj.email
    });

    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name ? userData.name : "Unknown",
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};


// -----< Log Out >-----
export const logout = async (req, res) => {
  await req.session.destroy();
  return res.redirect("/");
}

// -----< Edit (get) >-----
export const getEdit = (req, res) => {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile"
  });
};


// -----< Edit (post) >-----
export const postEdit = async (req, res) => {

  const {
    session: {
      user: {
        _id,
        avatarUrl
      }
    },
    body: {
      name,
      username,
      location
    },
    file,
  } = req;

  const isHeroku = process.env.NODE_ENV === "production";
  const updatedUser = await User.findByIdAndUpdate(
    _id, {
      avatarUrl: file ? (isHeroku? file.location : file.path): avatarUrl,
      name,
      username,
      location,
    }, {
      new: true
    }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit")
};


// -----< Change Password (get) >-----
export const getchangePassword = (req, res) => {
  if (req.session.user.socialOnly) {
    req.flash("error", "Can't change password");
    return res.redirect("/")
  }
  return res.render("change-password", {
    pageTitle: "Change Password"
  })
};


// -----< Change Password (post) >-----
export const postchangePassword = async (req, res) => {

  const {
    oldPassword,
    newPassword,
    newPassword2
  } = req.body;
  const {
    _id
  } = req.session.user;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password)
  // 지금 현재의 비밀번호가 맞는지 확인
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  //새로운 비밀번호와 비밀번호확인이 같은지 확인
  if (newPassword !== newPassword2) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation",
    });
  }
  //users DB에 새로운 비밀번호를 저장 
  console.log("Old Password", user.password);
  user.password = newPassword;
  console.log("New unhashed password", user.password);
  await user.save();
  req.flash("error", "Password updated");
  console.log("new pass word", user.password);
  //send notification!

  //Log Out 시킴 
  return res.redirect("/users/logout");
};

// My Profile
export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");

  if (!user) {
    return res.status(400).render("404", { pageTitle: "User not found." });
  }

  return res.render("profile", {
    pageTitle: user.name,
    user,
  });
};