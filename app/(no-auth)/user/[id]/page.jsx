import { UserProfileClient } from "./page-client";

export const metadata = {
	title: "User Profile | LinkUp",
	description: "View user profile and connect with peers",
};

export default async function UserProfilePage({ params }) {
	const { id } = await params;
	return <UserProfileClient id={id} />;
}
