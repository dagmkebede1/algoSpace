const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./route/userRouter");
const courseRouter = require("./route/courseRouter");
const authRouter = require("./route/authRouter");
const enrolRouter = require("./route/enrolRouter");
const questionRouter = require("./route/questionRouter");
const hireInstructRouter = require("./route/hiredInstructRouter");

const answerRouter = require("./route/answerRouter");
const globalErrorHanddler = require("./middlewares/errorHanddler");
const notFound = require("./route/notFound");
const AppError = require("./utils/AppError");
const CatchAsync = require("./utils/CatchAsync");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

//Secure the Header
app.use(helmet());

//Limit the requsts from the same IP's....protections against {DDOS & brute forse attacts}
const Limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour",
});
app.use("/", Limiter);
app.use(express.json({ limit: "10kb" }));
//Data Sanitization against NoSQL query injections
app.use(mongoSanitize());

//Data Sanitizations aganist XSS attacs
app.use(xss());

// Prevent Parameter Polution

app.use(
  hpp({
    whitelist: ["price"],
  })
);

app.use(authRouter);
app.use(questionRouter);
app.use(answerRouter);
app.use(courseRouter);
app.use(hireInstructRouter);
app.use(enrolRouter);
app.use(userRouter);

app.use(notFound);

app.use(globalErrorHanddler);
const start = CatchAsync(async (uri, port) => {
  await mongoose
    .connect(uri)
    .then(console.log("Database connected Succesfully!"));
  app.listen(port, console.log(`server running on port: ${port}`));
});

start(process.env.MONGO, process.env.PORT);
