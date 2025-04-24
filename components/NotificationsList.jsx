"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationItem from "@/components/NotificationItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NotificationsList({ initialNotifications }) {
	const [notifications, setNotifications] = useState(initialNotifications);
	const [activeTab, setActiveTab] = useState("all");

	const unreadCount = notifications.filter((n) => !n.read).length;

	const filteredNotifications =
		activeTab === "all"
			? notifications
			: activeTab === "unread"
			? notifications.filter((n) => !n.read)
			: notifications.filter((n) => n.type === activeTab);

	const markAsRead = (id) => {
		setNotifications((prev) =>
			prev.map((notification) =>
				notification.id === id ? { ...notification, read: true } : notification
			)
		);

		// In a real app, this would call an API to update the server
		// Example: fetch('/api/notifications/${id}/read', { method: 'PUT' })
	};

	const markAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((notification) => ({ ...notification, read: true }))
		);

		// In a real app, this would call an API to update the server
		// Example: fetch('/api/notifications/read-all', { method: 'PUT' })
	};

	// In a real app, this would be a socket or polling mechanism to get new notifications
	useEffect(() => {
		// Example socket connection
		// const socket = io(process.env.NEXT_PUBLIC_API_URL);
		// socket.on('notification:new', (newNotification) => {
		//   setNotifications(prev => [newNotification, ...prev]);
		// });
		// return () => socket.disconnect();
	}, []);

	return (
		<Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
			<div className="flex items-center justify-between mb-4">
				<TabsList>
					<TabsTrigger value="all">
						All
						<span className="ml-1 text-xs">({notifications.length})</span>
					</TabsTrigger>
					<TabsTrigger value="unread">
						Unread
						<span className="ml-1 text-xs">({unreadCount})</span>
					</TabsTrigger>
					<TabsTrigger value="friend_request">Friend</TabsTrigger>
					<TabsTrigger value="message">Messages</TabsTrigger>
					<TabsTrigger value="activity_invite">Activities</TabsTrigger>
				</TabsList>

				{unreadCount > 0 && (
					<Button variant="outline" size="sm" onClick={markAllAsRead}>
						Mark all as read
					</Button>
				)}
			</div>

			<TabsContent value={activeTab} className="mt-0">
				<div className="border rounded-lg overflow-hidden bg-background">
					{filteredNotifications.length > 0 ? (
						<ScrollArea className="h-[calc(100vh-220px)]">
							{filteredNotifications.map((notification) => (
								<NotificationItem
									key={notification.id}
									notification={notification}
									onMarkAsRead={markAsRead}
								/>
							))}
						</ScrollArea>
					) : (
						<div className="flex flex-col items-center justify-center py-20">
							<Bell className="size-12 text-muted-foreground mb-4" />
							<h3 className="text-xl font-medium">No notifications</h3>
							<p className="text-muted-foreground mt-1">
								{activeTab === "all"
									? "You don't have any notifications"
									: activeTab === "unread"
									? "No unread notifications"
									: `No ${activeTab.replace("_", " ")} notifications`}
							</p>
						</div>
					)}
				</div>
			</TabsContent>
		</Tabs>
	);
}
