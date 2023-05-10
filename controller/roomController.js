const Room = require("../models/room");

exports.getAllRoom = async (req, res) => {
  // Gives list of all users

  const allRoom = await Room.find();
  res.status(400).json({
    results: allRoom.length,
    data: allRoom,
  });
};

exports.addARoom = async (req, res, next) => {
  console.log("HERE IT IS");
  console.log(req.body);
  const newRoom = await Room.create(req.body);
  const rooms = await Room.find();
  console.log("FIRST");
  res.render("pages/chat", { data1: JSON.stringify(rooms) });
};

// (module.exports = getAllUsers), addAUser;
