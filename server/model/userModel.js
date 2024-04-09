const mongoose = require("mongoose");
const diarySchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  date: { type: String, required: true },
  body: { type: String, required: true },
});
const Diary = mongoose.model("Diary", diarySchema);
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  mobile: { type: Number },
  otp:{
    code:{type:String},
    validTime:{type:Date}
  },
  password: { type: String, required: true },
  diary: [{
    diaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Diary'
    },
    date: {
      type: String
    }
  }],
});
const User = mongoose.model("User", userSchema);
module.exports = { User, Diary };
