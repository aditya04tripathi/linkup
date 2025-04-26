import { ProfileClient } from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export const metadata = {
	title: "Your Profile | LinkUp",
	description: "View and edit your LinkUp profile",
};

export default function ProfilePage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<ProfileClient />
		</Suspense>
	);
}
