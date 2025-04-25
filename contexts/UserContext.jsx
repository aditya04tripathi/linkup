"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { decode } from "jsonwebtoken";

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

	const fetchUser = async (userId) => {
		setLoading(true);
		try {
			const { data } = await axios.get(`/api/users/${userId}`);
			setLoading(false);

			if (data.ok) {
				console.log("Fetch user OK");
				return data.message;
			} else {
				console.log("Fetch user NOTOK", error);
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

	// const getUserMatches = async (userId) => {
	// 	try {
	// 		const { data } = await axios.get(`/api/users/match/${userId}`);
	// 		if (data.ok) {
	// 			return data.message.compatibility;
	// 		}
	// 		return 0.5;
	// 	} catch (error) {
	// 		return 0.5;
	// 	}
	// };

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
			const { data } = await axios.get(`/api/users/${userId}`);
			if (data.ok) {
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			throw error;
		}
	};

	const fetchUserConversations = async () => {
		try {
			const { data } = await axios.get("/api/conversations", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (data.ok) {
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			console.error("Error fetching conversations:", error);
			throw error;
		}
	};

	return (
		<UserContext.Provider
			value={{
				loading,
				fetchUser,
				followUser,
				unfollowUser,
				// getUserMatches,
				searchUsers,
				updateUserProfile,
				fetchUsers,
				fetchUserById,
				fetchUserConversations,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
