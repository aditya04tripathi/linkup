import User from "@/models/User";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const academicInterests = [
	"Computer Science",
	"Engineering",
	"Mathematics",
	"Physics",
	"Chemistry",
	"Biology",
	"Psychology",
	"Sociology",
	"Economics",
	"Business",
	"Art",
	"Music",
	"Literature",
	"History",
	"Philosophy",
	"Political Science",
	"Medicine",
	"Law",
	"Education",
	"Communications",
];

export const hobbiesList = [
	"Reading",
	"Writing",
	"Photography",
	"Painting",
	"Drawing",
	"Hiking",
	"Running",
	"Swimming",
	"Cycling",
	"Yoga",
	"Meditation",
	"Cooking",
	"Baking",
	"Gardening",
	"Music",
	"Gaming",
	"Movies",
	"Sports",
	"Travel",
	"Volunteering",
];

export const ACTIVITIES = [
	{
		hostId: "680aeb81cba645c2565934e8",
		title: "Study Group: Machine Learning Fundamentals",
		description:
			"Join us to study machine learning concepts and work through practice problems together.",
		activityType: "academic",
		locationType: "Library Study Room 3",
		dateTime: "2025-05-01T15:00:00",
		duration: 120,
		maxParticipants: 6,
		participants: ["680aeb81cba645c2565934e8", "680b0e75cba645c25659350a"],
	},
	{
		hostId: "680aeb81cba645c2565934e8",
		title: "Hiking Adventure: Campus Hill Trail",
		description:
			"A moderate 3-mile hike with beautiful views of the campus and surrounding area.",
		activityType: "hobby",
		locationType: "Campus Hill Trailhead",
		dateTime: "2025-05-03T09:00:00",
		duration: 180,
		maxParticipants: 8,
		participants: ["680aeb81cba645c2565934e8", "680b0e75cba645c25659350a"],
	},
	{
		hostId: "680b0e75cba645c25659350a",
		title: "Mindfulness Meditation Session",
		description:
			"Take a break from studying and join us for a guided meditation to reduce stress and improve focus.",
		activityType: "wellness",
		locationType: "Student Center, Room 202",
		dateTime: "2025-05-02T18:00:00",
		duration: 60,
		maxParticipants: 15,
	},
	{
		hostId: "680b0e75cba645c25659350a",
		title: "Board Game Night",
		description:
			"Casual board game night featuring Settlers of Catan, Ticket to Ride, and other classics.",
		activityType: "social",
		locationType: "Resident Hall Common Area",
		dateTime: "2025-05-04T19:00:00",
		duration: 180,
		maxParticipants: 12,
	},
];

export const formatDate = (dateString) => {
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	return new Date(dateString).toLocaleDateString(undefined, options);
};

