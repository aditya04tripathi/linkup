import { Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";

export const ActivityDetail = ({ activity, formatDate }) => {
	if (!activity) {
		return null;
	}

	console.log(activity, "activity");

	return (
		<div className="mb-6">
			<div className="flex flex-col justify-between items-start mb-4">
				<h1 className="text-2xl font-bold text-foreground">{activity.title}</h1>
			</div>

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

			<p className="whitespace-pre-line text-foreground mb-6">
				{activity.description}
			</p>

			<div className="flex flex-col flex-wrap gap-2 mb-6">
				<h1>
					Participants ({activity.participants.length}/
					{activity.maxParticipants})
				</h1>
				<div className="flex gap-2">
					{Array.from({ length: activity.participants.length }).map((_, i) => (
						<Link href={`/user/${activity.participants[i]._id}`}>
							<div
								key={i}
								className="flex items-center justify-center bg-card size-10 rounded-full"
							>
								{activity.participants[i].name[0]}
							</div>
						</Link>
					))}
					{Array.from({
						length: Math.max(
							0,
							activity.maxParticipants - activity.participants.length
						),
					}).map((_, i) => (
						<div className="border border-dashed flex items-center justify-center bg-muted/30 size-10 rounded-full">
							+
						</div>
					))}
				</div>
			</div>

			<div className="bg-muted/50 p-4 rounded-md">
				<h3 className="font-medium mb-2 text-foreground">Location</h3>
				<p className="text-muted-foreground">{activity.locationType}</p>
			</div>
		</div>
	);
};

export default ActivityDetail;
