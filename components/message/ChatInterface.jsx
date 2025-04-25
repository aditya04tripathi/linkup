"use client";

import { useState, useRef, useEffect } from "react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSocket } from "@/contexts/SocketContext";

export const ChatInterface = ({
	currentUser,
	recipient,
	initialMessages = [],
}) => {
	const [messages, setMessages] = useState(initialMessages);
	const [newMessage, setNewMessage] = useState("");
	const [typingStatus, setTypingStatus] = useState(false);
	const messagesEndRef = useRef(null);

	const {
		socket,
		sendMessage,
		typingIndicator,
		subscribeToMessages,
		subscribeToTyping,
	} = useSocket();

	// Scroll to bottom when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Subscribe to new messages and typing indicators
	useEffect(() => {
		if (!socket) return;

		const unsubMessages = subscribeToMessages((message) => {
			if (
				(message.senderId === recipient.id &&
					message.recipientId === currentUser.id) ||
				(message.senderId === currentUser.id &&
					message.recipientId === recipient.id)
			) {
				setMessages((prevMessages) => [...prevMessages, message]);
			}
		});

		const unsubTyping = subscribeToTyping(({ userId, isTyping }) => {
			if (userId === recipient.id) {
				setTypingStatus(isTyping);
			}
		});

		return () => {
			unsubMessages();
			unsubTyping();
		};
	}, [socket, recipient.id, currentUser.id]);

	// Handle message submission
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!newMessage.trim()) return;

		sendMessage({
			recipientId: recipient.id,
			content: newMessage.trim(),
		});

		setNewMessage("");
	};

	// Handle typing indicator
	const handleTyping = (e) => {
		setNewMessage(e.target.value);

		if (e.target.value.length > 0) {
			typingIndicator(recipient.id, true);
		} else {
			typingIndicator(recipient.id, false);
		}
	};

	// Format message timestamp
	const formatMessageTime = (date) => {
		if (!date) return "";

		const messageDate = new Date(date);
		return messageDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<>
			{/* Chat Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
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
									<p>{message.content || message.text}</p>
									<p
										className={cn(
											"text-xs mt-1",
											isCurrentUser
												? "text-primary-foreground/70"
												: "text-muted-foreground"
										)}
									>
										{formatMessageTime(message.timestamp || message.createdAt)}
									</p>
								</div>
							</div>
						);
					})
				) : (
					<div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
						<p>No messages yet</p>
						<p className="text-sm">
							Start the conversation with {recipient.name}
						</p>
					</div>
				)}

				{typingStatus && (
					<div className="flex justify-start">
						<div className="bg-muted rounded-lg p-2 px-3 text-sm text-muted-foreground">
							Typing...
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Message Input */}
			<form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
				<Textarea
					value={newMessage}
					onChange={handleTyping}
					placeholder={`Message ${recipient.name}...`}
					className="flex-1 min-h-[60px] max-h-[150px]"
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSubmit(e);
						}
					}}
				/>
				<Button type="submit" className="self-end">
					<SendIcon size={18} />
				</Button>
			</form>
		</>
	);
};
