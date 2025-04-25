import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const POST = async (req) => {
	const { username, name, email, password } = await req.json();

	await connectDB();
	try {
		if (!username || !name || !email || !password) {
			return Response.json(
				{ ok: false, message: "All fields are required" },
				{
					status: 400,
				}
			);
		}

		const user = await User.findOne({ email });
		if (user)
			return Response.json(
				{ ok: false, message: "User already exists" },
				{
					status: 400,
				}
			);

		const newUser = await User.create({
			username,
			name,
			email,
			password,
		});

		return Response.json(
			{
				ok: true,
				message: newUser,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		return res.status(500).json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};
