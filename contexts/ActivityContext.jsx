"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ActivityContext = createContext();

export const useActivity = () => {
	const context = useContext(ActivityContext);
	if (!context) {
		throw new Error("useActivity must be used within an ActivityProvider");
	}
	return context;
};

export const ActivityProvider = ({ children }) => {
	const { token, user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [activities, setActivities] = useState([]);

	console.log(activities, "activities");

	const fetchActivity = async (activityId, populate = true) => {
		setLoading(true);
		try {
			const { data } = await axios.get(
				`/api/activities/${activityId}?populate=${populate}`
			);
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

	const fetchActivities = async (limit = 10, offset = 0, filter = {}) => {
		setLoading(true);
		try {
			let queryParams = `limit=${limit}&offset=${offset}`;

			if (filter.type) {
				queryParams += `&type=${filter.type}`;
			}

			if (filter.search) {
				queryParams += `&search=${filter.search}`;
			}

			const { data } = await axios.get(`/api/activities?${queryParams}`);
			setLoading(false);

			if (data.ok) {
				setActivities(data.message);
				return data.message;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	const createActivity = async (activityData) => {
		setLoading(true);
		try {
			const { data } = await axios.post("/api/activities", activityData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setLoading(false);
			if (data.ok) {
				toast.success("Activity created successfully");
				return data.message;
			} else {
				toast.error(data.message);
				throw new Error(data.message);
			}
		} catch (error) {
			setLoading(false);
			toast.error(error.message || "Failed to create activity");
			throw error;
		}
	};

	const joinActivity = async (activityId) => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`/api/activities/${activityId}/join`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setLoading(false);
			if (data.ok) {
				toast.success("Successfully joined the activity!");
				return data.message;
			} else {
				toast.error(data.message);
				throw new Error(data.message);
			}
		} catch (error) {
			setLoading(false);
			toast.error(error.message || "Failed to join activity");
			throw error;
		}
	};

	const leaveActivity = async (activityId) => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`/api/activities/${activityId}/leave`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setLoading(false);
			if (data.ok) {
				toast.success("Successfully left the activity");
				return data.message;
			} else {
				toast.error(data.message);
				throw new Error(data.message);
			}
		} catch (error) {
			setLoading(false);
			toast.error(error.message || "Failed to leave activity");
			throw error;
		}
	};

	const getUserActivities = async (userId) => {
		setLoading(true);
		try {
			const { data } = await axios.get(`/api/users/${userId}/activities`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

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

	const hasUserJoined = (activity) => {
		if (!user || !activity) return false;
		return activity.participants.includes(user._id);
	};

	return (
		<ActivityContext.Provider
			value={{
				loading,
				activities,
				fetchActivity,
				fetchActivities,
				createActivity,
				joinActivity,
				leaveActivity,
				getUserActivities,
				hasUserJoined,
			}}
		>
			{children}
		</ActivityContext.Provider>
	);
};
