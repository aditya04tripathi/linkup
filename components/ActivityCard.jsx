"use client";

import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

const ActivityCard = ({ activity }) => {
	const match = activity.match || activity.compatibility / 100;

	return (
		<div
			className={cn(
				"gap-2.5 flex flex-col justify-between items-stretch border w-full p-5 rounded-lg"
			)}
		>
			<div>
				<div
					className={cn(
						"text-sm text-muted-foreground",
						activity.compatibility < 50
							? "text-red-400"
							: activity.compatibility < 75
							? "text-yellow-400"
							: "text-green-400"
					)}
				>
					{Math.round(match * 100)}% match
				</div>
				<h3 className="flex-[0.8]">{activity.title}</h3>
			</div>
			<p className="text-muted-foreground">{activity.description}</p>
			<div className="text-sm w-full flex flex-col gap-2.5">
				<div className="flex items-center gap-2">
					<Calendar size={20} />
					{formatDate(activity.dateTime)}
				</div>
				<div className="flex items-center gap-2">
					<Clock size={20} />
					{activity.duration} minutes
				</div>
				<div className="flex items-center gap-2">
					<User size={20} />
					{activity.participants.length}/{activity.maxParticipants} participants
				</div>
			</div>
			<div className="flex w-full">
				<Button asChild className="flex items-end" variant="link">
					<Link className="ml-auto" href={`/activities/${activity._id}`}>
						View Details
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default ActivityCard;
