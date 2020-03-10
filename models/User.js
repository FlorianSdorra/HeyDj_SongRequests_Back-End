const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: false,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
