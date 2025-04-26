"use client";

import { ActivityCard } from "@/components/activity/ActivityCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ActivityFilters } from "@/components/activity/ActivityFilters";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ActivitiesClient = () => {
	const [activities, setActivities] = useState([]);
	const { user } = useAuth();
	const router = useRouter();

	const fetchActivities = async () => {
		try {
			const { data } = await axios.get("/api/activities");
			if (data.ok) {
				setActivities(data.message);
			} else {
				toast.error("Failed to load activities");
			}
		} catch (error) {
			console.error("Error loading activities:", error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		fetchActivities();
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
			<div className="w-full flex justify-between gap-5 mb-5">
				<h1>Discover Activities</h1>
				<Button asChild>
					<Link href="/activities/add">Create Activity</Link>
				</Button>
			</div>
			{activities?.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-96">
					<h1 className="text-2xl font-bold mb-4">No Activities Found</h1>
					<p className="text-muted-foreground text-center">
						No activities found. Create one to get started!
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{activities?.map((activity, idx) => {
						return <ActivityCard key={idx} activity={activity} />;
					})}
				</div>
			)}
		</div>
	);
};

export default ActivitiesClient;
