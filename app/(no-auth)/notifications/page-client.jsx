"use client";

import { NotificationsList } from "@/components/user/NotificationsList";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NotificationsClient = () => {
	const { user } = useAuth();
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

			<NotificationsList />
		</div>
	);
};

export default NotificationsClient;
