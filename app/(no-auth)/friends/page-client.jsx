"use client";

import React from "react";
import { ProfileCard } from "@/components/user/ProfileCard";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts";

export const FriendsClient = () => {
	const [users, setUsers] = React.useState([]);
	const [error, setError] = React.useState(null);
	const { user } = useAuth();
	const { getFriendList } = useUser();
	const router = useRouter();

	console.log("Component rendered, user:", user);

	React.useEffect(() => {
		console.log("Starting to fetch friend list");
		getFriendList()
			.then((res) => {
				console.log("Friend list fetched successfully:", res);
				setUsers(res);
			})
			.catch((err) => {
				console.error("Error fetching friend list:", err);
				setError(err.message);
			});
	}, []);

	React.useEffect(() => {
		console.log("User authentication check:", user);
		if (!user) {
			console.log("No user found, redirecting to login");
			router.push("/login");
		}
	}, [user]);

	if (!user) {
		console.log("Rendering null - no user");
		return null;
	}

	if (error) {
		console.log("Rendering error state:", error);
		return (
			<div className="w-full text-center py-10">
				<h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
				<p className="text-muted-foreground mb-4">{error}</p>
				<Button
					onClick={() => {
						console.log("Retry button clicked");
						getFriendList()
							.then((res) => {
								console.log("Friend list re-fetched successfully:", res);
								setUsers(res);
								setError(null);
							})
							.catch((err) => {
								console.error("Error re-fetching friend list:", err);
								setError(err.message);
							});
					}}
				>
					Try Again
				</Button>
			</div>
		);
	}

	console.log("Rendering friend list, count:", users.length);

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
					{users.map((profile) => {
						console.log(
							"Rendering profile:",
							profile._id,
							profile.name || profile.email
						);
						return (
							<ProfileCard
								isFriend={true}
								key={profile._id}
								profile={profile}
							/>
						);
					})}
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
