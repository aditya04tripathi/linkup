"use client";

import {
	Bell,
	MessageSquare,
	Users,
	Calendar,
	CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatNotificationTime } from "@/lib/formatters";

export default function NotificationItem({ notification, onMarkAsRead }) {
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
