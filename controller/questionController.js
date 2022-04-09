const mongoose = require("mongoose");
const Question = require("../model/questions");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
// const Forun = require("../model/forum");

exports.postQuestion = CatchAsync(async (req, res, next) => {
  if (!req.body.name) req.body.name = req.user.id;
  const newQuestion = new Question(req.body);

  const postedQuestion = await newQuestion.save();

  // let modiQuestion = JSON.stringify(postedQuestion._id);

  // let QueSplited = modiQuestion.split('"')[1];

  // if (!req.body.question) req.body.question = QueSplited;
  // if (!req.body.answers) req.body.answers = [];
  // const newForum = new Forun(req.body);
  // const savedForum = newForum.save();

  res.status(200).json({
    status: "success",
    data: postedQuestion,
    // forumData: savedForum,
  });
});

exports.editPost = CatchAsync(async (req, res, next) => {
  const id = req.params.queId;
  const userId = req.user.id;

  const checkQuestionId = await Question.find({ _id: id });
  let names;
  checkQuestionId.forEach((el) => (names = el.name));
  names = JSON.stringify(names);
  const newName = names.split('"')[1];

  if (!(newName === userId)) {
    res.status(401).json({
      status: "fail",
      message: "you can not edit others post",
    });
  } else {
    const edittedPost = await Question.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: edittedPost,
    });
  }
});

exports.getAllQuestions = CatchAsync(async (req, res, next) => {
  const id = req.params.queId;
  const { title, content } = req.body;
  let QueryObj = {};
  if (title) {
    QueryObj.title = { $regex: title, $options: "i" };
  }
  if (content) {
    QueryObj.content = { $regex: content, $options: "i" };
  }
  const result = Question.find(QueryObj);
  const foundQuestion = await result;
  //   foundQuestion.forEach((el) => console.log(el.name));

  res.status(200).json({
    status: "success",
    data: foundQuestion,
  });
});
exports.getQuestion = CatchAsync(async (req, res, next) => {
  const id = req.params.queId;

  const foundQuestion = await Question.find({ _id: id }, { new: true });
  //   foundQuestion.forEach((el) => console.log(el.name));

  res.status(200).json({
    status: "success",
    data: foundQuestion,
  });
});
