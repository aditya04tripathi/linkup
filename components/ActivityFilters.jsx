"use client";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const ActivityFilters = () => {
	const [search, setSearch] = useState("");
	const [activityType, setActivityType] = useState("");

	return (
		<div className="flex w-full items-center gap-2.5">
			<Input
				placeholder="Search Activities..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Select value={activityType} onValueChange={setActivityType}>
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
	);
};

export default ActivityFilters;
