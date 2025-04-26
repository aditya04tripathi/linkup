"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { decode } from "jsonwebtoken";
import Groq from "groq-sdk";

const UserContext = createContext();

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

export const UserProvider = ({ children }) => {
	const { token, updateUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

	const fetchUser = async (userId) => {
		setLoading(true);
		try {
			const { data } = await axios.get(`/api/users/${userId}`);
			setLoading(false);

			if (data.ok) {
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const followUser = async (userId) => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`/api/users/follow/${userId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setLoading(false);
			if (data.ok) {
				console.log("UpdatedUser", data.message);
				updateUser(data.message);
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const unfollowUser = async (userId) => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`/api/users/unfollow/${userId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setLoading(false);
			if (data.ok) {
				updateUser(data.message);
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const getUserIceBreaker = async (userId, otherId) => {
		const userProfile = await fetchUser(userId._id);
		if (!userProfile) {
			throw new Error("User not found");
		}

		const otherProfile = await fetchUser(otherId._id);
		if (!otherProfile) {
			throw new Error("Other user not found");
		}

		const groq = new Groq({
			apiKey: "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",
			dangerouslyAllowBrowser: true,
		});

		const messages = await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: `You are a helpful assistant that generates fun icebreakers for users based on their profiles. You will be given two user profiles and you need to generate a fun icebreaker that is relevant to their interests.`,
				},
				{
					role: "user",
					content: `User 1: ${JSON.stringify(userProfile)}`,
				},
				{
					role: "user",
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

		console.log("Generated icebreaker:", messages.choices[0].message.content);

		return messages.choices[0].message.content;
	};

	const getFriendList = async () => {
		const { data } = await axios.post(
			`/api/users/friends`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (data.ok) {
			return data.message;
		} else {
			throw new Error(data.message);
		}
	};

	const calculateCompatibilityScore = async (user1, user2) => {
		const profile1 =
			typeof user1 === "string" ? await fetchUserById(user1) : user1;
		const profile2 =
			typeof user2 === "string" ? await fetchUserById(user2) : user2;

		if (!profile1 || !profile2) {
			throw new Error("One or both user profiles not found");
		}

		const calculateCosineSimilarity = (vectorA, vectorB) => {
			if (vectorA.length === 0 && vectorB.length === 0) return 1;
			if (vectorA.length === 0 || vectorB.length === 0) return 0;

			let dotProduct = 0;
			for (let i = 0; i < vectorA.length; i++) {
				dotProduct += vectorA[i] * vectorB[i];
			}

			const magnitudeA = Math.sqrt(
				vectorA.reduce((sum, val) => sum + val * val, 0)
			);
			const magnitudeB = Math.sqrt(
				vectorB.reduce((sum, val) => sum + val * val, 0)
			);

			return magnitudeA && magnitudeB
				? dotProduct / (magnitudeA * magnitudeB)
				: 0;
		};

		const createFeatureVector = (userInterests, allPossibleInterests) => {
			return allPossibleInterests.map((interest) =>
				userInterests.includes(interest) ? 1 : 0
			);
		};

		let totalScore = 0;
		let maxPossibleScore = 0;

		const interests1 = profile1.interests || [];
		const interests2 = profile2.interests || [];
		const allInterests = [...new Set([...interests1, ...interests2])];

		if (allInterests.length > 0) {
			const interestsVector1 = createFeatureVector(interests1, allInterests);
			const interestsVector2 = createFeatureVector(interests2, allInterests);

			const interestsSimilarity = calculateCosineSimilarity(
				interestsVector1,
				interestsVector2
			);
			const interestScore = interestsSimilarity * 35;

			totalScore += interestScore;
			maxPossibleScore += 35;
		}

		const academicInterests1 = profile1.academicInterests || [];
		const academicInterests2 = profile2.academicInterests || [];
		const allAcademicInterests = [
			...new Set([...academicInterests1, ...academicInterests2]),
		];

		if (allAcademicInterests.length > 0) {
			const academicVector1 = createFeatureVector(
				academicInterests1,
				allAcademicInterests
			);
			const academicVector2 = createFeatureVector(
				academicInterests2,
				allAcademicInterests
			);

			const academicSimilarity = calculateCosineSimilarity(
				academicVector1,
				academicVector2
			);
			const academicScore = academicSimilarity * 25;

			totalScore += academicScore;
			maxPossibleScore += 25;
		}

		if (
			profile1.extroversionLevel !== undefined &&
			profile2.extroversionLevel !== undefined
		) {
			const extroversion1 = profile1.extroversionLevel / 10;
			const extroversion2 = profile2.extroversionLevel / 10;

			const extroversionSimilarity =
				1 - Math.abs(extroversion1 - extroversion2);
			const extroversionScore = extroversionSimilarity * 15;

			totalScore += extroversionScore;
			maxPossibleScore += 15;
		}

		if (
			profile1.energyLevel !== undefined &&
			profile2.energyLevel !== undefined
		) {
			const energy1 = profile1.energyLevel / 10;
			const energy2 = profile2.energyLevel / 10;

			const energySimilarity = 1 - Math.abs(energy1 - energy2);
			const energyScore = energySimilarity * 15;

			totalScore += energyScore;
			maxPossibleScore += 15;
		}

		if (profile1.preferredGroupSize && profile2.preferredGroupSize) {
			const midpoint1 =
				(profile1.preferredGroupSize[0] + profile1.preferredGroupSize[1]) / 2;
			const midpoint2 =
				(profile2.preferredGroupSize[0] + profile2.preferredGroupSize[1]) / 2;

			const maxDiff = 9;
			const actualDiff = Math.abs(midpoint1 - midpoint2);

			const groupSizeSimilarity = 1 - actualDiff / maxDiff;
			const groupSizeScore = groupSizeSimilarity * 10;

			totalScore += groupSizeScore;
			maxPossibleScore += 10;
		}

		let finalScore =
			maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 50;

		finalScore = Math.min(100, Math.max(0, finalScore));

		return finalScore;
	};

	const searchUsers = async (searchQuery) => {
		try {
			const { data } = await axios.get(`/api/users?search=${searchQuery}`);
			if (data.ok) {
				return data.message;
			}
			return [];
		} catch (error) {
			return [];
		}
	};

	const updateUserProfile = async (userData) => {
		try {
			const { data } = await axios.put("/api/users/me", userData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (data.ok) {
				updateUser(data.message);
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			throw error;
		}
	};

	const fetchUsers = async (limit = 10, offset = 0) => {
		try {
			const { data } = await axios.get(
				`/api/users?limit=${limit}&offset=${offset}`
			);
			const { id } = decode(token);
			if (data.ok) {
				return data.message.filter((user) => user._id !== id);
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			throw error;
		}
	};

	const fetchUserById = async (userId) => {
		try {
			const { data } = await axios.get(`/api/users/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log(userId, data);

			if (data.ok) {
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			console.error("Error fetching user by ID:", error);
			throw error;
		}
	};

	const fetchAllUsers = async () => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.get("/api/users", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			data.message = data.message.filter(
				(user) => user._id !== decode(token).id
			);

			setLoading(false);
			if (data.ok) {
				setUsers(data.message);
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			setLoading(false);
			setError(error);
			throw error;
		}
	};

	return (
		<UserContext.Provider
			value={{
				fetchUser,
				followUser,
				unfollowUser,
				getUserIceBreaker,
				getFriendList,
				fetchAllUsers,
				calculateCompatibilityScore,
				searchUsers,
				updateUserProfile,
				fetchUsers,
				fetchUserById,
				loading,
				users,
				error,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
