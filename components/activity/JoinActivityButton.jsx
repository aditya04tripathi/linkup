"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";

export const JoinActivityButton = ({ onClick, type, disabled }) => {
	const handleClick = () => {
		onClick();
		if (type === "join") {
			toast.success("You joined this activity! +5 points");
		}
	};

	if (type === "reflection") {
		return (
			<Button onClick={onClick} variant="default">
				<MessageSquare size={18} className="mr-1" />
				Add Reflection
			</Button>
		);
	}

	return (
		<Button onClick={handleClick} variant="default" disabled={disabled}>
			<Star size={18} className="mr-1" />
			Join Activity
		</Button>
	);
};
