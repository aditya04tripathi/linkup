import User from "@/models/User";
import { decode, verify } from "jsonwebtoken";
import { headers } from "next/headers";

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

export const PUT = async (req) => {
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

		const body = await req.json();
		await User.findByIdAndUpdate(decoded.id, body);

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
