const mongoose = require("mongoose");
const Course = require("../model/course");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");
const factory = require("./factoryController");

exports.createCourse = CatchAsync(async (req, res, next) => {
  const newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    instructor: req.body.instructor,

    //photo: file.path
  });

  const savedCourse = await newCourse.save();
  res.status(200).json({
    massage: "success",
    data: { savedCourse },
  });
});

exports.findAllCourse = CatchAsync(async (req, res, next) => {
  //basic QUery
  const currentUser = req.user;
  const { title, numericFilter, sort, field } = req.query;
  // let QueryObj = { ...req.query };
  let QueryObj = {};

  // const excludedFileds = ["page", "limit", "sort", "fields"];
  // excludedFileds.forEach((el) => delete QueryObj[el]);

  // //Advanced Query
  if (title) {
    QueryObj.title = { $regex: title, $options: "i" };
  }
  if (numericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilter.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        QueryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Course.find(QueryObj);
  if (sort) {
    const sortlist = sort.split(",").join(" ");
    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }
  //select the elements to apper from the filter
  if (field) {
    const fieldlist = field.split(",").join(" ");
    result = result.select(fieldlist);
  }

  // const query = Course.find(QueryObj);
  // console.log(QueryObj);

  const allCourse = await result;
  // const allCourse = await Course.find(QueryObj);
  if (!allCourse) {
    res.status(200).json({
      message: "success",
      data: `there is no Course in the system`,
    });
  } else {
    // res.status(200).json({
    //   message: "success",
    //   data: { allCourse },
    //   total: allCourse.length,
    // });
    res.status(200).render("course", { allCourse, currentUser });
  }
});

// exports.findCourse = factory.findOne(Course, {
//   path: "instructor",
//   select: "firstname lastname",
// });
exports.findCourse = CatchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;
  const singleCourse = await Course.findById({ _id: id }).populate({
    path: "instructor",
    select: "firstname lastname",
  });
  res.status(200).render("enrol", { currentUser: currentUser, singleCourse });
});
exports.updateCourse = factory.updateOne(Course);

exports.deleteCourse = factory.deleteOne(Course);
