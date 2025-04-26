import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import User from "@/models/User";
import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";
import { incrementUserScore, SCORE_VALUES } from "@/lib/scoring";
import { createNotification } from "@/lib/notifications";

export const POST = async (req, { params }) => {
	const { id } = await params;

	// Get the auth token from the request headers
	const headersList = await headers();
	const token = headersList.get("Authorization")?.split(" ")[1];

	if (!token) {
		return Response.json(
			{ ok: false, message: "No token provided" },
			{
				status: 401,
			}
		);
	}
	const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

	try {
		await connectDB();

		const activity = await Activity.findById(id);
		if (!activity) {
			return Response.json(
				{ ok: false, message: "Activity not found" },
				{ status: 404 }
			);
		}

		// Check if user is already a participant
		if (activity.participants.includes(userId)) {
			return Response.json(
				{ ok: false, message: "You are already part of this activity" },
				{ status: 400 }
			);
		}

		// Check if activity is full
		if (activity.participants.length >= activity.maxParticipants) {
			return Response.json(
				{ ok: false, message: "Activity is full" },
				{ status: 400 }
			);
		}

		// Add user to participants
		activity.participants.push(userId);
		await activity.save();

		// Get host user for notification
		const user = await User.findById(userId);
		const hostId = activity.hostId || activity.participants[0];

		// Create notification for activity host
		await createNotification(
			hostId,
			"activity",
			`${user.name || user.username || user.email} joined your activity: ${
				activity.title
			}`,
			{ relatedId: activity._id, relatedModel: "Activity" }
		);

		// Add score for joining an activity
		await incrementUserScore(
			userId,
			SCORE_VALUES.JOIN_ACTIVITY,
			"join activity"
		);

		return Response.json(
			{
				ok: true,
				message: "Successfully joined the activity",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return Response.json(
			{ ok: false, message: error.message },
			{ status: 500 }
		);
	}
};
