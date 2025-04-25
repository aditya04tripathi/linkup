"use client";

import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/activity/ActivityCard";
import Link from "next/link";
import { Leaderboard } from "@/components/user/Leaderboard";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export const HomeClient = () => {
	const { user } = useAuth();
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const [activities, setActivities] = useState([]);

	const fetchActivities = async () => {
		try {
			const { data } = await axios.get("/api/activities?limit=2");
			if (data.ok) {
				setActivities(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error("Failed to fetch activities");
		}
	};

	const fetchUsers = async () => {
		try {
			const { data } = await axios.get("/api/users?limit=10");
			if (data.ok) {
				setUsers(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error("Failed to fetch users");
		}
	};

	useEffect(() => {
		fetchActivities();
		fetchUsers();
	}, []);

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	if (!user) {
		return null;
	}

	return (
		<div>
			<div className="w-full p-5 space-y-2 rounded-lg bg-primary text-primary-foreground">
				<h1>Welcome back, {user.username}.</h1>
				<p>
					You have {user.score} engagement points. Join activities to connect
					with others!
				</p>
			</div>

			<div className="mt-5">
				{activities.length > 0 ? (
					<>
						<div className="flex items-center justify-between">
							<h1>Recommended for You</h1>
							<Button asChild variant="outline">
								<Link href="/activities">View All</Link>
							</Button>
						</div>

						<div className="grid gap-5 mt-5 grid-cos-1 md:grid-cols-2">
							{activities.map((activity, idx) => (
								<ActivityCard key={idx} activity={activity} />
							))}
						</div>
					</>
				) : (
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-2xl font-bold mb-4">No Activities Found</h1>
						<p className="text-foreground text-center">
							No activities found.{" "}
							<Link
								className="text-muted-foreground underline"
								href="/activities/add"
							>
								Create one
							</Link>{" "}
							to get started!
						</p>
					</div>
				)}
			</div>

			<Separator className="my-7" />

			<Leaderboard users={users} />
		</div>
	);
};

export default HomeClient;
