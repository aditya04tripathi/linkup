import { ACTIVITIES, cn, formatDate } from "@/lib/utils";
import ActivityDetail from "@/components/ActivityDetail";
import ActivityActions from "@/components/ActivityActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getActivity(id) {
	return ACTIVITIES.find((activity) => activity.id === id) || null;
}

async function getCurrentUser() {
	return {
		id: "currentUser123",
		name: "Current User",
	};
}

const ActivityPage = async ({ params }) => {
	const { id } = await params;
	const activity = await getActivity(id);
	const currentUser = await getCurrentUser();

	const isPastEvent = new Date(activity.dateTime) < new Date();
	const hasJoined = activity.participants.includes(currentUser.id);

	return (
		<div className={"max-w-3xl mx-auto p-5"}>
			<div className={cn("rounded-lg shadow-md overflow-hidden border")}>
				<div className="p-6">
					<ActivityDetail activity={activity} formatDate={formatDate} />

					<div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-border">
						<Button variant="outline" asChild>
							<Link href="/activities">Back to Activities</Link>
						</Button>

						<ActivityActions
							activity={activity}
							currentUser={currentUser}
							isPastEvent={isPastEvent}
							hasJoined={hasJoined}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityPage;
