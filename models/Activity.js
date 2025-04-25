import { Schema, model, models } from "mongoose";
import User from "./User";

const activitySchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	hostId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	dateTime: {
		type: Date,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		enum: ["academic", "social", "hobby", "wellness"],
		default: "academic",
	},
	maxParticipants: {
		type: Number,
		required: true,
	},
	participants: {
		type: [Schema.Types.ObjectId],
		ref: "User",
		default: [],
	},
	status: {
		type: String,
		enum: ["upcoming", "ongoing", "completed"],
		default: "upcoming",
	},
});

export default models.Activity || model("Activity", activitySchema);
