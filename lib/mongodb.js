const mongoose = require("mongoose");

const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/linkup";

if (!global.mongoose) {
	global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
	if (global.mongoose.conn) {
		return global.mongoose.conn;
	}

	if (!global.mongoose.promise) {
		global.mongoose.promise = mongoose.connect(MONGODB_URI);
	}

	try {
		global.mongoose.conn = await global.mongoose.promise;
		return global.mongoose.conn;
	} catch (error) {
		throw error;
	}
};
