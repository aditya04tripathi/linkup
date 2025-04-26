import ActivityDetailClient from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export const metadata = {
	title: "Activity Details | LinkUp",
	description:
		"View details about this activity and join to connect with others",
};

export default async function ActivityDetailPage({ params }) {
	const { id } = await params;

	return (
		<Suspense fallback={<LoadingScreen />}>
			<ActivityDetailClient id={id} />
		</Suspense>
	);
}
