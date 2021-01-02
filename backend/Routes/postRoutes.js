const express = require("express");
const router = express.Router();
const verify = require("../Middlewares/verifyToken");
const admin = require("../Middlewares/verifyAdmin");
const Post = require("../Models/postModel");
const jwt = require("jsonwebtoken");

//Create New Post **Private**
router.post("/", verify, async (req, res) => {
  console.log(req.user);
  const postExists = await Post.findOne({ title: req.body.title });
  if (postExists)
    return res.status(400).send("A Post With This Title Already Exists!");
  const str = req.body.content;
  const trim = str.slice(0, 140);
  const abbr = `${trim}...`;

  const post = new Post({
    user: req.user,
    author: req.user.user,
    title: req.body.title,
    subject: abbr,
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

//Get All Posts, public or draft **Admin**
router.get("/admin", admin, async (req, res) => {
  const posts = await Post.find();
  if (posts.length === 0) {
    {
      res.status(400).send("No Published Posts!");
    }
  } else {
    res.status(200).send(posts);
  }
});

//Get All Published Posts **Public**
router.get("/", async (req, res) => {
  const posts = await Post.find({ isPublished: true });
  if (posts.length === 0) {
    {
      res.status(400).send("No Published Posts!");
    }
  } else {
    res.status(200).send(posts);
  }
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

//Update Single post by ID **Protected** (post owner/admin)
router.post("/:id/update", verify, async (req, res) => {
  const user = jwt.decode(req.header("auth-token"));
  const post = await Post.findOne({ _id: req.params.id });

  console.log(post, user);
  if (post) {
    if (post.author === user.user || user.isAdmin) {
      try {
        post.title = req.body.title;
        const str = req.body.content;
        const trim = str.slice(0, 140);
        const abbr = `${trim}...`;

        post.subject = abbr;
        post.content = req.body.content;
        post.isPublished = req.body.isPublished;
        const updated = await post.save();
        res.status(200).send(updated);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("no match");
      res.status(401).send("Invalid Credentials");
    }
  } else {
    res.status(400).send("No Post Exists");
  }
});

//Add a post comment
router.post("/:id/comments", verify, async (req, res) => {
  console.log(req.params.id);
  const post = await Post.findOne({ _id: req.params.id });
  if (post) {
    try {
      console.log(post);
      const comment = {
        user: req.user,
        author: req.user.user,
        comment: req.body.comment,
      };
      post.comments.push(comment);
      const saved = await post.save();
      console.log(saved);
      res.status(200).send(saved);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  } else {
    res.status(400).send("No Post exists");
  }
});

module.exports = router;
