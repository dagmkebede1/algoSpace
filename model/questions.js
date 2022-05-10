const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.ObjectId, ref: "User" },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  },
  title: { type: String, required: [true, "Please provide question title"] },
  question: { type: String, required: [true, "Please provide your question"] },
  photo: { type: String },
  answers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Answer",
    },
  ],
});

module.exports = mongoose.model("Question", questionSchema);
