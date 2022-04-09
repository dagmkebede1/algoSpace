const mongoose = require("mongoose");
const Answer = require("../model/answer");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const Question = require("../model/questions");

exports.postAnswer = CatchAsync(async (req, res, next) => {
  if (!req.body.name) req.body.name = req.user.id;
  // find out which post you are commenting
  const id = req.params.queId;
  // get the comment text and record post id
  const answer = new Answer({
    content: req.body.content,
    question: id,
  });
  // save comment
  const answerSaved = await answer.save();
  // get this particular post
  const questionRelated = await Question.findById(id);
  // push the comment into the post.comments array
  questionRelated.answers.push(answerSaved);
  // save and redirect...
  const questionSaved = await questionRelated.save();
  res.status(200).json({
    status: "success",
    data: answerSaved,
    questionData: questionSaved,
  });
});

// let newObject = { ...postedAnswer._doc };
// console.log(newObject);
// delete newObject["_id"];
// console.log(newObject);
// if (!req.body.answers) req.body.answers = newObject;

// let id = req.params.forumId;

// const updateForum = await Forum.findByIdAndUpdate({ _id: id }, req.body, {
//   new: true,
// });

//   res.status(200).json({
//     status: "success",
//     data: postedAnswer,
//     // forumdata: updateForum,
//   });
// });

// exports.editPost = CatchAsync(async (req, res, next) => {
//   const id = req.params.queId;
//   const userId = req.user.id;

//   const checkQuestionId = await Question.find({ _id: id });
//   let names;
//   checkQuestionId.forEach((el) => (names = el.name));
//   names = JSON.stringify(names);
//   const newName = names.split('"')[1];
//   //   console.log(newName);
//   //   console.log(req.user.id);

//   if (!(newName === userId)) {
//     res.status(401).json({
//       status: "fail",
//       message: "you can not edit others post",
//     });
//   } else {
//     const edittedPost = await Question.findByIdAndUpdate(
//       { _id: id },
//       req.body,
//       {
//         new: true,
//       }
//     );

//     res.status(200).json({
//       status: "success",
//       data: edittedPost,
//     });
//   }
// });

// exports.getAllQuestions = CatchAsync(async (req, res, next) => {
//   const id = req.params.queId;

//   const foundQuestion = await Question.find({ new: true });
//   //   foundQuestion.forEach((el) => console.log(el.name));

//   res.status(200).json({
//     status: "success",
//     data: foundQuestion,
//   });
// });
// exports.getQuestion = CatchAsync(async (req, res, next) => {
//   const id = req.params.queId;

//   let foundQuestion = await Question.find({ _id: id }, { new: true });
//   //   foundQuestion.forEach((el) => console.log(el.name));

//   res.status(200).json({
//     status: "success",
//     data: foundQuestion,
//   });
// });
