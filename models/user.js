const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
    maxlength: [40, "Length exceeded"],
  },
  username: {
    type: String,
    required: [true, "A user must have a username"],
    trim: true,
    maxlength: [100, "Username can only contains max 100 char"],
    minlength: [5, "Username must have at least 5 char"],
    unique: true,
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

  password: {
    type: String,
    default: null,
    select: false,
  },
  googleId: {
    type: String,
    default: null,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("userSchema", userSchema);

module.exports = User;
