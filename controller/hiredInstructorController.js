const CatchAsync = require("../utils/CatchAsync");
const HiredInstructor = require("../model/hiredInstructer");
const User = require("../model/users");
const factory = require("./factoryController");
const { path } = require("express/lib/application");

exports.beHired = CatchAsync(async (req, res, next) => {
  if (!req.body.instructor) req.body.instructor = req.user.id;
  if (!req.body.course) req.body.course = req.params.id;

  const newHired = new HiredInstructor(req.body);

  const savedInstuctor = await newHired.save();
  //   let populated = await savedEnrol.populate("instructor");
  //   let theID = await populated.student._id;
  //   //IS THE GUEST ENROLED HE BECOME THE VIRTUAL STUDENT
  //   let changing = await User.findByIdAndUpdate(
  //     { _id: theID },
  //     { role: "student" },
  //     { new: true }
  //   );
  //   console.log(changing);
  res.status(200).json({
    massage: "success",
    data: { savedInstuctor },
  });
});
exports.autorizeHired = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const foundHired = await HiredInstructor.findByIdAndUpdate({ _id: id })
    .populate("instructor")
    .populate("course");
  let theID = await foundHired.instructor._id;
  let theCourse = await foundHired.course.title;
  //   //IS THE GUEST ENROLED HE BECOME THE VIRTUAL STUDENT
  let changingRight = await User.findByIdAndUpdate(
    { _id: theID },
    { role: "instructor", course: theCourse },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    changedright: changingRight,
    tobechanged: foundHired,
  });
});
exports.findAllHired = CatchAsync(async (req, res, next) => {
  const { instructor, course, sort } = req.query;

  let QueryObj = {};
  if (instructor) {
    QueryObj.student = { $regex: instructor, $options: "i" };
  }
  if (course) {
    QueryObj.course = { $regex: course, $options: "i" };
  }

  //   console.log(QueryObj);
  let result = HiredInstructor.find(QueryObj);
  if (sort) {
    const sortlist = sort.split(",").join(" ");
    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }
  const foundHired = await result;
  if (!foundHired) {
    res.status(200).json({
      message: "success",
      data: `there is no request to be instructor in the system`,
    });
  } else {
    res.status(200).json({
      message: "success",
      data: { foundHired },
      total: foundHired.length,
    });
  }
});

exports.deleteHired = factory.deleteOne(HiredInstructor);
