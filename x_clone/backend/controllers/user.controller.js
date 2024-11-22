import { User, Post, Comment } from "../models/index.js";
import { Notification } from "../models/index.js";

// Get a user's profile
export const getUserProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({
			where: { username },
			include: [
				{
					model: Post,
					attributes: ["id", "content", "createdAt"],
					order: [["createdAt", "DESC"]],
				},
				{
					model: Comment,
					attributes: ["content", "createdAt"],
				},
			],
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json({ user });
	} catch (err) {
		console.error("Error fetching user profile:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Get a list of suggested users
export const getSuggestedUsers = async (req, res) => {
	try {
		const user = req.user;
		// Logic to fetch suggested users (could be based on interests, location, etc.)
		const suggestedUsers = await User.findAll({
			where: {
				id: { [Op.ne]: user.id }, // Exclude the current user
			},
			limit: 10, // Limit to 10 suggested users
		});

		return res.status(200).json({ suggestedUsers });
	} catch (err) {
		console.error("Error fetching suggested users:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Follow or unfollow a user
export const followUnfollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToFollow = await User.findByPk(id);

		if (!userToFollow) {
			return res.status(404).json({ error: "User not found" });
		}

		const user = req.user;

		// Check if already following
		if (user.followingIds.includes(id)) {
			// Unfollow
			user.followingIds = user.followingIds.filter((userId) => userId !== id);
			await Notification.create({
				userId: id,
				message: `${user.username} unfollowed you.`,
			});
		} else {
			// Follow
			user.followingIds.push(id);
			await Notification.create({
				userId: id,
				message: `${user.username} followed you.`,
			});
		}

		await user.save();
		return res.status(200).json({ message: "Follow/Unfollow action completed." });
	} catch (err) {
		console.error("Error following/unfollowing user:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Update user profile
export const updateUser = async (req, res) => {
	try {
		const { username, email, bio } = req.body;

		const user = req.user;

		if (username) user.username = username;
		if (email) user.email = email;
		if (bio) user.bio = bio;

		await user.save();

		return res.status(200).json({ message: "Profile updated successfully.", user });
	} catch (err) {
		console.error("Error updating profile:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
