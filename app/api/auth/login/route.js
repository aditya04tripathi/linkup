import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import * as jwt from "jsonwebtoken";

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
