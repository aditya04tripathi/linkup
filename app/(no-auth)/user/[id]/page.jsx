import { Button } from "@/components/ui/button";
import { cn, MOCK_USERS } from "@/lib/utils";
import {
	ArrowLeft,
	MessageCircle,
	User,
	UserPlus,
	MapPin,
	Calendar,
	Briefcase,
	Heart,
} from "lucide-react";
import Link from "next/link";

async function getUser(id) {
	return MOCK_USERS.find((user) => user.id === id) || null;
}

async function getCurrentUser() {
	return {
		id: "currentUser123",
		name: "Current User",
	};
}

const UserProfilePage = async ({ params }) => {
	const { id } = await params;
	const user = await getUser(id);

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

	const match = user.match || user.compatibility / 100;

	return (
		<div className="w-full">
			<div className="mb-6">
				<Button variant="ghost" className="pl-0" asChild>
					<Link href="/friends">
						<ArrowLeft className="mr-2" size={16} />
						Back to Friends
					</Link>
				</Button>
			</div>

			<div className="flex flex-col gap-6">
				{/* Profile Header */}
				<div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
					<div className="size-24 md:size-32 rounded-full bg-muted overflow-hidden">
						{user.avatar ? (
							<img
								src={user.avatar}
								alt={user.name}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center bg-primary/10">
								<User size={40} />
							</div>
						)}
					</div>

					<div className="flex-1">
						<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
							<h1 className="text-2xl font-bold">{user.name}</h1>
							<div
								className={cn(
									"text-sm px-3 py-1 rounded-full",
									match * 100 < 50
										? "bg-red-100 text-red-700"
										: match * 100 < 75
										? "bg-yellow-100 text-yellow-700"
										: "bg-green-100 text-green-700"
								)}
							>
								{Math.round(match * 100)}% Match
							</div>
						</div>
						<p className="text-muted-foreground mt-2">{user.bio}</p>
					</div>

					<div className="flex gap-2 mt-4 md:mt-0">
						<Button>
							<UserPlus size={16} className="mr-2" />
							Connect
						</Button>
						<Link href={`/message/${id}`}>
							<Button variant="outline">
								<MessageCircle size={16} className="mr-2" />
								Message
							</Button>
						</Link>
					</div>
				</div>

				{/* Profile Details */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* About */}
					<div className="col-span-2">
						<div className="border rounded-lg p-6">
							<h2 className="text-xl font-semibold mb-4">About</h2>
							<div className="space-y-4">
								{user.location && (
									<div className="flex items-center gap-2">
										<MapPin size={18} className="text-muted-foreground" />
										<span>{user.location}</span>
									</div>
								)}
								{user.joinedDate && (
									<div className="flex items-center gap-2">
										<Calendar size={18} className="text-muted-foreground" />
										<span>
											Joined {new Date(user.joinedDate).toLocaleDateString()}
										</span>
									</div>
								)}
								{user.occupation && (
									<div className="flex items-center gap-2">
										<Briefcase size={18} className="text-muted-foreground" />
										<span>{user.occupation}</span>
									</div>
								)}
							</div>

							<div className="mt-6">
								<h3 className="font-medium mb-3">Bio</h3>
								<p className="text-muted-foreground whitespace-pre-line">
									{user.bio || "No bio provided."}
								</p>
							</div>
						</div>
					</div>

					{/* Interests */}
					<div className="col-span-1">
						<div className="border rounded-lg p-6">
							<h2 className="text-xl font-semibold mb-4">Interests</h2>
							{user.interests && user.interests.length > 0 ? (
								<div className="flex flex-wrap gap-2">
									{user.interests.map((interest, idx) => (
										<div
											key={idx}
											className="bg-muted px-3 py-1.5 rounded-full text-sm flex items-center gap-1"
										>
											<Heart size={14} className="text-primary" />
											{interest}
										</div>
									))}
								</div>
							) : (
								<p className="text-muted-foreground">No interests listed.</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfilePage;
