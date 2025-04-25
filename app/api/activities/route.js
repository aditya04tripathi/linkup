import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";
import { createNotification } from "@/lib/notifications";

export const GET = async (req) => {
	const searchParams = req.nextUrl.searchParams;
	const limit = searchParams.get("limit") || 10;
	try {
		await connectDB();
		const activities = await Activity.find({})
			.sort({ createdAt: -1 })
			.populate("participants")
			.limit(limit);

		return Response.json(
			{
				ok: true,
				message: activities,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return Response.json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};

export const POST = async (req) => {
	const {
		title,
		description,
		type,
		location,
		dateTime,
		duration,
		maxParticipants,
	} = await req.json();
	const headersList = await headers();
	const token = headersList.get("Authorization")?.split(" ")[1];

	if (!token) {
		return Response.json(
			{ ok: false, message: "Unauthorized" },
			{
				status: 401,
			}
		);
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	if (!decoded) {
		return Response.json(
			{ ok: false, message: "Unauthorized" },
			{
				status: 401,
			}
		);
	}

	try {
		if (
			!title ||
			!description ||
			!type ||
			!location ||
			!dateTime ||
			!duration ||
			!maxParticipants
		) {
			return Response.json(
				{ ok: false, message: "All fields are required" },
				{
					status: 400,
				}
			);
		}

		await connectDB();
		const newActivity = await Activity.create({
			title,
			description,
			hostId: decoded.id,
			location,
			dateTime,
			type,
			participants: [decoded.id],
			maxParticipants,
			duration,
		});

		// Create activity creation notification
		await createNotification(
			decoded.id,
			"activity",
			`You've created a new activity: ${title}`,
			{ relatedId: newActivity._id, relatedModel: "Activity" }
		);

		return Response.json(
			{
				ok: true,
				message: newActivity,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		console.error(error);
		return Response.json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};
