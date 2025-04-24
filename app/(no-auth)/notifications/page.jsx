import NotificationsList from "@/components/NotificationsList";
import { MOCK_NOTIFICATIONS } from "@/lib/utils";

async function getNotifications() {
	// In a real app, this would fetch notifications from an API
	// Example: const res = await fetch('https://api.example.com/notifications', { cache: 'no-store' });
	// return res.json();

	// For now, return mock data
	return MOCK_NOTIFICATIONS;
}

export default async function NotificationsPage() {
	// Fetch notifications server-side
	const notifications = await getNotifications();

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">Notifications</h1>
			</div>

			<NotificationsList initialNotifications={notifications} />
		</div>
	);
}
