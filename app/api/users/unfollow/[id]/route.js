import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const POST = async (req, { params }) => {
	const { id } = params;
	const headersList = headers();

	try {
		const authHeader = headersList.get("Authorization");
		if (!authHeader) {
			return Response.json(
				{ ok: false, message: "No authorization header" },
				{ status: 401 }
			);
		}

		const token = authHeader.split(" ")[1];
		if (!token) {
			return Response.json(
				{ ok: false, message: "No token provided" },
				{ status: 401 }
			);
		}

		const { id: followerUserId } = jwt.verify(token, process.env.JWT_SECRET);
		if (!followerUserId) {
			return Response.json(
				{ ok: false, message: "Invalid token" },
				{ status: 401 }
			);
		}

		// Validate MongoDB ObjectIds
		if (
			!Types.ObjectId.isValid(id) ||
			!Types.ObjectId.isValid(followerUserId)
		) {
			return Response.json(
				{ ok: false, message: "Invalid user ID format" },
				{ status: 400 }
			);
		}

		// Prevent self-unfollowing
		if (followerUserId === id) {
			return Response.json(
				{ ok: false, message: "Cannot unfollow yourself" },
				{ status: 400 }
			);
		}

		await connectDB();

		// Check if target user exists
		const userToUnfollow = await User.findById(id);
		if (!userToUnfollow) {
			return Response.json(
				{ ok: false, message: "User not found" },
				{ status: 404 }
			);
		}

		// Update follower's friends list by removing the unfollowed user
		const updatedUser = await User.findByIdAndUpdate(
			followerUserId,
			{
				$pull: {
					friends: id, // Remove the user ID from the friends array
				},
			},
			{ new: true }
		);

		return Response.json(
			{
				ok: true,
				message: updatedUser,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Unfollow error:", error);
		return Response.json(
			{ ok: false, message: error.message || "Internal server error" },
			{ status: 500 }
		);
	}
};
