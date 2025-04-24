"use client";

import { useState, useEffect } from "react";
import {
	Bell,
	MessageSquare,
	User,
	Calendar,
	Users,
	CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn, MOCK_NOTIFICATIONS } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock notification data - in a real app this would come from your backend

function formatNotificationTime(date) {
	const now = new Date();
	const diffMs = now - new Date(date);
	const diffSec = Math.round(diffMs / 1000);
	const diffMin = Math.round(diffSec / 60);
	const diffHour = Math.round(diffMin / 60);
	const diffDay = Math.round(diffHour / 24);

	if (diffSec < 60) {
		return "just now";
	} else if (diffMin < 60) {
		return `${diffMin}m ago`;
	} else if (diffHour < 24) {
		return `${diffHour}h ago`;
	} else if (diffDay < 7) {
		return `${diffDay}d ago`;
	} else {
		return date.toLocaleDateString();
	}
}

function NotificationItem({ notification, onMarkAsRead }) {
	const getIcon = () => {
		switch (notification.type) {
			case "friend_request":
			case "friend_accepted":
				return <Users className="shrink-0 size-5 text-blue-500" />;
			case "message":
				return <MessageSquare className="shrink-0 size-5 text-violet-500" />;
			case "activity_invite":
			case "activity_reminder":
				return <Calendar className="shrink-0 size-5 text-green-500" />;
			case "points_earned":
				return <CheckCircle className="shrink-0 size-5 text-amber-500" />;
			default:
				return <Bell className="shrink-0 size-5 text-gray-500" />;
		}
	};

	const getActionUrl = () => {
		switch (notification.type) {
			case "friend_request":
				return `/user/${notification.sender.id}`;
			case "friend_accepted":
				return `/user/${notification.sender.id}`;
			case "message":
				return `/message/${notification.conversationId}`;
			case "activity_invite":
			case "activity_reminder":
				return `/activities/${notification.activityId}`;
			default:
				return "#";
		}
	};

	return (
		<div
			className={cn(
				"p-4 border-b border-border relative flex items-start gap-4 transition-colors hover:bg-muted/30",
				!notification.read && "bg-muted/50"
			)}
		>
			{!notification.read && (
				<div className="absolute top-4 right-4 size-2 rounded-full bg-blue-500" />
			)}

			<div className="flex-shrink-0 mt-1">
				{notification.sender ? (
					<Avatar>
						<AvatarFallback>
							{notification.sender.name.charAt(0)}
						</AvatarFallback>
						<AvatarImage
							src={notification.sender.avatar}
							alt={notification.sender.name}
						/>
					</Avatar>
				) : (
					<div className="size-10 rounded-full flex items-center justify-center bg-muted">
						{getIcon()}
					</div>
				)}
			</div>

			<div className="flex-grow">
				<div className="font-medium">
					{notification.sender && (
						<Link
							href={`/user/${notification.sender.id}`}
							className="hover:underline"
						>
							{notification.sender.name}
						</Link>
					)}{" "}
					{notification.message}
				</div>

				{notification.preview && (
					<p className="text-muted-foreground text-sm mt-1">
						"{notification.preview}"
					</p>
				)}

				{notification.activityTitle && (
					<Link
						href={`/activities/${notification.activityId}`}
						className="text-sm font-medium text-primary hover:underline block mt-1"
					>
						{notification.activityTitle}
					</Link>
				)}

				{notification.pointsAmount && (
					<div className="flex items-center gap-2 mt-1">
						<span className="text-amber-500 font-semibold">
							+{notification.pointsAmount} points
						</span>
					</div>
				)}

				<div className="flex items-center gap-3 mt-2">
					<span className="text-xs text-muted-foreground">
						{formatNotificationTime(notification.createdAt)}
					</span>

					{!notification.read && (
						<Button
							variant="link"
							className="p-0 h-auto text-xs"
							onClick={() => onMarkAsRead(notification.id)}
						>
							Mark as read
						</Button>
					)}

					{getActionUrl() !== "#" && (
						<Link href={getActionUrl()} className="ml-auto">
							<Button variant="outline" size="sm" className="text-xs">
								View
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

export default function NotificationsPage() {
	const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
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
	};

	const markAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((notification) => ({ ...notification, read: true }))
		);
	};

	// In a real app, this would be a socket or polling mechanism to get new notifications
	useEffect(() => {
		// Socket connection would be established here
		return () => {
			// Socket cleanup would happen here
		};
	}, []);

	return (
		<div className="w-full max-w-4xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Notifications</h1>
				<div className="flex items-center gap-2">
					{unreadCount > 0 && (
						<Button variant="outline" onClick={markAllAsRead}>
							Mark all as read
						</Button>
					)}
				</div>
			</div>

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
		</div>
	);
}
