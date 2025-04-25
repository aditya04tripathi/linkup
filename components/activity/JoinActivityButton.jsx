"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const JoinActivityButton = ({ onClick, type, disabled }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);
		try {
			await onClick();
			if (type === "join") {
				toast.success("You joined this activity! +5 points");
			}
		} catch (error) {
			console.error("Error processing activity action:", error);
			toast.error("Failed to process your request");
		} finally {
			setIsLoading(false);
		}
	};

	if (type === "reflection") {
		return (
			<Button
				onClick={handleClick}
				variant="default"
				disabled={disabled || isLoading}
			>
				{isLoading ? (
					<Loader2 size={18} className="mr-1 animate-spin" />
				) : (
					<MessageSquare size={18} className="mr-1" />
				)}
				{isLoading ? "Processing..." : "Add Reflection"}
			</Button>
		);
	}

	return (
		<Button
			onClick={handleClick}
			variant="default"
			disabled={disabled || isLoading}
		>
			{isLoading ? (
				<Loader2 size={18} className="mr-1 animate-spin" />
			) : (
				<Star size={18} className="mr-1" />
			)}
			{isLoading ? "Joining..." : "Join Activity"}
		</Button>
	);
};
