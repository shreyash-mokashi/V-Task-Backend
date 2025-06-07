const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const auth = require("../middleware/auth");
const User = require("../models/User");
const upload = require("../middleware/upload");
const multer = require("multer");

// Get user's profile
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "email"]
    );
    //use populate() for joins user data into profile
    if (!profile) {
      return res.status(404).json({ msg: "No profile found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  Create or update user profile
router.post("/", auth, async (req, res) => {
  try {
    const { name, bio, skills, github, linkedin, twitter, imageUrl } = req.body;

    const profileData = {
      user: req.user.id,
      name,
      bio,
      skills: skills?.split(",").map((s) => s.trim()),
      social: { github, linkedin, twitter },
      imageUrl,
    };
    //if profile exixts update it or create new profile 
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileData },
        { new: true }
      );
    } else {
      profile = new Profile(profileData);
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Search profiles by name or skill
router.get("/search", async (req, res) => {
  const { name, skill } = req.query;

  try {
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    //use RegExp for case-insensitive search filtering
    if (skill) query.skills = { $regex: skill, $options: "i" };
  
    const profiles = await Profile.find(query).populate("user", [
      "name",
      "email",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/upload", auth, upload.single("image"), (req, res) => {
  try {
    return res.json({ imageUrl: `/uploads/${req.file.filename}` });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
//useing multer middleware to upload a single image file and save in uploads folder
module.exports = router;
