import { UserProfileClient } from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export const metadata = {
	title: "User Profile | LinkUp",
	description: "View user profile and connect with peers",
};

export default async function UserProfilePage({ params }) {
	const { id } = await params;
	return (
		<Suspense fallback={<LoadingScreen />}>
			<UserProfileClient id={id} />
		</Suspense>
	);
}
