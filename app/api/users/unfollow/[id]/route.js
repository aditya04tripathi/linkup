import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";
import { createNotification } from "@/lib/notifications";

export const POST = async (req, { params }) => {
	const { id } = await params;
	const headersList = await headers();

	const token = headersList.get("Authorization").split(" ")[1];

	if (!token) {
		return Response.json(
			{ ok: false, message: "No token provided" },
			{
				status: 401,
			}
		);
	}

	const { id: followFrom } = jwt.verify(token, process.env.JWT_SECRET);
	if (!followFrom) {
		return Response.json(
			{ ok: false, message: "Invalid token" },
			{
				status: 401,
			}
		);
	}

	try {
		await connectDB();
		const toFollow = await User.findOne({
			_id: id,
		});

		if (!toFollow) {
			return Response.json(
				{ ok: false, message: "User not found" },
				{
					status: 404,
				}
			);
		}

		const updatedUser = await User.findOneAndUpdate(
			{
				_id: followFrom,
			},
			{
				$addToSet: {
					friends: id,
				},
			},
			{
				new: true,
			}
		);

		// Create notification for the user being followed
		await createNotification(
			id,
			"friend",
			`${updatedUser.name || updatedUser.email} started following you!`,
			{ relatedId: followFrom, relatedModel: "User" }
		);

		return Response.json(
			{
				ok: true,
				message: updatedUser,
			},
			{
				status: 200,
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
