"use client";

import { Button } from "@/components/ui/button";
import ActivityCard from "@/components/ActivityCard";
import Link from "next/link";
import { ACTIVITIES, MOCK_USERS } from "@/lib/utils";
import Leaderboard from "@/components/Leaderboard";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function IndexPage() {
	const { user } = useAuth();
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const [activities, setActivities] = useState([]);

	const fetchActivities = async () => {
		const { data } = await axios.get("/api/activities?limit=2");

		if (data.ok) {
			setActivities(data.message);
		} else {
			toast.error(data.message);
		}
	};

	const fetchUsers = async () => {
		const { data } = await axios.get("/api/users?limit=10");

		if (data.ok) {
			setUsers(data.message);
		} else {
			toast.error(data.message);
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
				<h1>Welcome back, {user.name}.</h1>
				<p>
					You have {user.score} engagement points. Join activities to connect
					with others!
				</p>
			</div>

			<div className="mt-5">
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
			</div>

			<Separator className="my-7" />

			<Leaderboard users={users} />
		</div>
	);
}
