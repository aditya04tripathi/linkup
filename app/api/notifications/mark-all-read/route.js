import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

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
