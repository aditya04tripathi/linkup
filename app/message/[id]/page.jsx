import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, MOCK_USERS } from "@/lib/utils";
import { ArrowLeft, Send, User } from "lucide-react";
import Link from "next/link";
import React from "react";

// Mock message data - in a real app this would come from a database
const MOCK_MESSAGES = {
	1: [
		{
			id: 1,
			senderId: "currentUser123",
			text: "Hey! How are you doing?",
			timestamp: new Date(Date.now() - 3600000 * 24),
		},
		{
			id: 2,
			senderId: "1",
			text: "I'm good, thanks! How about you?",
			timestamp: new Date(Date.now() - 3600000 * 23),
		},
		{
			id: 3,
			senderId: "currentUser123",
			text: "I'm doing well. I saw you're interested in AI. Have you checked out any of the new LLM models?",
			timestamp: new Date(Date.now() - 3600000 * 22),
		},
		{
			id: 4,
			senderId: "1",
			text: "Yes! I've been playing around with some open-source models. The progress in the field is absolutely incredible.",
			timestamp: new Date(Date.now() - 3600000 * 21),
		},
		{
			id: 5,
			senderId: "currentUser123",
			text: "Totally agree! Would you be interested in joining a study group on ML that I'm organizing?",
			timestamp: new Date(Date.now() - 3600000 * 5),
		},
		{
			id: 6,
			senderId: "1",
			text: "That sounds perfect! Count me in.",
			timestamp: new Date(Date.now() - 3600000 * 4),
		},
	],
	2: [
		{
			id: 1,
			senderId: "currentUser123",
			text: "Hey James, are you playing in the basketball tournament this weekend?",
			timestamp: new Date(Date.now() - 3600000 * 48),
		},
		{
			id: 2,
			senderId: "2",
			text: "Yes, I'm on team Blue Eagles. Are you playing too?",
			timestamp: new Date(Date.now() - 3600000 * 47),
		},
		{
			id: 3,
			senderId: "currentUser123",
			text: "Yep, I'll be there with the Red Hawks. Looking forward to seeing you on the court!",
			timestamp: new Date(Date.now() - 3600000 * 46),
		},
	],
};

async function getUser(id) {
	return MOCK_USERS.find((user) => user.id === id) || null;
}

async function getCurrentUser() {
	return {
		id: "currentUser123",
		name: "Current User",
	};
}

function formatMessageTime(date) {
	const now = new Date();
	const messageDate = new Date(date);

	// If today, show time only
	if (messageDate.toDateString() === now.toDateString()) {
		return messageDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	// If yesterday, show "Yesterday" and time
	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);
	if (messageDate.toDateString() === yesterday.toDateString()) {
		return `Yesterday, ${messageDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})}`;
	}

	// Otherwise show date and time
	return `${messageDate.toLocaleDateString([], {
		month: "short",
		day: "numeric",
	})}, ${messageDate.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	})}`;
}

const MessagePage = async ({ params }) => {
	const { id } = await params;
	const user = await getUser(id);
	const currentUser = await getCurrentUser();

	if (!user) {
		return (
			<div className="flex flex-col items-center justify-center h-96">
				<h1 className="text-2xl font-bold mb-4">User Not Found</h1>
				<Button asChild>
					<Link href="/friends">Back to Friends</Link>
				</Button>
			</div>
		);
	}

	// Get messages for this conversation
	const messages = MOCK_MESSAGES[id] || [];

	return (
		<div className="flex flex-col h-screen">
			{/* Chat Header */}
			<div className="flex items-center gap-3 border-b p-4">
				<Button variant="ghost" size="icon" asChild className="mr-1">
					<Link href="/friends">
						<ArrowLeft />
					</Link>
				</Button>

				<div className="size-10 rounded-full bg-muted overflow-hidden">
					{user.avatar ? (
						<img
							src={user.avatar}
							alt={user.name}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-primary/10">
							<User size={20} />
						</div>
					)}
				</div>

				<div>
					<h2 className="font-medium text-lg">{user.name}</h2>
					<p className="text-xs text-muted-foreground">
						{user.online ? "Online" : "Last seen recently"}
					</p>
				</div>
			</div>

			{/* Chat Messages */}
			<div className="max-w-4xl mx-auto w-full flex-1 overflow-y-auto p-4 space-y-4">
				{messages.length > 0 ? (
					messages.map((message) => {
						const isCurrentUser = message.senderId === currentUser.id;

						return (
							<div
								key={message.id}
								className={cn(
									"flex",
									isCurrentUser ? "justify-end" : "justify-start"
								)}
							>
								<div
									className={cn(
										"max-w-[80%] rounded-lg p-3",
										isCurrentUser
											? "bg-primary text-primary-foreground rounded-br-none"
											: "bg-muted rounded-bl-none"
									)}
								>
									<p>{message.text}</p>
									<p
										className={cn(
											"text-xs mt-1",
											isCurrentUser
												? "text-primary-foreground/70"
												: "text-muted-foreground"
										)}
									>
										{formatMessageTime(message.timestamp)}
									</p>
								</div>
							</div>
						);
					})
				) : (
					<div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
						<p>No messages yet</p>
						<p className="text-sm">Start the conversation with {user.name}</p>
					</div>
				)}
			</div>

			{/* Message Input */}
			<div className="border-t p-4">
				<form className="flex items-center gap-2 w-full max-w-4xl mx-auto">
					<Input placeholder={`Message ${user.name}...`} className="flex-1" />
					<Button type="submit" size="icon">
						<Send size={18} />
					</Button>
				</form>
			</div>
		</div>
	);
};

export default MessagePage;
