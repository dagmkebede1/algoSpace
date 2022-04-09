const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.ObjectId, ref: "User" },
  content: { type: String, required: [true, "Please provide your question"] },
  question: { type: mongoose.Schema.ObjectId, ref: "Question" },
});

module.exports = mongoose.model("Answer", answerSchema);
