import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";
import { getUserNotifications } from "@/lib/notifications";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { incrementUserScore, SCORE_VALUES } from "@/lib/scoring";

export const GET = async (req) => {
	const headersList = await headers();
	const token = headersList.get("Authorization")?.split(" ")[1];

	if (!token) {
		return Response.json(
			{ ok: false, message: "Unauthorized" },
			{ status: 401 }
		);
	}

	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		if (!id) {
			return Response.json(
				{ ok: false, message: "Invalid token" },
				{ status: 401 }
			);
		}

		const searchParams = req.nextUrl.searchParams;
		const limit = searchParams.get("limit") || 10;

		const notifications = await getUserNotifications(id, parseInt(limit));

		return Response.json(
			{
				ok: true,
				message: notifications,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching notifications:", error);
		return Response.json(
			{ ok: false, message: error.message },
			{ status: 500 }
		);
	}
};

export const PATCH = async (req) => {
	const headersList = headers();
	const token = headersList.get("Authorization")?.split(" ")[1];
	const { notificationId } = await req.json();

	if (!token) {
		return Response.json(
			{ ok: false, message: "Unauthorized" },
			{ status: 401 }
		);
	}

	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		if (!id) {
			return Response.json(
				{ ok: false, message: "Invalid token" },
				{ status: 401 }
			);
		}

		await connectDB();
		const notification = await Notification.findOneAndUpdate(
			{ _id: notificationId, userId: id },
			{ read: true },
			{ new: true }
		);

		if (!notification) {
			return Response.json(
				{ ok: false, message: "Notification not found" },
				{ status: 404 }
			);
		}

		// Increment score for reading a notification
		await incrementUserScore(
			id,
			SCORE_VALUES.READ_NOTIFICATION,
			"read notification"
		);

		return Response.json(
			{
				ok: true,
				message: notification,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating notification:", error);
		return Response.json(
			{ ok: false, message: error.message },
			{ status: 500 }
		);
	}
};
