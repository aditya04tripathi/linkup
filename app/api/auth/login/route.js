import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import * as jwt from "jsonwebtoken";
import { createNotification } from "@/lib/notifications";
import { incrementUserScore, SCORE_VALUES } from "@/lib/scoring";

export const POST = async (req) => {
	const { email, password } = await req.json();

	await connectDB();
	try {
		if (!email || !password) {
			return Response.json(
				{ ok: false, message: "All fields are required" },
				{
					status: 400,
				}
			);
		}

		const user = await User.findOne({ email });
		if (!user)
			return Response.json(
				{ ok: false, message: "User doesn't exist" },
				{
					status: 400,
				}
			);

		const isPasswordCorrect = await user.comparePassword(password);

		if (!isPasswordCorrect)
			return Response.json(
				{ ok: false, message: "Invalid credentials" },
				{
					status: 400,
				}
			);

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET
		);

		// Create login notification
		await createNotification(
			user._id,
			"system",
			`Welcome back, ${user.name || user.email}!`
		);

		// Increment user score for logging in
		await incrementUserScore(user._id, SCORE_VALUES.LOGIN, "login");

		return Response.json(
			{
				ok: true,
				message: {
					token,
					...user._doc,
				},
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		return Response.json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};
