"use client";

import ActivityCard from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ActivityFilters from "@/components/ActivityFilters";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const ActivitiesPage = () => {
	const [activities, setActivities] = useState(null);

	const fetchActivities = async () => {
		const { data } = await axios.get("/api/activities");

		if (data.ok) {
			setActivities(data.message);
		}
	};
	useEffect(() => {
		fetchActivities();
	}, []);

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
			{activities?.length == 0 ? (
				<div className="flex flex-col items-center justify-center h-96">
					<h1 className="text-2xl font-bold mb-4">No Activities Found</h1>
					<p className="text-muted-foreground text-center">
						No activities found. Create one to get started!
					</p>
				</div>
			) : (
				<div className="grid grid-cos-1 md:grid-cols-2 gap-5">
					{activities?.map((activity, idx) => {
						return <ActivityCard key={idx} activity={activity} />;
					})}
				</div>
			)}
		</div>
	);
};

export default ActivitiesPage;
