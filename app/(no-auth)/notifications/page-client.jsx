"use client";

import { NotificationsList } from "@/components/user/NotificationsList";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NotificationsClient = () => {
	const { user } = useAuth();
	const { loading } = useNotification();
	const router = useRouter();

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
				<NotificationsList />
			)}
		</div>
	);
};

export default NotificationsClient;
