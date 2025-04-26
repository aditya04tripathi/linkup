import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { incrementUserScore, SCORE_VALUES } from "@/lib/scoring";
import { createNotification } from "@/lib/notifications";

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

		// Add score for account creation
		await incrementUserScore(
			newUser._id,
			SCORE_VALUES.REGISTER,
			"account registration"
		);

		// Create welcome notification
		await createNotification(
			newUser._id,
			"system",
			`Welcome to the platform, ${name || username}!`
		);

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
