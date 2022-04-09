const studySpace = require("../model/studySpace");
const CatchAsync = require("../utils/CatchAsync");
const Enrol = require("../model/enrol");
const InstructorHired = require("../model/hiredInstructer");
const User = require("../model/users");

exports.createSpace = CatchAsync(async (req, res, next) => {
  const { course, firstp, list, secondp, link } = req.body;

  const newSpace = new studySpace(req.body);
  const savedSpace = newSpace.save();
  res.status(200).json({
    status: "success",
    spacedata: savedSpace,
  });
});

exports.getspace = CatchAsync(async (req, res, next) => {
  const id = req.user.id;
  const course = req.user.course;
  const fromEnrol = await Enrol.aggregate([
    {
      $match: {
        course: course,
      },
    },
  ]);
  console.log(fromEnrol);
});
