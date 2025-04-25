"use client";

import { ACTIVITIES, cn, formatDate } from "@/lib/utils";
import ActivityDetail from "@/components/ActivityDetail";
import ActivityActions from "@/components/ActivityActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const ActivityPage = () => {
	const { id } = useParams();
	const [activity, setActivity] = useState(null);
	const router = useRouter();
	const { user } = useAuth();

	const fetchActivity = async (id) => {
		const { data } = await axios.get(`/api/activities/${id}`);
		if (data.ok) {
			setActivity(data.message);
		} else {
			throw new Error("Failed to fetch activity");
		}
	};
	useEffect(() => {
		fetchActivity(id);
		console.log(activity);
	}, []);

	return !activity ? null : (
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
							hasJoined={activity.participants.includes(user._id)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityPage;
