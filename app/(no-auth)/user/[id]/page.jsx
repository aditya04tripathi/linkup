"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
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
import { useParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

const UserProfilePage = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const match = 0.5;

	const fetchUser = async () => {
		const { data } = await axios.get(`/api/users/${id}`);

		if (data.ok) {
			setUser(data.message);
			setLoading(false);
			return;
		} else {
			setUser(null);
			setError(data.message);
			return;
		}
	};
	useEffect(() => {
		fetchUser();
	}, [id]);

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center h-96">
				<h1 className="mb-4 text-2xl font-bold">User Not Found</h1>
				<Button asChild>
					<Link href="/friends">Back to Friends</Link>
				</Button>
			</div>
		);
	}

	return loading ? (
		<div>loding...</div>
	) : (
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
				<div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
					<div className="overflow-hidden rounded-full size-24 md:size-32 bg-muted">
						{user.avatar ? (
							<img
								src={user.avatar}
								alt={user.name}
								className="object-cover w-full h-full"
							/>
						) : (
							<div className="flex items-center justify-center w-full h-full bg-primary/10">
								<User size={40} />
							</div>
						)}
					</div>

					<div className="flex-1">
						<div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
							<h1 className="text-2xl font-bold">{user.name}</h1>
							<div
								className={cn(
									"text-sm px-3 py-1 rounded-full",
									(match || 1) * 100 < 50
										? "bg-red-100 text-red-700"
										: (match || 1) * 100 < 75
										? "bg-yellow-100 text-yellow-700"
										: "bg-green-100 text-green-700"
								)}
							>
								{Math.round((match || 1) * 100)}% Match
							</div>
						</div>
						<p className="mt-2 text-muted-foreground">{user.bio}</p>
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
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{/* About */}
					<div className="col-span-2">
						<div className="p-6 border rounded-lg">
							<h2 className="mb-4 text-xl font-semibold">About</h2>
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
								<h3 className="mb-3 font-medium">Bio</h3>
								<p className="whitespace-pre-line text-muted-foreground">
									{user.bio || "No bio provided."}
								</p>
							</div>
						</div>
					</div>

					{/* Interests */}
					<div className="col-span-1">
						<div className="p-6 border rounded-lg">
							<h2 className="mb-4 text-xl font-semibold">Interests</h2>
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
