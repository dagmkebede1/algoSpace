const moongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new moongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide your Firstname"],
      minlength: 2,
    },
    lastname: {
      type: String,
      required: [true, "Please provide your Lasttname"],
      minlength: 2,
    },
    email: {
      unique: [true, "this email exists in the system try other"],
      type: String,
      validate: [validator.isEmail, "Please provide a valid email Address"],
      lowercase: true,
    },
    Course: {
      type: String,
      enum: {
        values: [
          "Basic Computer Skill",
          "Programming Language",
          "Website Development",
          "Artificail Intellegence",
          "Database Managment System",
          "video Edditing",
          "Graphics Design",
          "Mobile App Development",
          "Project Methodology",
          "Networking",
          "Computer Maintenance",
          "FrontEnd Specialization",
          "BackEnd Specialization",
        ],
        message: "{VALUE} is not supported.",
      },
    },
    educationLevel: {
      type: String,
      enum: {
        values: [
          "Primary School",
          "Secondary School",
          "Diploma",
          "BSc Degree",
          "Masters Degree",
          "PHD",
        ],
        message: "{VALUE} is not supported.",
      },
    },
    City: {
      type: String,
      enum: {
        values: [
          "Gambella",
          "Addis Abeba",
          "Jimma",
          "Adama",
          "Bishoftu",
          "Bairdar",
          "Asosa",
          "Hawassa",
          "Other",
        ],
        message: "{VALUE} is not supported.",
      },
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model("appliedStudent", studentSchema);
