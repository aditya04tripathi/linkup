import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProfileCard = ({ profile, isFriend = false }) => {
	return (
		<div className="border rounded-lg p-4 flex flex-col items-center">
			<Avatar className="h-20 w-20 mb-3">
				<AvatarImage src={profile.avatar || ""} alt={profile.name} />
				<AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
			</Avatar>

			<h3 className="font-medium text-lg">{profile.name}</h3>
			<p className="text-sm text-muted-foreground mb-2">{profile.occupation}</p>
			<p className="text-sm text-center mb-4 line-clamp-2">{profile.bio}</p>

			<div className="mt-auto w-full flex gap-2">
				<Link href={`/user/${profile.username}`} className="flex-1">
					<Button variant="outline" className="w-full">
						View Profile
					</Button>
				</Link>
				{!isFriend ? (
					<Button className="flex-1">Add Friend</Button>
				) : (
					<Link href={`/message/${profile.username}`} className="flex-1">
						<Button className="w-full">Message</Button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default ProfileCard;
