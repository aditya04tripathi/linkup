import { ActivitiesClient } from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export const metadata = {
	title: "Activities | LinkUp",
	description: "Discover and join activities to connect with others",
};

export default function ActivitiesPage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<ActivitiesClient />
		</Suspense>
	);
}
