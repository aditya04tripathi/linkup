"use client";

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
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Clock } from "lucide-react";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const ActivitiesPage = () => {
	const router = useRouter();
	const ACTIVITIES = [
		{
			title: "Study Group: Machine Learning Fundamentals",
			description:
				"Join us to study machine learning concepts and work through practice problems together.",
			date: "2023-10-15",
			time: "18:00",
			participants: "2/5",
			match: 0.4,
			duration_m: 60,
			type: "academics",
		},
		{
			title: "Book Club: The Great Gatsby",
			description:
				"Join us for a discussion on F. Scott Fitzgerald's classic novel.",
			date: "2023-10-20",
			time: "19:00",
			participants: "3/10",
			match: 0.6,
			duration_m: 90,
			type: "social",
		},
		{
			title: "Cooking Class: Italian Cuisine",
			description:
				"Learn to cook authentic Italian dishes with our expert chef.",
			date: "2023-10-25",
			time: "17:00",
			participants: "1/8",
			match: 0.7,
			duration_m: 120,
			type: "hobby",
		},
		{
			title: "Yoga Session: Relax and Unwind",
			description:
				"Join us for a relaxing yoga session to help you unwind after a long week.",
			date: "2023-10-30",
			time: "18:30",
			participants: "4/10",
			match: 0.9,
			duration_m: 45,
			type: "wellness",
		},
	];

	return (
		<div className="p-5">
			<div className="w-full flex flex-col gap-5 mb-5">
				<div className="flex w-full items-center justify-between">
					<h1>Discover Activities</h1>
					<Button onClick={() => router.push("/activities/add")}>
						Create Activity
					</Button>
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
							activity.match > 0.75
								? "border-green-400"
								: activity.match > 0.5
								? "border-amber-400"
								: "border-red-400"
						)}
						key={idx}
					>
						<div className="flex-1 w-full flex items-center justify-between">
							<h3 className="flex-[0.8]">{activity.title}</h3>
							<div className="flex-[0.2] bg-muted text-muted-foreground text-center py-1 px-2 rounded-full">
								{activity.match * 100}% match
							</div>
						</div>
						<p className="text-muted-foreground">{activity.description}</p>
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
