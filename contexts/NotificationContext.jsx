"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

const NotificationContext = createContext(null);

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error("useNotification must be used within NotificationProvider");
	}
	return context;
};

export const NotificationProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [unreadCount, setUnreadCount] = useState(0);
	const { token, user } = useAuth();

	const fetchNotifications = async () => {
		if (!token || !user) {
			setLoading(false);
			return;
		}

		try {
			setLoading(true);
			const { data } = await axios.get("/api/notifications", {
				headers: { Authorization: `Bearer ${token}` },
			});

			if (data.ok) {
				setNotifications(data.message);
				setUnreadCount(data.message.filter((n) => !n.read).length);
			}
		} catch (error) {
			console.error("Error fetching notifications:", error);
		} finally {
			setLoading(false);
		}
	};

	const markAsRead = async (notificationId) => {
		if (!token) return;

		try {
			const { data } = await axios.patch(
				"/api/notifications",
				{ notificationId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (data.ok) {
				setNotifications((prev) =>
					prev.map((notification) =>
						notification._id === notificationId
							? { ...notification, read: true }
							: notification
					)
				);
				setUnreadCount((prev) => Math.max(0, prev - 1));
			}
		} catch (error) {
			console.error("Error marking notification as read:", error);
			toast.error("Failed to update notification");
		}
	};

	const markAllAsRead = async () => {
		if (!token) return;

		try {
			const { data } = await axios.patch(
				"/api/notifications/mark-all-read",
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			if (data.ok) {
				setNotifications((prev) =>
					prev.map((notification) => ({ ...notification, read: true }))
				);
				setUnreadCount(0);
			}
		} catch (error) {
			console.error("Error marking all notifications as read:", error);
			toast.error("Failed to update notifications");
		}
	};

	// Fetch notifications when user logs in
	useEffect(() => {
		if (user && token) {
			fetchNotifications();
		}
	}, [user, token]);

	const value = {
		notifications,
		loading,
		unreadCount,
		fetchNotifications,
		markAsRead,
		markAllAsRead,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};
