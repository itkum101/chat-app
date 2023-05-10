const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  // Gives list of all users
  console.log(req.params);
  const allUsers = await User.find();
  res.status(400).json({
    results: allUsers.length,
    data: {
      allUsers,
    },
  });
};

exports.getAUser = async (req, res) => {
  const user = await User.findById(req.params["id"]);
  res.status(400).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.addAUser = async (req, res) => {
  console.log(req.body);
  console.log("I am inside here");
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

exports.deleteAUser = async (req, res) => {
  await User.findByIdAndDelete(req.params["id"]);
  res.status(204).json({
    status: "success",
    data: null,
  });
};

// (module.exports = getAllUsers), addAUser;
