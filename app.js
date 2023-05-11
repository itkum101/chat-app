const express = require("express");
const app = express();
require("dotenv").config();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const viewRoutes = require("./routes/viewRoutes");
const messageRoutes = require("./routes/messageRoutes");
const Room = require("./models/room");
const userAuthRoutes = require("./routes/userAuthRoutes");
const googleUser = require("./models/googleUser");
const User = require("./models/user");

var cookies = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("views"));
app.use(cookies());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

var userProfile;

const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const GOOGLE_CLIENT_ID =
//   "579095758139-4t55guuuaptjidb76oojg1tepv2op1ed.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
let googleUSER;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      console.log(userProfile);

      googleUSER = await User.find({ googleId: userProfile.id });
      console.log(googleUSER);
      console.log(googleUSER.length > 0);
      if (googleUSER.length > 0) {
        googleUSER = await User.find({ googleId: userProfile.id });
        console.log("indide");
      } else {
        googleUSER = await User.create({
          name: userProfile.given_name,
          email: userProfile.email,
          googleId: userProfile.id,
          username: userProfile.email,
        });
      }
      process.env.USERNAME = googleUSER.name;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  (req, res) => {
    res.cookie("profileInfo", googleUSER);
    console.log(req.cookies.profileInfo);

    res.redirect(301, "/chat");
  }
);
/* */
console.log("WORKING TILL HERE");
app.use("/", viewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/room", roomRoutes);

app.use("/user", userAuthRoutes);
app.use("/api/message", messageRoutes);

app.use((err, req, res, next) => {
  console.log(`${err} ERROR ERROR`);
});
module.exports = app;
