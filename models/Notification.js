import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: ["activity", "friend", "system"],
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		read: {
			type: Boolean,
			default: false,
		},
		relatedId: {
			type: mongoose.Schema.Types.ObjectId,
			refPath: "relatedModel",
		},
		relatedModel: {
			type: String,
			enum: ["Activity", "User"],
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Notification ||
	mongoose.model("Notification", NotificationSchema);
