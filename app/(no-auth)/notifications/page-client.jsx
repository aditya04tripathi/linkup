"use client";

import { NotificationsList } from "@/components/user/NotificationsList";
import { MOCK_NOTIFICATIONS } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export const NotificationsClient = () => {
	const { user } = useAuth();
	const router = useRouter();
	const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
	const [loading, setLoading] = useState(true);

	// In a real app, fetch notifications from API
	const fetchNotifications = async () => {
		try {
			setLoading(true);
			// Comment out in real implementation and use API data instead
			// const { data } = await axios.get("/api/notifications");
			// if (data.ok) {
			//   setNotifications(data.message);
			// }

			// This is just for demo purposes
			setTimeout(() => {
				setNotifications(MOCK_NOTIFICATIONS);
				setLoading(false);
			}, 500);
		} catch (error) {
			console.error("Error fetching notifications:", error);
			toast.error("Failed to load notifications");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNotifications();
	}, []);

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	if (!user) {
		return null;
	}

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">Notifications</h1>
			</div>

			{loading ? (
				<div className="space-y-4 animate-pulse">
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className="h-20 bg-muted rounded-lg"></div>
					))}
				</div>
			) : (
				<NotificationsList initialNotifications={notifications} />
			)}
		</div>
	);
};

export default NotificationsClient;
