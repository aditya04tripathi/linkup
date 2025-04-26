import FindFriendsClient from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export default function FindFriends() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<FindFriendsClient />
		</Suspense>
	);
}
