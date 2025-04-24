import { Button } from "@/components/ui/button";
import ActivityCard from "@/components/ActivityCard";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/utils";

export default function IndexPage() {
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
					<Button asChild variant="outline">
						<Link href="/activities">View All</Link>
					</Button>
				</div>

				<div className="mt-5 grid grid-cos-1 md:grid-cols-2 gap-5">
					{ACTIVITIES.map((activity, idx) => (
						<ActivityCard key={idx} activity={activity} />
					))}
				</div>
			</div>
		</div>
	);
}
