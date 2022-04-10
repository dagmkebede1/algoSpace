const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Please provide annuoncement subject"],
    },
    message: {
      type: String,
      required: [true, "Please provide annuoncement message"],
    },
    img: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

announcementSchema.pre(/^find/, function (next) {
  this.find({ seen: false });
  next();
});
module.exports = mongoose.model("announcement", announcementSchema);
