import { connectDB } from "./mongodb";
import User from "@/models/User";

/**
 * Increment a user's score
 * @param {string} userId - User's ID
 * @param {number} amount - Amount to increment (default: 1)
 * @param {string} reason - Reason for score increment (optional)
 * @returns {Promise<Object>} Updated user object
 */
export const incrementUserScore = async (
	userId,
	amount = 1,
	reason = "app interaction"
) => {
	try {
		await connectDB();

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $inc: { score: amount } },
			{ new: true }
		);

		return updatedUser;
	} catch (error) {
		console.error("Error updating user score:", error);
		return null;
	}
};

/**
 * Score values for different actions
 */
export const SCORE_VALUES = {
	LOGIN: 5,
	CREATE_ACTIVITY: 10,
	JOIN_ACTIVITY: 5,
	FOLLOW_USER: 3,
	UNFOLLOW_USER: 1,
	READ_NOTIFICATION: 1,
};
