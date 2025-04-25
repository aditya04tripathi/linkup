"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
	BadgeCheck,
	User,
	Globe,
	Calendar,
	MessageCircle,
	Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/contexts/NotificationContext";

const getNotificationIcon = (type) => {
	switch (type) {
		case "friend":
			return <User className="size-5" />;
		case "activity":
			return <Calendar className="size-5" />;
		case "system":
			return <Globe className="size-5" />;
		default:
			return <MessageCircle className="size-5" />;
	}
};

export default function NotificationItem({ notification }) {
	const { markAsRead } = useNotification();
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { _id, message, type, read, createdAt } = notification;

	const handleMarkAsRead = async () => {
		if (!read) {
			setIsLoading(true);
			try {
				await markAsRead(_id);
			} catch (error) {
				console.error("Error marking notification as read:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<div
			className={cn(
				"flex items-start gap-3 p-4 border-b transition-colors hover:bg-accent/5",
				!read && "bg-accent/10"
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={cn("rounded-full p-2 bg-muted", !read && "bg-primary/10")}
			>
				{getNotificationIcon(type)}
			</div>

			<div className="flex-1 min-w-0">
				<p className={cn("text-sm line-clamp-2", !read && "font-medium")}>
					{message}
				</p>
				<p className="text-xs text-muted-foreground mt-1">
					{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
				</p>
			</div>

			{!read && isHovered && (
				<Button
					variant="ghost"
					size="sm"
					onClick={handleMarkAsRead}
					disabled={isLoading}
					className="opacity-70 hover:opacity-100"
				>
					{isLoading ? (
						<Loader2 className="size-4 mr-1 animate-spin" />
					) : (
						<BadgeCheck className="size-4 mr-1" />
					)}
					{isLoading ? "Processing..." : "Mark read"}
				</Button>
			)}

			{read && <span className="text-xs text-muted-foreground">Read</span>}
		</div>
	);
}
