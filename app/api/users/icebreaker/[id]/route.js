import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { headers } from "next/headers";
import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Groq } from "groq-sdk";

export const POST = async (req, { params }) => {
	const { id: otherId } = await params;
	const headersList = headers();

	try {
		const authHeader = headersList.get("Authorization");
		if (!authHeader) {
			return Response.json(
				{ ok: false, message: "No authorization header" },
				{ status: 401 }
			);
		}

		// Extract and verify token
		const token = authHeader.split(" ")[1];
		if (!token) {
			return Response.json(
				{ ok: false, message: "No token provided" },
				{ status: 401 }
			);
		}

		// Get current user ID from token
		const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
		if (!userId) {
			return Response.json(
				{ ok: false, message: "Invalid token" },
				{ status: 401 }
			);
		}

		// Validate MongoDB ObjectIds
		if (!Types.ObjectId.isValid(otherId) || !Types.ObjectId.isValid(userId)) {
			return Response.json(
				{ ok: false, message: "Invalid user ID format" },
				{ status: 400 }
			);
		}

		// Connect to database
		await connectDB();

		// Fetch both user profiles
		const userProfile = await User.findById(userId);
		if (!userProfile) {
			return Response.json(
				{ ok: false, message: "User not found" },
				{ status: 404 }
			);
		}

		const otherProfile = await User.findById(otherId);
		if (!otherProfile) {
			return Response.json(
				{ ok: false, message: "Other user not found" },
				{ status: 404 }
			);
		}

		// Initialize Groq client with server-side API key
		const groq = new Groq({
			apiKey: process.env.GROQ_API_KEY,
		});

		// Generate the icebreaker using Groq
		const messages = await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: `You are a helpful assistant that generates fun icebreakers for users based on their profiles. You will be given two user profiles and you need to generate a fun icebreaker that is relevant to their interests.`,
				},
				{
					role: "system",
					content: `User 1: ${JSON.stringify(userProfile)}`,
				},
				{
					role: "system",
					content: `User 2: ${JSON.stringify(otherProfile)}`,
				},
				{
					role: "user",
					content: `The icebreaker should be fun, engaging, and relevant to their interests. The response should be a single sentence that is easy to understand and can be used as an icebreaker in a conversation. There should be no additional text or explanation.`,
				},
			],
			model: "llama-3.1-8b-instant",
			temperature: 0.75,
		});

		const icebreaker = messages.choices[0].message.content;

		return Response.json(
			{
				ok: true,
				message: icebreaker,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Icebreaker generation error:", error);
		return Response.json(
			{ ok: false, message: error.message || "Internal server error" },
			{ status: 500 }
		);
	}
};
