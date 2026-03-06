const prisma = require('../../config/db');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { notification_id, user_id , report_id , is_read , create_at} = req.body;
    const notification = await prisma.notification.create({
      data: { notification_id, user_id , report_id , is_read , create_at },
    });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { notification_id } = req.body;
    const notification = await prisma.notification.update({
      where: { notification_id },
      data: { is_read: true },
    });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { notification_id } = req.params;
    const notification = await prisma.notification.delete({
      where: { notification_id },
    });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
};
