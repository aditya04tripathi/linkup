"use client";

import { cn, formatDate } from "@/lib/utils";
import { ActivityDetail } from "@/components/activity/ActivityDetail";
import { ActivityActions } from "@/components/activity/ActivityActions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useActivity } from "@/contexts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ActivityDetailClient = ({ id }) => {
	const [activity, setActivity] = useState(null);
	const router = useRouter();
	const { user } = useAuth();
	const { fetchActivity, loading, hasUserJoined } = useActivity();

	useEffect(() => {
		console.log(id);
		if (id) {
			fetchActivity(id)
				.then((data) => {
					console.log(data, "fetch activity with id");
					setActivity(data);
				})
				.catch((error) => {
					console.error("Error fetching activity:", error);
				});
		}

		() => {
			setActivity(null);
		};
	}, [id]);

	if (loading) {
		return (
			<div className="animate-pulse w-full">
				<div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
				<div className="h-4 w-1/2 bg-muted rounded mb-2"></div>
				<div className="h-32 w-full bg-muted rounded mb-4"></div>
				<div className="h-8 w-40 bg-muted rounded float-right"></div>
			</div>
		);
	}

	if (!activity) {
		return (
			<div className="w-full text-center py-10">
				<h2 className="text-xl font-semibold mb-2">Activity not found</h2>
				<p className="mb-4">The activity you're looking for doesn't exist</p>
				<Button onClick={() => router.push("/activities")}>
					View All Activities
				</Button>
			</div>
		);
	}

	return (
		<div className={"w-full"}>
			<div className={cn("rounded-lg overflow-hidden")}>
				<div className="p-6">
					<ActivityDetail activity={activity} formatDate={formatDate} />
					<div className="flex flex-col sm:flex-row justify-end gap-4">
						<Button onClick={() => router.back()} variant="outline">
							Back to Activities
						</Button>
						<ActivityActions
							activity={activity}
							user={user}
							isPastEvent={
								new Date(activity.dateTime ?? Date.now()) < new Date()
							}
							hasJoined={hasUserJoined(activity)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityDetailClient;
