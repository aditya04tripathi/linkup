import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserAvatar = ({ user, className = "", showStatus = false }) => {
	const getInitials = (name) => {
		if (!name) return "?";
		return name.charAt(0).toUpperCase();
	};

	return (
		<div className="relative">
			<Avatar className={className || "h-8 w-8"}>
				<AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
				<AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
			</Avatar>

			{showStatus && user && (
				<span
					className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
						user.online ? "bg-green-500" : "bg-gray-400"
					}`}
				/>
			)}
		</div>
	);
};

export default UserAvatar;
