import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ACTIVITIES, cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Clock } from "lucide-react";
import { Calendar } from "lucide-react";

const ActivitiesPage = () => {
	return (
		<div className="p-5">
			<div className="w-full flex flex-col gap-5 mb-5">
				<div className="flex w-full items-center justify-between">
					<h1>Discover Activities</h1>
					<Button>Create Activity</Button>
				</div>
				<div className="flex w-full items-center gap-2.5">
					<Input placeholder="Search Activities..." />
					<Select>
						<SelectTrigger className={"min-w-[200px]"}>
							<SelectValue placeholder="All Types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="academics">Academics</SelectItem>
							<SelectItem value="hobby">Hobby</SelectItem>
							<SelectItem value="wellness">Wellness</SelectItem>
							<SelectItem value="social">Social</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid grid-cos-1 md:grid-cols-2 gap-5">
				{ACTIVITIES.map((activity, idx) => (
					<div
						className={cn(
							"gap-2.5 flex flex-col justify-between items-stretch border w-full p-5 rounded-lg",
							activity.compatibility < 50
								? "border-red-400"
								: activity.compatibility < 75
								? "border-yellow-400"
								: "border-green-400"
						)}
						key={idx}
					>
						<div>
							<div className="text-xs text-muted-foreground">
								{activity.compatibility}% match
							</div>
							<h3 className="flex-[0.8]">{activity.title}</h3>
							<p className="text-muted-foreground">{activity.description}</p>
						</div>
						<div className="w-full flex flex-col gap-2.5">
							<div className="flex items-center gap-2">
								<Calendar size={20} />
								{activity.date} at {activity.time}
							</div>
							<div className="flex items-center gap-2">
								<Clock size={20} />
								{activity.duration_m} minutes
							</div>
							<div className="flex items-center gap-2">
								<User size={20} />
								{activity.participants} participants
							</div>
						</div>
						<div className="flex w-full">
							<Button className="flex-1" variant={"link"}>
								View Details
							</Button>
							<Button className="flex-1 ml-2">Join Activity</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActivitiesPage;
