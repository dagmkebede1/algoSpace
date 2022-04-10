const studySpace = require("../model/studySpace");
const CatchAsync = require("../utils/CatchAsync");
const factory = require("./factoryController");

exports.createSpace = CatchAsync(async (req, res, next) => {
  const { course, firstp, list, secondp, link } = req.body;

  const newSpace = new studySpace(req.body);
  const savedSpace = newSpace.save();

  res.status(200).json({
    status: "success",
    spacedata: savedSpace,
  });
});
exports.updateSpace = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  // const course = req.user.course;
  const updatedSpace = await studySpace.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  res.status(200).json({
    status: "success",
    updateddata: updatedSpace,
  });
});
exports.getspace = CatchAsync(async (req, res, next) => {
  // const id = req.user.id;
  const course = req.user.course;

  console.log(course);

  const foundSpace = await studySpace.find({ course: course });

  res.status(200).json({
    status: "success",
    spacedata: foundSpace,
  });
});
exports.deletSpace = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deletedspace = await studySpace.findByIdAndUpdate(
    { _id: id },
    { done: true },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    deleteddata: deletedspace,
  });
});

exports.getAllSpace = CatchAsync(async (req, res, next) => {
  const allSpace = await studySpace.find();

  res.status(200).json({
    status: "success",
    spacedata: allSpace,
  });
});
