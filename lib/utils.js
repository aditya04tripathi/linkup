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
