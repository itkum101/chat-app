const message = require("../models/message");

exports.addAmessage = async (req, res) => {
  const messageIs = await message.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      messageIs,
    },
  });
};

exports.getAllmessages = async (req, res) => {
  const messageIs = await message.find();
  res.status(201).json({
    status: "success",
    data: {
      messageIs,
    },
  });
};
exports.getAmessage = async (req, res) => {
  const groupId = req.params["id"];

  const messageList = await message
    .find({ groupId })
    .sort({ timeStamp: "asc" });

  res.status(201).json({
    status: "success",
    results: messageList.length,
    data: messageList,
  });

  messageList.sort();
};
