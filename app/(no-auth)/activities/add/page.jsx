import AddActivityClient from "./page-client";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { Suspense } from "react";

export const metadata = {
	title: "Create Activity | LinkUp",
	description: "Create a new activity to connect with others",
};

export default function AddActivityPage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<AddActivityClient />
		</Suspense>
	);
}
