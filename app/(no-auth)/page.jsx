"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { User } from "lucide-react";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function IndexPage() {
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
		},
	];

	return (
		<div className="p-5">
			<div className="bg-primary text-primary-foreground w-full p-5 rounded-lg space-y-2.5">
				<h1>Welcome back, John Doe.</h1>
				<p>
					You have 25 engagement points. Join activities to connect with others!
				</p>
			</div>

			<div className="mt-5">
				<div className="flex justify-between items-center">
					<h1>Recommended for You</h1>
					<Button
						onClick={() => router.push("/activities")}
						variant={"outline"}
					>
						View All
					</Button>
				</div>

				<div className="mt-5 grid grid-cos-1 md:grid-cols-2 gap-5">
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
		</div>
	);
}

export default IndexPage;
