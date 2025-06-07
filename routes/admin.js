const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");


//  Get all users
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @desc    Delete user by ID + cascade delete posts & comments
router.delete("/user/:id", auth, admin, async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }

  try {
    // Delete user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete all posts by this user
    await Post.deleteMany({ user: userId });

    // Delete comments made by this user in any posts
    await Post.updateMany(
      {},
      { $pull: { comments: { user: mongoose.Types.ObjectId(userId) } } }
    );

    res.json({ msg: "User and related data deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//    Get all posts
router.get("/posts", auth, admin, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//   Delete any post by ID 
router.delete("/post/:id", auth, admin, async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ msg: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    await post.deleteOne();
    res.json({ msg: "Post deleted by admin" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
