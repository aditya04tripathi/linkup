import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserPlus } from "lucide-react";
import { User, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

const ProfileCard = ({ profile, isFriend }) => {
	const match = profile.match || profile.compatibility / 100;

	return (
		<div
			className={cn(
				"gap-2.5 flex flex-col justify-between items-stretch border w-full p-5 rounded-lg"
			)}
		>
			<div className="flex items-center gap-4">
				<div className="size-16 rounded-full bg-muted overflow-hidden">
					{profile.avatar ? (
						<img
							src={profile.avatar}
							alt={profile.name}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-primary/10">
							<User size={24} />
						</div>
					)}
				</div>
				<div>
					<div
						className={cn(
							"text-sm text-muted-foreground",
							profile.compatibility < 50
								? "text-red-400"
								: profile.compatibility < 75
								? "text-yellow-400"
								: "text-green-400"
						)}
					>
						{Math.round(match * 100)}% match
					</div>
					<h3 className="font-medium">{profile.name}</h3>
				</div>
			</div>

			<p className="text-muted-foreground">{profile.bio}</p>

			{profile.interests && profile.interests.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{profile.interests.map((interest, index) => (
						<span
							key={index}
							className="text-xs bg-muted px-2 py-1 rounded-full"
						>
							{interest}
						</span>
					))}
				</div>
			)}

			<div className="flex w-full mt-2">
				<Button asChild className="w-full flex-1" variant="link">
					<Link href={`/user/${profile.id || "1"}`}>
						<span className="flex items-center gap-1">
							<User size={16} />
							View Profile
						</span>
					</Link>
				</Button>
				{isFriend ? (
					<Link href={`/message/${profile.id || "1"}`}>
						<Button className="w-full flex-1">
							<span className="flex items-center gap-1">
								<MessageCircle size={16} />
								Message
							</span>
						</Button>
					</Link>
				) : (
					<Button className="w-full flex-1">
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

export default ProfileCard;
