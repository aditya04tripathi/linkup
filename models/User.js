import { Schema, model, models } from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Please enter a username"],
			unique: [true, "Username already exists"],
			trim: true,
		},
		name: {
			type: String,
			required: [true, "Please enter a name"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please enter an email"],
			unique: [true, "Email already exists"],
			trim: true,
			match: [
				/^[A-Za-z{4}\d{4}]+@[a-zA-Z.]*monash\.edu$/,
				"Please enter a valid Monash email",
			],
		},
		password: {
			type: String,
			default: "",
		},
		avatar: {
			type: String,
		},
		friends: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		bio: {
			type: String,
			default: "",
		},
		score: {
			type: Number,
			default: 0,
		},
		interests: {
			type: [String],
			default: [],
		},
		academicInterests: {
			type: [String],
			default: [],
		},
		accommodation: {
			type: String,
			default: "",
		},
		preferredGroupSize: {
			type: [Number],
			default: [1, 10],
		},
		extroversionLevel: {
			type: Number,
			default: 0,
		},
		energyLevel: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		this.password = bcryptjs.hashSync(this.password, 10);
	}
	next();
});

UserSchema.methods.comparePassword = async function (password) {
	return await bcryptjs.compare(password, this.password);
};

const User = models && models.User ? models.User : model("User", UserSchema);
export default User;
