const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
const WrapAsync = require("../utils/WrapAsync.js");

//LOCAL AUTH ROUTES

router.get("/signup", userController.renderSignupForm);

router.post("/signup", WrapAsync(userController.signup));

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/auth/login",   
    failureFlash: true
  }),
  userController.login
);

router.get("/logout", userController.logout);


//GOOGLE AUTH ROUTES


//  Start Google login
router.get(
  "/google",
  saveRedirectUrl,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",  
    failureFlash: true
  }),
  userController.login
);

module.exports = router;
