"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationItem from "@/components/user/NotificationItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotification } from "@/contexts/NotificationContext";

export function NotificationsList() {
	const { notifications, markAsRead, markAllAsRead } = useNotification();
	const [activeTab, setActiveTab] = useState("all");

	const unreadCount = notifications.filter((n) => !n.read).length;

	const filteredNotifications =
		activeTab === "all"
			? notifications
			: activeTab === "unread"
			? notifications.filter((n) => !n.read)
			: notifications.filter((n) => n.type === activeTab);

	const handleMarkAsRead = (id) => {
		markAsRead(id);
	};

	const handleMarkAllAsRead = () => {
		markAllAsRead();
	};

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
					<TabsTrigger value="activity">Activities</TabsTrigger>
					<TabsTrigger value="friend">Friends</TabsTrigger>
					<TabsTrigger value="system">System</TabsTrigger>
				</TabsList>

				{unreadCount > 0 && (
					<Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
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
									key={notification._id}
									notification={notification}
									onMarkAsRead={handleMarkAsRead}
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
									: `No ${activeTab} notifications`}
							</p>
						</div>
					)}
				</div>
			</TabsContent>
		</Tabs>
	);
}