export const MOCK_USERS = [
	{
		username: "emilyj",
		name: "Emily Johnson",
		email: "emil1234@monash.edu",
		password: "1234567890",
		avatar: "https://i.pravatar.cc/150?img=1",
		friends: [],
		bio: "Computer Science student passionate about AI and machine learning",
		score: 350,
		interests: ["Computer Science", "Mathematics", "Music", "Hiking"],
		academicInterests: ["Computer Science", "Mathematics"],
		accommodation: "East Campus",
		preferredGroupSize: [2, 6],
		extroversionLevel: 7,
		energyLevel: 8,
		compatibility: 92,
		location: "East Campus",
		occupation: "CS Graduate Student",
	},
	{
		username: "jamesw",
		name: "James Wilson",
		email: "jame5678@monash.edu",
		password: "1234567890",
		avatar: "https://i.pravatar.cc/150?img=2",
		friends: [],
		bio: "Business major with a minor in Psychology. Love playing basketball!",
		score: 420,
		interests: ["Business", "Psychology", "Sports"],
		academicInterests: ["Business", "Psychology"],
		accommodation: "West Dorms",
		preferredGroupSize: [3, 8],
		extroversionLevel: 6,
		energyLevel: 7,
		compatibility: 78,
		location: "West Dorms",
		occupation: "Business Undergrad",
	},
	{
		username: "sarahm",
		name: "Sarah Martinez",
		email: "sara4321@monash.edu",
		password: "1234567890",
		avatar: "https://i.pravatar.cc/150?img=3",
		friends: [],
		bio: "Art history major, amateur photographer, and coffee enthusiast",
		score: 280,
		interests: ["Art", "Photography", "Travel", "Literature"],
		academicInterests: ["Art", "Literature"],
		accommodation: "Arts District",
		preferredGroupSize: [1, 4],
		extroversionLevel: 5,
		energyLevel: 6,
		compatibility: 85,
		location: "Arts District",
		occupation: "Art History Major",
	},
	{
		username: "michaelc",
		name: "Michael Chen",
		email: "mich8765@monash.edu",
		password: "1234567890",
		avatar: "https://i.pravatar.cc/150?img=4",
		friends: [],
		bio: "Engineering student working on sustainable energy projects",
		score: 510,
		interests: ["Engineering", "Biology", "Sports"],
		academicInterests: ["Engineering", "Biology"],
		accommodation: "Engineering Building",
		preferredGroupSize: [2, 5],
		extroversionLevel: 4,
		energyLevel: 7,
		compatibility: 64,
		location: "Engineering Building",
		occupation: "Mechanical Engineering PhD",
	},
	{
		username: "taylorr",
		name: "Taylor Rodriguez",
		email: "tayl2468@monash.edu",
		password: "1234567890",
		avatar: "https://i.pravatar.cc/150?img=5",
		friends: [],
		bio: "Psychology major researching human behavior. Love dogs and hiking!",
		score: 320,
		interests: ["Psychology", "Hiking", "Reading"],
		academicInterests: ["Psychology"],
		accommodation: "Psychology Department",
		preferredGroupSize: [2, 6],
		extroversionLevel: 8,
		energyLevel: 8,
		compatibility: 89,
		location: "Psychology Department",
		occupation: "Psychology Researcher",
	},
	{
		username: "alexk",
		name: "Alex Kim",
		email: "alex1357@monash.edu",
		password: "1234567890",
		avatar: "https://i.pravatar.cc/150?img=6",
		friends: [],
		bio: "Math major with a passion for music theory and composition",
		score: 290,
		interests: ["Mathematics", "Music", "Writing"],
		academicInterests: ["Mathematics"],
		accommodation: "Math Department",
		preferredGroupSize: [1, 3],
		extroversionLevel: 3,
		energyLevel: 5,
		compatibility: 73,
		location: "Math Department",
		occupation: "Math & Music Double Major",
	},
];

export const MOCK_NOTIFICATIONS = [
	{
		id: "1",
		type: "friend_request",
		sender: {
			id: "1",
			name: "Emily Johnson",
			avatar: "https://i.pravatar.cc/150?img=1",
		},
		message: "sent you a friend request",
		read: false,
		createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
	},
	{
		id: "2",
		type: "message",
		sender: {
			id: "2",
			name: "James Wilson",
			avatar: "https://i.pravatar.cc/150?img=2",
		},
		message: "sent you a message",
		preview: "Hey! Are you going to the study session tomorrow?",
		conversationId: "conv123",
		read: true,
		createdAt: new Date(Date.now() - 3600000 * 5), // 5 hours ago
	},
	{
		id: "3",
		type: "activity_invite",
		sender: {
			id: "3",
			name: "Sarah Martinez",
			avatar: "https://i.pravatar.cc/150?img=3",
		},
		message: "invited you to an activity",
		activityId: "2",
		activityTitle: "Hiking Adventure: Campus Hill Trail",
		read: false,
		createdAt: new Date(Date.now() - 3600000 * 8), // 8 hours ago
	},
	{
		id: "4",
		type: "activity_reminder",
		activityId: "1",
		activityTitle: "Study Group: Machine Learning Fundamentals",
		message: "starts in 30 minutes",
		read: true,
		createdAt: new Date(Date.now() - 3600000 * 12), // 12 hours ago
	},
	{
		id: "5",
		type: "friend_accepted",
		sender: {
			id: "4",
			name: "Michael Chen",
			avatar: "https://i.pravatar.cc/150?img=4",
		},
		message: "accepted your friend request",
		read: false,
		createdAt: new Date(Date.now() - 3600000 * 24), // 24 hours ago
	},
	{
		id: "6",
		type: "points_earned",
		pointsAmount: 25,
		message:
			"You earned 25 points for attending Study Group: Machine Learning Fundamentals",
		read: true,
		createdAt: new Date(Date.now() - 3600000 * 48), // 48 hours ago
	},
];

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
