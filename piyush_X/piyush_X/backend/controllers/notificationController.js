const Notification = require("../models/notification");

// Fetch Notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Mark Notification as Read
const markAsRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findByPk(notificationId);
    if (!notification) return res.status(404).json({ message: "Notification not found." });

    if (notification.userId !== req.user.id) return res.status(403).json({ message: "Not authorized." });

    notification.isRead = true;
    await notification.save();
    res.status(200).json({ message: "Notification marked as read." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getNotifications, markAsRead };
