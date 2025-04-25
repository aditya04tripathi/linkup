import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserPlus } from "lucide-react";
import { User } from "lucide-react";
import Link from "next/link";

export const ProfileCard = ({ profile, isFriend }) => {
	return (
		<div
			className={cn(
				"gap-2.5 flex flex-col justify-between items-stretch border w-full p-5 rounded-lg"
			)}
		>
			<div className="flex items-center gap-4">
				<div className="overflow-hidden rounded-full size-16 bg-muted">
					{profile.avatar ? (
						<img
							src={profile.avatar}
							alt={profile.name}
							className="object-cover w-full h-full"
						/>
					) : (
						<div className="flex items-center justify-center w-full h-full bg-primary/10">
							<User size={24} />
						</div>
					)}
				</div>
				<div>
					<h3 className="font-medium">{profile.name}</h3>
				</div>
			</div>

			<p className="text-muted-foreground">{profile.bio}</p>

			{profile.interests && profile.interests.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{profile.interests.map((interest, index) => (
						<span
							key={index}
							className="px-2 py-1 text-xs rounded-full bg-muted"
						>
							{interest}
						</span>
					))}
				</div>
			)}

			<div className="flex w-full mt-2">
				<Button asChild className="flex-1 w-full" variant="link">
					<Link href={`/user/${profile._id}`}>View Profile</Link>
				</Button>
				{!isFriend && (
					<Button className="flex-1 w-full">
						<span className="flex items-center gap-1">
							<UserPlus size={16} />
							Connect
						</span>
					</Button>
				)}
			</div>
		</div>
	);
};
