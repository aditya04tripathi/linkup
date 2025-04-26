"use client";

import React from "react";
import { ProfileCard } from "@/components/user/ProfileCard";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts";

export const FriendsClient = () => {
	const [users, setUsers] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);
	const { user } = useAuth();
	const { getFriendList } = useUser();
	const router = useRouter();

	React.useEffect(() => {
		getFriendList()
			.then((res) => {
				setUsers(res);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	React.useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	if (!user) {
		return null;
	}

	if (loading) {
		return (
			<div className="w-full animate-pulse">
				<div className="flex items-center justify-between mb-6">
					<div className="h-6 w-1/3 bg-muted rounded"></div>
					<div className="h-8 w-1/4 bg-muted rounded"></div>
				</div>
				<div className="h-10 w-full bg-muted rounded mb-8"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div key={i} className="h-64 bg-muted rounded"></div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full text-center py-10">
				<h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
				<p className="text-muted-foreground mb-4">{error}</p>
				<Button onClick={fetchUsers}>Try Again</Button>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="flex flex-col w-full gap-5 mb-5">
				<div className="flex items-center justify-center w-full">
					<h1 className="w-full">Your Friends</h1>
					<Link className="w-fit" href="/friends/find">
						<Button className="">
							<Plus />
							Add Friends
						</Button>
					</Link>
				</div>

				<div className="relative w-full">
					<Search
						className="absolute transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
						size={18}
					/>
					<Input placeholder="Search for your friends..." className="pl-10" />
				</div>
			</div>

			{users.length > 0 ? (
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					{users.map((profile) => (
						<ProfileCard isFriend={true} key={profile._id} profile={profile} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-96">
					<h1 className="text-2xl font-bold mb-4">No friends Found</h1>
					<p className="text-muted-foreground text-center">
						Either everyone is already your friend or you haven't added any
						friends yet. You can find and add friends by clicking the "Add
						Friends" button above.
					</p>
				</div>
			)}
		</div>
	);
};

export default FriendsClient;
