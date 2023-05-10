const Room = require("../models/room");
const User = require("../models/user");
require("dotenv").config();

// exports.getOverview = async (req, res) => {
//   const rooms = await Room.find();
//   res.render("pages/chat", { data1: JSON.stringify(rooms) });
// };
exports.getOverview = async (req, res) => {
  res.render("pages/login");
};
exports.login = (req, res) => {
  res.render("pages/login");
};

exports.signup = (req, res) => {
  res.render("pages/signup");
};

exports.chat = async (req, res) => {
  process.env.USERNAME = req.cookies.profileInfo[0].username;
  console.log(`${req.cookies.profileInfo[0].username} mm`);
  console.log(process.env.USERNAME);
  const rooms = await Room.find();
  res.render("pages/chat", { data1: JSON.stringify(rooms) });
};
