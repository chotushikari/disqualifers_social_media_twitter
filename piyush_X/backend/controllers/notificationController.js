const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { userId: req.user.id } });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};