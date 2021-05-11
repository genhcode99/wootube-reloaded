export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wootube";
  res.locals.loggedInUser = req.session.user || {};
  console.log(res.locals);
  next();
}


export const protectorMiddleware = (req, res, next) => {
  if(req.session.loggedIn){
    return next();
  }else{
    return res.redirect("/login");
  }
};


export const publicOnlyMiddelware = (req, res, next) => {
  if(!req.session.loggedIn){
    return next();
  }else{
    return res.redirect("/");
  }
};
