const mongoose = require("mongoose");

const studyspaceSchema = new mongoose.Schema(
  {
    course: {
      type: String,
    },
    firstp: {
      type: String,
      required: [true, "please provide the program details"],
    },
    list: {
      type: Array,
    },
    secondp: {
      type: String,
    },
    link: {
      type: String,
      required: [true, "Please provide the vedio call link"],
    },
    createdBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

studyspaceSchema.pre(/^find/, function (next) {
  this.find({ done: false });
  next();
});

module.exports = mongoose.model("Studyspace", studyspaceSchema);
