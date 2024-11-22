import { Post, Comment, User } from "../models/index.js";
import { Notification } from "../models/index.js";

// Fetch all posts
export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.findAll({
			include: [{ model: User, attributes: ["username", "avatar"] }],
			order: [["createdAt", "DESC"]],
		});
		return res.status(200).json({ posts });
	} catch (err) {
		console.error("Error fetching posts:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Fetch posts of followed users
export const getFollowingPosts = async (req, res) => {
	try {
		const user = req.user;
		const followingPosts = await Post.findAll({
			where: { userId: user.followingIds }, // Assuming `followingIds` exists in the user model
			include: [{ model: User, attributes: ["username", "avatar"] }],
			order: [["createdAt", "DESC"]],
		});
		return res.status(200).json({ posts: followingPosts });
	} catch (err) {
		console.error("Error fetching following posts:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Fetch posts liked by a user
export const getLikedPosts = async (req, res) => {
	try {
		const { id } = req.params; // User ID
		const likedPosts = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ["username", "avatar"],
					where: { id },
				},
			],
		});
		return res.status(200).json({ posts: likedPosts });
	} catch (err) {
		console.error("Error fetching liked posts:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Fetch posts by a specific user
export const getUserPosts = async (req, res) => {
	try {
		const { username } = req.params;
		const userPosts = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ["username", "avatar"],
					where: { username },
				},
			],
			order: [["createdAt", "DESC"]],
		});
		return res.status(200).json({ posts: userPosts });
	} catch (err) {
		console.error("Error fetching user posts:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Create a post
export const createPost = async (req, res) => {
	try {
		const { content, image } = req.body;
		if (!content && !image) {
			return res.status(400).json({ error: "Post content or image is required." });
		}

		const post = await Post.create({
			content,
			image,
			userId: req.user.id,
		});

		return res.status(201).json({ message: "Post created successfully.", post });
	} catch (err) {
		console.error("Error creating post:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Like or unlike a post
export const likeUnlikePost = async (req, res) => {
	try {
		const { id } = req.params; // Post ID
		const post = await Post.findByPk(id);

		if (!post) {
			return res.status(404).json({ error: "Post not found." });
		}

		const userLikes = post.likes || [];
		const userId = req.user.id;

		if (userLikes.includes(userId)) {
			// Unlike
			post.likes = userLikes.filter((like) => like !== userId);
			await Notification.create({
				userId: post.userId,
				message: `${req.user.username} unliked your post.`,
			});
		} else {
			// Like
			userLikes.push(userId);
			post.likes = userLikes;
			await Notification.create({
				userId: post.userId,
				message: `${req.user.username} liked your post.`,
			});
		}

		await post.save();
		return res.status(200).json({ message: "Action performed successfully.", post });
	} catch (err) {
		console.error("Error liking/unliking post:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Comment on a post
export const commentOnPost = async (req, res) => {
	try {
		const { id } = req.params; // Post ID
		const { content } = req.body;

		if (!content) {
			return res.status(400).json({ error: "Comment content is required." });
		}

		const post = await Post.findByPk(id);
		if (!post) {
			return res.status(404).json({ error: "Post not found." });
		}

		const comment = await Comment.create({
			content,
			userId: req.user.id,
			postId: id,
		});

		await Notification.create({
			userId: post.userId,
			message: `${req.user.username} commented on your post.`,
		});

		return res.status(201).json({ message: "Comment added successfully.", comment });
	} catch (err) {
		console.error("Error commenting on post:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Delete a post
export const deletePost = async (req, res) => {
	try {
		const { id } = req.params; // Post ID
		const post = await Post.findByPk(id);

		if (!post) {
			return res.status(404).json({ error: "Post not found." });
		}

		// Check ownership
		if (post.userId !== req.user.id) {
			return res.status(403).json({ error: "Unauthorized action." });
		}

		await post.destroy();
		return res.status(200).json({ message: "Post deleted successfully." });
	} catch (err) {
		console.error("Error deleting post:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
