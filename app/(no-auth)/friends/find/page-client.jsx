"use client";

import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/contexts";

const FindFriendsClient = () => {
	const { fetchAllUsers, users, loading, error } = useUser();
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);

	useEffect(() => {
		fetchAllUsers().catch((error) => {
			console.error("Error fetching users:", error);
		});
	}, []);

	useEffect(() => {
		if (users) {
			setFilteredUsers(
				users.filter(
					(user) =>
						user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
						user.username?.toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}
	}, [users, searchTerm]);

	return (
		<div className="w-full">
			<Link className="flex items-center gap-2 mb-5" href="/friends">
				<ChevronLeft className="mr-2" size={16} />
				Back to Friends
			</Link>
			<div className="w-full flex flex-col gap-5 mb-5">
				<h1>Find Friends</h1>

				<div className="relative w-full">
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
						size={18}
					/>
					<Input
						placeholder="Search for friends..."
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{loading ? (
				<div className="text-center py-10">Loading users...</div>
			) : error ? (
				<div className="text-center py-10 text-red-500">
					Error loading users: {error.message}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{filteredUsers.map((profile) => {
						const isFriend = users.some((user) => user._id === profile._id);

						return (
							<ProfileCard
								isFriend={isFriend}
								key={profile.id}
								profile={profile}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default FindFriendsClient;
