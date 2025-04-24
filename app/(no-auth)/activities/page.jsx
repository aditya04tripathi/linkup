import ActivityCard from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { ACTIVITIES } from "@/lib/utils";
import Link from "next/link";
import ActivityFilters from "@/components/ActivityFilters";

const ActivitiesPage = () => {
	return (
		<div className="p-5">
			<div className="w-full flex flex-col gap-5 mb-5">
				<div className="flex w-full items-center justify-between">
					<h1>Discover Activities</h1>
					<Button asChild>
						<Link href="/activities/add">Create Activity</Link>
					</Button>
				</div>
				<ActivityFilters />
			</div>
			<div className="grid grid-cos-1 md:grid-cols-2 gap-5">
				{ACTIVITIES.map((activity, idx) => (
					<ActivityCard key={idx} activity={activity} />
				))}
			</div>
		</div>
	);
};

export default ActivitiesPage;
