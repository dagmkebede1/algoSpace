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
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

studyspaceSchema.pre(/^find/, function (next) {
  this.find({ done: false });
});

module.exports = mongoose.model("Studyspace", studyspaceSchema);
