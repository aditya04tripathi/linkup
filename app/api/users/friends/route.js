import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verify } from "jsonwebtoken";
import { headers } from "next/headers";

export const GET = async (req) => {
	const headerList = await headers();
	const token = headerList.get("Authorization").split(" ")[1];

	if (!token) {
		return Response.json(
			{ ok: false, message: "No token provided" },
			{ status: 401 }
		);
	}

	const { id } = verify(token, process.env.JWT_SECRET);

	if (!id) {
		return Response.json(
			{ ok: false, message: "Invalid token" },
			{ status: 401 }
		);
	}

	try {
		await connectDB();
		const user = await User.findOne({
			_id: id,
		}).populate("friends");

		console.log(user.friends);

		return Response.json(
			{
				ok: true,
				message: user.friends,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error("Error fetching friends:", error);
		return Response.json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};
