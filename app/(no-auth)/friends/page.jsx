import { FriendsClient } from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export const metadata = {
	title: "Friends | LinkUp",
	description: "View and manage your connections on LinkUp",
};

export default function FriendsPage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<FriendsClient />
		</Suspense>
	);
}
