const path = require("path");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const verify = require("../Middlewares/verifyToken");

dotenv.config();

aws.config.update({
  secretAccessKey: `${process.env.S3_ACCESS}`,
  accessKeyId: `${process.env.S3_KEY_ID}`,
  region: "us-east-1",
});
const s3 = new aws.S3();

// const diskStorage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function checkFileType(file, cb) {}

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.S3_BUCKET}`,
    acl: "public-read",
    key: function (req, file, cb) {
      console.log(file);
      cb(null, `${Date.now()}-upload${path.extname(file.originalname)}`); //use Date.now() for unique file keys
    },
  }),
});

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'bucket-name',
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.originalname); //use Date.now() for unique file keys
//         }
//     })
// });

router.post("/", upload.single("image"), (req, res) => {
  res.send(`${req.file.location}`);
  console.log(req.file, req.file.location);
});

module.exports = router;
