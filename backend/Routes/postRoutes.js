const express = require("express");
const router = express.Router();
const verify = require("../Middlewares/verifyToken");
const Post = require("../Models/postModel");

//Create New Post **Private**
router.post("/", verify, async (req, res) => {
  console.log(req.user);
  const postExists = await Post.findOne({ title: req.body.title });
  if (postExists)
    return res.status(400).send("A Post With This Title Already Exists!");

  const post = new Post({
    user: req.user,
    author: req.user.user,
    title: req.body.title,
    subject: req.body.subject,
    content: req.body.content,
    image: req.body.image,
    isPublushed: "false",
  });
  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get All Posts **Public**
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.status(200).send(posts);
});

//Get single post by ID **Public**
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update Single post by ID **Protected**

module.exports = router;
