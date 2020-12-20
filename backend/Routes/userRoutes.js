const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../Middlewares/validation");

//Register a new User
router.post("/register", async (req, res) => {
  const pw = req.body.password;
  const pw2 = req.body.password2;
  if (pw !== pw2) return res.status(400).send("Passwords Must Match");
  //Joi Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].messaage);

  //Check for existing user
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email Already Exists!");

  //Create Salt
  const salt = await bcrypt.genSalt(10);
  //Hash Password
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create the new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({
      ID: savedUser.id,
      user: savedUser.name,
      isAdmin: savedUser.isAdmin,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].messaage);

  //See if user is Valid
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password Incorrect!");

  //Create JWT
  const secret = process.env.TOKEN_SECRET;

  const token = jwt.sign(
    { user: user.name, _id: user._id, isAdmin: user.isAdmin },
    secret,
    {
      expiresIn: "30d",
    }
  );
  //Compare Password to db
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Email or Password Incorrect!");
  res
    .header("Authorization", token)
    .send({ user: user.name, _id: user._id, isAdmin: user.isAdmin });
});

module.exports = router;
