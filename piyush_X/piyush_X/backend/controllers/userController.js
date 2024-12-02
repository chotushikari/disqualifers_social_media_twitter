const User = require("../models/user");

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { username, bio, avatar } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;

    await user.save();
    res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getUserProfile, updateUserProfile };
