import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { headers } from "next/headers";

import * as jwt from "jsonwebtoken";

export const POST = async (req, { params }) => {
	const { id } = await params;

	// Get the auth token from the request headers
	const headersList = await headers();
	const token = headersList.get("Authorization")?.split(" ")[1];

	console.log(token);

	if (!token) {
		return Response.json(
			{ ok: false, message: "No token provided" },
			{
				status: 401,
			}
		);
	}
	const { id: selfId } = jwt.verify(token, process.env.JWT_SECRET);

	try {
		await connectDB();

		const activity = await Activity.findById(id);
		if (!activity) {
			return Response.json(
				{ ok: false, message: "Activity not found" },
				{ status: 404 }
			);
		}

		if (activity.participants[0].toString() === selfId) {
			return Response.json(
				{ ok: false, message: "Creator cannot leave the activity" },
				{ status: 403 }
			);
		}

		const participantIndex = activity.participants.findIndex(
			(participant) => participant.toString() === selfId
		);

		if (participantIndex === -1) {
			return Response.json(
				{ ok: false, message: "You are not part of this activity" },
				{ status: 400 }
			);
		}

		activity.participants.splice(participantIndex, 1);
		await activity.save();

		return Response.json(
			{
				ok: true,
				message: "Successfully left the activity",
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
