import Notification from "@/models/Notification";
import { connectDB } from "@/lib/mongodb";

export const createNotification = async (
	userId,
	type,
	message,
	options = {}
) => {
	try {
		await connectDB();

		const notification = await Notification.create({
			userId,
			type,
			message,
			relatedId: options.relatedId,
			relatedModel: options.relatedModel,
		});

		return notification;
	} catch (error) {
		console.error("Error creating notification:", error);
		throw error;
	}
};

export const getUserNotifications = async (userId, limit = 10) => {
	try {
		await connectDB();

		const notifications = await Notification.find({ userId })
			.sort({ createdAt: -1 })
			.limit(limit);

		return notifications;
	} catch (error) {
		console.error("Error fetching notifications:", error);
		throw error;
	}
};
