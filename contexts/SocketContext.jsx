"use client";

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error("useSocket must be used within a SocketProvider");
	}
	return context;
};

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const { user, token } = useAuth();

	useEffect(() => {
		if (!user || !token) return;

		// Initialize socket connection
		const socketInstance = io(
			process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
			{
				auth: {
					token,
				},
			}
		);

		socketInstance.on("connect", () => {
			console.log("Socket connected");
		});

		socketInstance.on("connect_error", (err) => {
			console.error("Socket connection error:", err);
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, [user, token]);

	// Send a message
	const sendMessage = (messageData) => {
		if (!socket) return;

		socket.emit("message:send", messageData);
	};

	// Mark message as read
	const markAsRead = (messageId, conversationId) => {
		if (!socket) return;

		socket.emit("message:read", { messageId, conversationId });
	};

	// Send typing indicator
	const typingIndicator = (recipientId, isTyping) => {
		if (!socket) return;

		socket.emit("user:typing", { recipientId, isTyping });
	};

	// Subscribe to new messages
	const subscribeToMessages = (callback) => {
		if (!socket) return () => {};

		socket.on("message:new", callback);
		return () => socket.off("message:new", callback);
	};

	// Subscribe to typing indicators
	const subscribeToTyping = (callback) => {
		if (!socket) return () => {};

		socket.on("user:typing", callback);
		return () => socket.off("user:typing", callback);
	};

	// Subscribe to read receipts
	const subscribeToReadReceipts = (callback) => {
		if (!socket) return () => {};

		socket.on("message:read", callback);
		return () => socket.off("message:read", callback);
	};

	return (
		<SocketContext.Provider
			value={{
				socket,
				sendMessage,
				markAsRead,
				typingIndicator,
				subscribeToMessages,
				subscribeToTyping,
				subscribeToReadReceipts,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
