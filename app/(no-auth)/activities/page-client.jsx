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
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const router = useRouter();

	const fetchActivities = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get("/api/activities");
			if (data.ok) {
				setActivities(data.message);
			} else {
				toast.error("Failed to load activities");
			}
		} catch (error) {
			console.error("Error loading activities:", error);
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
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

	if (loading) {
		return (
			<div className="space-y-4 w-full">
				<div className="flex justify-between">
					<div className="h-8 w-1/3 bg-muted rounded"></div>
					<div className="h-8 w-1/4 bg-muted rounded"></div>
				</div>
				<div className="h-12 w-full bg-muted rounded mb-6"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="h-48 bg-muted rounded animate-pulse"></div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="w-full flex flex-col gap-5 mb-5">
				<div className="flex w-full items-center justify-between">
					<h1>Discover Activities</h1>
					<Button asChild>
						<Link href="/activities/add">Create Activity</Link>
					</Button>
				</div>
				<ActivityFilters />
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
