import ActivityDetailClient from "./page-client";

export const metadata = {
	title: "Activity Details | LinkUp",
	description:
		"View details about this activity and join to connect with others",
};

export default async function ActivityDetailPage({ params }) {
	const { id } = await params;

	return <ActivityDetailClient id={id} />;
}
