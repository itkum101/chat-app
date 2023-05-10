const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const googleuserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    lower: true,
    // validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  googleid: {
    type: String,
  },
});

const googleUser = mongoose.model("googleuserSchema", googleuserSchema);

module.exports = googleUser;
