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
		id: "1",
		hostId: "2",
		title: "Study Group: Machine Learning Fundamentals",
		description:
			"Join us to study machine learning concepts and work through practice problems together.",
		activityType: "academic",
		locationType: "Library Study Room 3",
		dateTime: "2025-05-01T15:00:00",
		duration: 120,
		maxParticipants: 6,
		participants: ["2", "3"],
		compatibility: 86,
	},
	{
		id: "2",
		hostId: "3",
		title: "Hiking Adventure: Campus Hill Trail",
		description:
			"A moderate 3-mile hike with beautiful views of the campus and surrounding area.",
		activityType: "hobby",
		locationType: "Campus Hill Trailhead",
		dateTime: "2025-05-03T09:00:00",
		duration: 180,
		maxParticipants: 8,
		participants: ["3", "4", "5"],
		compatibility: 92,
	},
	{
		id: "3",
		hostId: "4",
		title: "Mindfulness Meditation Session",
		description:
			"Take a break from studying and join us for a guided meditation to reduce stress and improve focus.",
		activityType: "wellness",
		locationType: "Student Center, Room 202",
		dateTime: "2025-05-02T18:00:00",
		duration: 60,
		maxParticipants: 15,
		participants: ["4", "5", "6", "7"],
		compatibility: 45,
	},
	{
		id: "4",
		hostId: "5",
		title: "Board Game Night",
		description:
			"Casual board game night featuring Settlers of Catan, Ticket to Ride, and other classics.",
		activityType: "social",
		locationType: "Resident Hall Common Area",
		dateTime: "2025-05-04T19:00:00",
		duration: 180,
		maxParticipants: 12,
		participants: ["5", "6"],
		compatibility: 65,
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
		id: "1",
		name: "Emily Johnson",
		avatar: "https://i.pravatar.cc/150?img=1",
		bio: "Computer Science student passionate about AI and machine learning",
		compatibility: 92,
		interests: ["Programming", "AI", "Music", "Hiking"],
		score: 350,
		location: "East Campus",
		occupation: "CS Graduate Student",
		joinedDate: "2024-01-15",
	},
	{
		id: "2",
		name: "James Wilson",
		avatar: "https://i.pravatar.cc/150?img=2",
		bio: "Business major with a minor in Psychology. Love playing basketball!",
		compatibility: 78,
		interests: ["Basketball", "Economics", "Chess"],
		score: 420,
		location: "West Dorms",
		occupation: "Business Undergrad",
		joinedDate: "2023-09-05",
	},
	{
		id: "3",
		name: "Sarah Martinez",
		avatar: "https://i.pravatar.cc/150?img=3",
		bio: "Art history major, amateur photographer, and coffee enthusiast",
		compatibility: 85,
		interests: ["Photography", "Art", "Coffee", "Travel"],
		score: 280,
		location: "Arts District",
		occupation: "Art History Major",
		joinedDate: "2023-11-20",
	},
	{
		id: "4",
		name: "Michael Chen",
		avatar: "https://i.pravatar.cc/150?img=4",
		bio: "Engineering student working on sustainable energy projects",
		compatibility: 64,
		interests: ["Engineering", "Sustainability", "Soccer"],
		score: 510,
		location: "Engineering Building",
		occupation: "Mechanical Engineering PhD",
		joinedDate: "2023-08-12",
	},
	{
		id: "5",
		name: "Taylor Rodriguez",
		avatar: "https://i.pravatar.cc/150?img=5",
		bio: "Psychology major researching human behavior. Love dogs and hiking!",
		compatibility: 89,
		interests: ["Psychology", "Hiking", "Dogs", "Reading"],
		score: 320,
		location: "Psychology Department",
		occupation: "Psychology Researcher",
		joinedDate: "2024-02-03",
	},
	{
		id: "6",
		name: "Alex Kim",
		avatar: "https://i.pravatar.cc/150?img=6",
		bio: "Math major with a passion for music theory and composition",
		compatibility: 73,
		interests: ["Mathematics", "Music", "Piano", "Algorithms"],
		score: 290,
		location: "Math Department",
		occupation: "Math & Music Double Major",
		joinedDate: "2023-10-15",
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
