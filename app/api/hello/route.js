import { MOCK_USERS } from "@/lib/utils";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const GET = async (req) => {
	await connectDB();
	MOCK_USERS.forEach(async (user) => {
		await User.create(user);
	});

	return Response.json(
		{
			ok: true,
			message: "Users created successfully",
		},
		{
			status: 201,
		}
	);
};
