import User from "@/models/User";
import { decode, verify } from "jsonwebtoken";
import { headers } from "next/headers";
import { incrementUserScore, SCORE_VALUES } from "@/lib/scoring";

export const GET = async (req) => {
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

	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return Response.json(
				{ ok: false, message: "Invalid token" },
				{
					status: 401,
				}
			);
		}

		const user = await User.findById(decoded.id);
		if (!user) {
			return Response.json(
				{ ok: false, message: "User not found" },
				{
					status: 404,
				}
			);
		}

		return Response.json(
			{
				ok: true,
				message: user,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error("Error in auth/me:", error);
		return Response.json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};

export const POST = async (req) => {
	const body = await req.json();

	if (!body) {
		return Response.json(
			{ ok: false, message: "No body provided" },
			{
				status: 400,
			}
		);
	}
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

	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return Response.json(
				{ ok: false, message: "Invalid token" },
				{
					status: 401,
				}
			);
		}

		console.log(decoded.id);

		const user = await User.findOne({ _id: decoded.id });
		if (!user) {
			return Response.json(
				{ ok: false, message: "User not found" },
				{
					status: 404,
				}
			);
		}

		await User.findByIdAndUpdate(decoded.id, body);

		// Add score for updating profile
		await incrementUserScore(
			decoded.id,
			SCORE_VALUES.UPDATE_PROFILE,
			"update profile"
		);

		return Response.json(
			{
				ok: true,
				message: "User updated successfully",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error("Error in auth/me:", error);
		return Response.json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};
