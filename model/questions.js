const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.ObjectId, ref: "User" },
  title: { type: String, required: [true, "Please provide question title"] },
  content: { type: String, required: [true, "Please provide your question"] },
  answers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Answer",
    },
  ],
});

module.exports = mongoose.model("Question", questionSchema);
