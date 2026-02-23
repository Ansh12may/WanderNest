
const path = require("path");
const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
    res.render(path.join(__dirname,"../views/users/signup.ejs"));
};


module.exports.signup = async(req,res)=>{
    try{
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome  to WanderNest!");
        res.redirect("/listings");
    })
    
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm = (req, res) => {
    res.render(path.join(__dirname,"../views/users/login.ejs"));
};

module.exports.login = (req, res) => {
        req.flash("success", "Welcome back to WanderNest!");
        let redirectUrl = res.locals.redirectUrl|| "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","You are logged out now");
        res.redirect("/listings");
    })
};