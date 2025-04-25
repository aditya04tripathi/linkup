"use client";

import { useEffect, useState } from "react";
import { redirect, notFound } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatInterface } from "@/components/message/ChatInterface";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { toast } from "sonner";

export default function MessagePageClient({ id }) {
	const { user: currentUser, token } = useAuth();
	const { fetchUserById } = useUser();
	const [recipient, setRecipient] = useState(null);
	const [conversation, setConversation] = useState({ messages: [] });
	const [loading, setLoading] = useState(true);

	// Get conversation history from API
	const getConversation = async (userId, currentUserId) => {
		try {
			const { data } = await axios.get(
				`/api/conversations/direct?userId=${userId}&currentUserId=${currentUserId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (data.ok) {
				return data.message;
			}
			return { messages: [] };
		} catch (error) {
			console.error("Error fetching conversation:", error);
			toast.error("Failed to load conversation history");
			return { messages: [] };
		}
	};

	useEffect(() => {
		const loadData = async () => {
			if (!currentUser) {
				redirect("/login");
				return;
			}

			try {
				setLoading(true);
				const [userData, conversationData] = await Promise.all([
					fetchUserById(id),
					getConversation(id, currentUser._id),
				]);

				setRecipient(userData);
				setConversation(conversationData);
			} catch (error) {
				console.error("Error loading message page:", error);
				toast.error("Failed to load user data");
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [id, currentUser, fetchUserById]);

	// Redirect if not authenticated
	if (!currentUser) {
		return null; // Will redirect in the useEffect
	}

	// Show loading state
	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8 h-screen flex items-center justify-center">
				<p>Loading conversation...</p>
			</div>
		);
	}

	// Show 404 if user not found
	if (!recipient) {
		return notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8 h-screen flex flex-col">
			{/* Chat Header */}
			<div className="flex items-center p-4 border-b">
				<div className="relative">
					<Avatar className="h-10 w-10">
						<AvatarImage
							src={recipient.avatar || ""}
							alt={recipient.username}
						/>
						<AvatarFallback>
							{recipient.username?.charAt(0) || "U"}
						</AvatarFallback>
					</Avatar>
					<span
						className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
							recipient.online ? "bg-green-500" : "bg-gray-400"
						}`}
					/>
				</div>

				<div className="ml-3">
					<h2 className="font-medium text-lg">
						{recipient.name || recipient.username}
					</h2>
					<p className="text-xs text-muted-foreground">
						{recipient.online ? "Online" : "Last seen recently"}
					</p>
				</div>
			</div>

			{/* Client Component for Chat Interface */}
			<ChatInterface
				currentUser={currentUser}
				recipient={recipient}
				initialMessages={conversation.messages || []}
			/>
		</div>
	);
}
