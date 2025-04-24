import React from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ActivityDetailClient from "@/components/ActivityDetailClient";
import { ACTIVITIES, cn, formatDate } from "@/lib/utils";

// Mock function to fetch activity data (replace with your actual data fetching)
async function getActivity(id) {
	// In a real app, this would fetch from your API or database
	return ACTIVITIES.find((activity) => activity.id === id) || null;
}

// Mock function to get current user (replace with your actual auth logic)
async function getCurrentUser() {
	return {
		id: "currentUser123",
		name: "Current User",
	};
}

const ActivityPage = async ({ params }) => {
	const { id } = params;
	const activity = await getActivity(id);
	const currentUser = await getCurrentUser();

	const isPastEvent = new Date(activity.dateTime) < new Date();
	const hasJoined = activity.participants.includes(currentUser.id);

	const getActivityTypeStyles = (type) => {
		switch (type) {
			case "academic":
				return { bgClass: "bg-blue-100", textClass: "text-blue-700" };
			case "hobby":
				return { bgClass: "bg-green-100", textClass: "text-green-700" };
			case "wellness":
				return { bgClass: "bg-purple-100", textClass: "text-purple-700" };
			default:
				return { bgClass: "bg-amber-100", textClass: "text-amber-700" };
		}
	};

	const typeStyles = getActivityTypeStyles(activity.activityType);

	return (
		<div className={"max-w-3xl mx-auto p-5"}>
			<div
				className={cn(
					"bg-card rounded-lg shadow-md overflow-hidden border",
					activity.compatibility < 50
						? "border-red-400"
						: activity.compatibility < 75
						? "border-yellow-400"
						: "border-green-400"
				)}
			>
				<div className="p-6">
					<div className="flex justify-between items-start mb-4">
						<h1 className="text-2xl font-bold text-foreground">
							{activity.title}
						</h1>
						{activity.compatibility && (
							<span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
								{activity.compatibility}% Match
							</span>
						)}
					</div>

					<div className="mb-6">
						<div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Calendar size={20} />
								<span>{formatDate(activity.dateTime)}</span>
							</div>

							<div className="hidden md:block w-1 h-1 bg-muted rounded-full"></div>

							<div className="flex items-center gap-2 text-muted-foreground">
								<Clock size={20} />
								<span>{activity.duration} minutes</span>
							</div>

							<div className="hidden md:block w-1 h-1 bg-muted rounded-full"></div>

							<div className="flex items-center gap-2 text-muted-foreground">
								<Users size={20} />
								<span>
									{activity.participants.length} / {activity.maxParticipants}{" "}
									participants
								</span>
							</div>
						</div>

						<div
							className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${typeStyles.bgClass} ${typeStyles.textClass}`}
						>
							{activity.activityType.charAt(0).toUpperCase() +
								activity.activityType.slice(1)}
						</div>

						<p className="whitespace-pre-line text-foreground mb-6">
							{activity.description}
						</p>

						<div className="bg-muted/50 p-4 rounded-md mb-6">
							<h3 className="font-medium mb-2 text-foreground">Location</h3>
							<p className="text-muted-foreground">{activity.locationType}</p>
						</div>

						{/* Client components for interactive elements */}
						<ActivityDetailClient
							activity={activity}
							currentUser={currentUser}
							isPastEvent={isPastEvent}
							hasJoined={hasJoined}
						/>
					</div>

					<div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-border">
						<Button variant="outline" asChild>
							<Link href="/activities">Back to Activities</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityPage;
