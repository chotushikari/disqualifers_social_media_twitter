import { Notification } from "../models/index.js";

// Fetch all notifications for the logged-in user
export const getNotifications = async (req, res) => {
	try {
		const notifications = await Notification.findAll({
			where: { userId: req.user.id },
			order: [["createdAt", "DESC"]],
		});
		return res.status(200).json({ notifications });
	} catch (err) {
		console.error("Error fetching notifications:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// Delete all notifications for the logged-in user
export const deleteNotifications = async (req, res) => {
	try {
		await Notification.destroy({ where: { userId: req.user.id } });
		return res.status(200).json({ message: "Notifications cleared." });
	} catch (err) {
		console.error("Error deleting notifications:", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
