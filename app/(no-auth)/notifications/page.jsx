import { NotificationsClient } from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export const metadata = {
	title: "Notifications | LinkUp",
	description: "Stay updated with your latest activity notifications",
};

export default function NotificationsPage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<NotificationsClient />
		</Suspense>
	);
}
