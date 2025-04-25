import MessagePageClient from "./page-client";

export default async function MessagePage({ params }) {
	const { id } = await params;
	return <MessagePageClient id={id} />;
}
