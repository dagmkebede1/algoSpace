const mongoose = require("mongoose");

const enrolSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

enrolSchema.pre(/^find/, function (next) {
  this.populate({
    path: "instructor",
    select: "firstname lastname email phone role",
  }).populate({
    path: "course",
    select: "title",
  });
  next();
});

module.exports = mongoose.model("Enrol", enrolSchema);
