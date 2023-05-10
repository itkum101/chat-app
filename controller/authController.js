const Room = require("../models/room");
const User = require("./../models/user");
const jwt = require("jsonwebtoken");
const profileInfo = require("jsonwebtoken");

// const { promisify } = require("util");
require("dotenv").config();
exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ newUser }, process.env.KEY);

  res.cookie("profileInfo", newUser);
  res.cookie("jwt", token);

  res.redirect(301, "/chat");
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(Error("Please provide email or password"));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(Error("Incorrect email or password"));
  }
  console.log(process.env.KEY);
  const token = jwt.sign({ user }, process.env.KEY);
  res.cookie("jwt", token);

  const rooms = await Room.find();

  res.redirect(301, "/chat");
};

// exports.isLoggedIn = async (req, res, next) => {
//   if (!req.cookies.jwt) {
//     console.log("Not a logged user");
//   }
//   next();
// };
