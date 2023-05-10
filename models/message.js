const mongoose = require("mongoose");

const messages = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  message: String,
  timeStamp: {
    type: Date,
    default: Date.now(),
  },

  groupId: String,
});

const message = mongoose.model("messages", messages);

module.exports = message;
