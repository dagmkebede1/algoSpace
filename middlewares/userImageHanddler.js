const multer = require("multer");
const AppError = require("../utils/AppError");
const sharp = require("sharp");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cd(null, "./public/img/users");
//   },
//   filename: function (req, file, cb) {
//     // cd(null, new Date().toString() + file.originalname);

//     //user-28649179-33336668.jpg
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! please upload Only images.", 400), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

exports.profilePhotoUploader = upload.single("photo");

exports.resizeUserPhotoUpdate = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};
exports.resizeUserPhotoSignup = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};
