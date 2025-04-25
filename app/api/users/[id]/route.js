import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const GET = async (req, { params }) => {
	const { id } = await params;
	try {
		await connectDB();
		const user = await User.findOne({
			_id: id,
		});

		return Response.json(
			{
				ok: true,
				message: user,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return Response.json(
			{ ok: false, message: error.message },
			{
				status: 500,
			}
		);
	}
};
