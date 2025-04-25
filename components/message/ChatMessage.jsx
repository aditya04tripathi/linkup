import React from "react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../UserAvatar";

const ChatMessage = ({ message, isCurrentUser, formatTime }) => {
	return (
		<div
			className={cn(
				"flex items-start gap-2 mb-4",
				isCurrentUser ? "flex-row-reverse" : "flex-row"
			)}
		>
			<UserAvatar
				user={isCurrentUser ? message.sender : message.recipient}
				className="h-8 w-8 mt-1"
			/>

			<div
				className={cn(
					"max-w-[80%] rounded-lg p-3",
					isCurrentUser
						? "bg-primary text-primary-foreground rounded-br-none"
						: "bg-muted rounded-bl-none"
				)}
			>
				<p>{message.content}</p>
				<p
					className={cn(
						"text-xs mt-1",
						isCurrentUser
							? "text-primary-foreground/70"
							: "text-muted-foreground"
					)}
				>
					{formatTime(message.createdAt)}
				</p>
			</div>
		</div>
	);
};

export default ChatMessage;
