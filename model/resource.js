const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide expalnation for the resource"],
    },
    fileOne: {
      type: String,
    },
    fileTwo: {
      type: String,
    },
    fileThree: {
      type: String,
    },
    linkOne: {
      type: String,
    },
    linkTwo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
