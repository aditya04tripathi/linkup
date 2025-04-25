import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";

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

	const { id: unfollowFrom } = jwt.verify(token, process.env.JWT_SECRET);
	if (!unfollowFrom) {
		return Response.json(
			{ ok: false, message: "Invalid token" },
			{
				status: 401,
			}
		);
	}

	try {
		await connectDB();
		const toUnfollow = await User.findOne({
			_id: id,
		});

		if (!toUnfollow) {
			return Response.json(
				{ ok: false, message: "User not found" },
				{
					status: 404,
				}
			);
		}

		const updatedUser = await User.findOneAndUpdate(
			{
				_id: unfollowFrom,
			},
			{
				$removeFromSet: {
					friends: id,
				},
			},
			{
				new: true,
			}
		);

		console.log(updatedUser);

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
