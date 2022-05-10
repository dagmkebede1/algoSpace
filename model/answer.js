const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.ObjectId, ref: "User" },
  answer: { type: String, required: [true, "Please Enter Your Answer"] },
  photo: { type: String },
});

module.exports = mongoose.model("Answer", answerSchema);
