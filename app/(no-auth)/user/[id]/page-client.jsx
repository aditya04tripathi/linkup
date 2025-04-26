"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export function UserProfileClient({ id }) {
	const { user: currentUser } = useAuth();
	const {
		fetchUserById,
		followUser,
		unfollowUser,
		getUserIceBreaker,
		calculateCompatibilityScore,
	} = useUser();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [compatibility, setCompatibility] = useState(null);
	const [compatibilityLoading, setCompatibilityLoading] = useState(true);
	const [isFollowing, setIsFollowing] = useState(false);
	const [actionLoading, setActionLoading] = useState(false);
	const [iceBreaker, setIceBreaker] = useState(null);

	useEffect(() => {
		const loadUser = async () => {
			try {
				setLoading(true);
				const userData = await fetchUserById(id);
				console.log(userData);
				setUser(userData);

				setIsFollowing(
					currentUser?.friends?.some((followId) => followId == userData._id)
				);

				if (userData && currentUser) {
					setCompatibilityLoading(true);
					try {
						const score = await calculateCompatibilityScore(
							userData,
							currentUser
						);
						setCompatibility(score);
					} catch (error) {
						console.error("Error calculating compatibility:", error);
						setCompatibility(null);
					} finally {
						setCompatibilityLoading(false);
					}
				}
			} catch (error) {
				console.error("Error fetching user:", error);
				toast.error("Failed to load user profile");
			} finally {
				setLoading(false);
			}
		};

		if (id && currentUser) {
			loadUser();
		}
	}, [id]);

	const fetchIceBreaker = async () => {
		if (!currentUser) {
			toast.error("Please login to generate icebreakers");
			return;
		}

		if (!user) {
			toast.error("User not found");
			return;
		}

		console.log(user, currentUser, "user and currentUser");
		const response = await getUserIceBreaker(currentUser._id);
		setIceBreaker(response);
	};

	const handleFollowToggle = async () => {
		if (!currentUser) {
			toast.error("Please login to follow users");
			return;
		}

		try {
			setActionLoading(true);
			if (isFollowing) {
				await unfollowUser(user._id);
				toast.success(`Unfollowed ${user.username}`);
			} else {
				await followUser(user._id);
				toast.success(`Now following ${user.username}`);
			}
			setIsFollowing(!isFollowing);
		} catch (error) {
			toast.error(error.message || "Action failed");
		} finally {
			setActionLoading(false);
		}
	};

	if (loading) {
		return <div className="p-6 text-center">Loading user profile...</div>;
	}

	if (!user) {
		return <div className="p-6 text-center">User not found</div>;
	}

	return (
		<div className="container max-w-4xl mx-auto p-6">
			<div className="flex flex-col md:flex-row gap-6 mb-8">
				<div className="flex flex-col items-center">
					<Avatar className="h-32 w-32 mb-4">
						<AvatarImage src={user.avatar || ""} alt={user.name} />
						<AvatarFallback className="text-2xl">
							{user.username?.charAt(0) || "U"}
						</AvatarFallback>
					</Avatar>

					<div className="flex gap-2">
						{isFollowing ? (
							<Button
								variant="outline"
								onClick={handleFollowToggle}
								disabled={actionLoading}
							>
								Unfollow
							</Button>
						) : (
							<Button onClick={handleFollowToggle} disabled={actionLoading}>
								Follow
							</Button>
						)}
					</div>
				</div>

				<div className="flex-1">
					<h1 className="text-2xl flex justify-between items-center font-bold mb-1">
						<div>{user.name || user.username}</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button onClick={fetchIceBreaker}>Generate Ice Breaker</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										Greetings {currentUser.username}! Here is your icebreaker
									</DialogTitle>
								</DialogHeader>
								<p>{iceBreaker ?? <Loader2 className="animate-spin" />}</p>
							</DialogContent>
						</Dialog>
					</h1>
					<p className="text-muted-foreground mb-3">
						{user.occupation || "Member"}
					</p>

					<div className="mb-4">
						<h2 className="font-semibold mb-1">Bio</h2>
						<p>{user.bio || "No bio available"}</p>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<h3 className="font-medium text-sm text-muted-foreground">
								Location
							</h3>
							<p>{user.location || "Not specified"}</p>
						</div>
						<div>
							<h3 className="font-medium text-sm text-muted-foreground">
								Compatibility
							</h3>
							<p>
								{compatibilityLoading ? (
									<span className="inline-flex items-center">
										Calculating{" "}
										<Loader2 className="ml-2 h-3 w-3 animate-spin" />
									</span>
								) : compatibility !== null ? (
									`${Math.round(compatibility)}%`
								) : (
									"Not available"
								)}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-5">
				<div className="flex flex-col">
					<div className="flex items-center flex-wrap gap-2">
						{(user.interests || []).length > 0 ? (
							user.interests.map((interest) => (
								<div
									key={interest}
									className="bg-muted px-3 py-1 rounded-full text-sm"
								>
									{interest}
								</div>
							))
						) : (
							<p>No interests specified</p>
						)}
					</div>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center flex-wrap gap-2">
						{(user.academicInterests || []).length > 0 ? (
							user.academicInterests.map((interest) => (
								<div
									key={interest}
									className="bg-muted px-3 py-1 rounded-full text-sm"
								>
									{interest}
								</div>
							))
						) : (
							<p>No academic interests specified</p>
						)}
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<div>
					<h3 className="font-medium mb-2">Extroversion Level</h3>
					<div className="w-full bg-muted rounded-full h-2">
						<div
							className="bg-primary h-2 rounded-full"
							style={{
								width: `${
									user.extroversionLevel
										? (user.extroversionLevel / 10) * 100
										: 50
								}%`,
							}}
						/>
					</div>
					<div className="flex justify-between text-xs text-muted-foreground mt-1">
						<span>Introvert</span>
						<span>Extrovert</span>
					</div>
				</div>

				<div>
					<h3 className="font-medium mb-2">Energy Level</h3>
					<div className="w-full bg-muted rounded-full h-2">
						<div
							className="bg-primary h-2 rounded-full"
							style={{
								width: `${
									user.energyLevel ? (user.energyLevel / 10) * 100 : 50
								}%`,
							}}
						/>
					</div>
					<div className="flex justify-between text-xs text-muted-foreground mt-1">
						<span>Low</span>
						<span>High</span>
					</div>
				</div>
			</div>
		</div>
	);
}
