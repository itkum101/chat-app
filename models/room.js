const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "A room must have a name"],
    maxlength: [40, "A room shouldnt have 40 char at max "],
    minlength: [1, "Length should be at least one character"],
  },
  username: {
    type: String,
    required: [true, "A room must have a username"],
    maxlength: [40, "A room shouldnt have 40 char at max "],
    minlength: [1, "Length should be at least one character"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [100, "A room shouldnt have 40 char at max "],
  },
  members: [String],
});

const Room = mongoose.model("roomSchema", roomSchema);

module.exports = Room;
