// mongoose import for use database
const mongoose = require("mongoose");

//create UsereSchema , for define what will be store in user data
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    //it use for track time of updates
    timestamps: true,
  }
);

//model create , and pass collection name and for which schema
const userModel = mongoose.model("users", UserSchema);

//userModel export for access database operations
module.exports = userModel;
