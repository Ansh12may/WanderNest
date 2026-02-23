if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}));
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;



const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRouter = require("./routes/booking.js");



// global app-level variables
app.locals.MAPTILER_KEY = process.env.MAPTILER_KEY;

app.set("view engine","ejs");

app.use(methodOverride("_method"));

app.set("views",path.join(__dirname,"views/listings"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const port = process.env.PORT || 8080;

//const MONGO_URL = 'mongodb://127.0.0.1:27017/WanderNest'
const dbUrl = process.env.ATLASDB_URL
console.log("DB URL:", dbUrl);

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect(dbUrl);
}

app.listen(port,()=>{
    console.log("Server is started");
});

const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:"Ashutosh"
  },
  touchAfter:24*3600,
});

store.on("error",(err)=>{
  console.log("Error in MONGO SESSION STORE",err);
});

const sessionOptions = {
    store,
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.set("trust proxy", 1);
//sessions
app.use(session(sessionOptions));
//flash
app.use(flash())

//always write this line to implement password
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 1️⃣ Check if user already exists by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // 2️⃣ Check if user exists with same email (local account)
        user = await User.findOne({ email });

        if (user) {
          // 🔗 Link Google account to existing user
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        // 3️⃣ Create new user if none exists
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName.replace(/\s+/g, ""),
          email
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    res.locals.bookingSummary = req.session.bookingSummary;
    delete req.session.bookingSummary; // clear after use

    next();
});




app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/auth",userRouter);
app.use("/", bookingRouter);
app.use("/bookings", bookingRouter);



app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went Wrong" } = err;
    res.status(statusCode).render("error.ejs",{message});
});







