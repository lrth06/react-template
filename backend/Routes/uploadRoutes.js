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
  region: `${process.env.S3_BUCKET_REGION}`,
});
const s3 = new aws.S3();

const diskStorage = multer.diskStorage({
  destination: "backend/uploads/",

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const localUpload = multer({ storage: diskStorage });

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

router.post("/", verify, upload.single("image"), (req, res) => {
  const file = req.file.location;
  console.log(file);

  res.send(file);
  console.log(`${req.file.destination}` + `${req.file.filename}`);
});
router.post("/local", verify, localUpload.single("image"), (req, res) => {
  const file =
    `http://${req.hostname}` +
    `:${process.env.PORT}/` +
    `uploads/` +
    `${req.file.filename}`;
  console.log(file);

  res.send(file);
});

module.exports = router;
