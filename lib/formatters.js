export function formatNotificationTime(date) {
	const now = new Date();
	const diffMs = now - new Date(date);
	const diffSec = Math.round(diffMs / 1000);
	const diffMin = Math.round(diffSec / 60);
	const diffHour = Math.round(diffMin / 60);
	const diffDay = Math.round(diffHour / 24);

	if (diffSec < 60) {
		return "just now";
	} else if (diffMin < 60) {
		return `${diffMin}m ago`;
	} else if (diffHour < 24) {
		return `${diffHour}h ago`;
	} else if (diffDay < 7) {
		return `${diffDay}d ago`;
	} else {
		return date.toLocaleDateString();
	}
}
