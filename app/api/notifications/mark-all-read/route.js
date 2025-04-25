import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { incrementUserScore, SCORE_VALUES } from "@/lib/scoring";

export const PATCH = async (req) => {
	const headersList = headers();
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

		await connectDB();
		const result = await Notification.updateMany(
			{ userId: id, read: false },
			{ read: true }
		);

		// Increment score based on number of notifications read, but cap it at a reasonable amount
		const scoreIncrement =
			Math.min(result.modifiedCount, 10) * SCORE_VALUES.READ_NOTIFICATION;
		if (result.modifiedCount > 0) {
			await incrementUserScore(
				id,
				scoreIncrement,
				"mark all notifications read"
			);
		}

		return Response.json(
			{
				ok: true,
				message: `Marked ${result.modifiedCount} notifications as read`,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error marking all notifications as read:", error);
		return Response.json(
			{ ok: false, message: error.message },
			{ status: 500 }
		);
	}
};
