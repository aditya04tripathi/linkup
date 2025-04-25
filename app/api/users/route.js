import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const GET = async (req) => {
	const searchParams = req.nextUrl.searchParams;
	const limit = searchParams.get("limit") || 10;
	const page = searchParams.get("page") || 1;

	await connectDB();
	try {
		const users = await User.find()
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ score: -1 });

		return Response.json(
			{
				ok: true,
				message: users,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.log("Error in getUsers:", error);
		return Response.json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};
