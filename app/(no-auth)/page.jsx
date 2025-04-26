import { HomeClient } from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export const metadata = {
	title: "Home | LinkUp",
	description: "Connect with others and discover activities",
};

export default function HomePage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<HomeClient />
		</Suspense>
	);
}
