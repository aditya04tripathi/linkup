import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";

export const GET = async (req, { params }) => {
	const { id } = await params;
	try {
		await connectDB();
		const activities = await Activity.findOne({
			_id: id,
		});

		return Response.json(
			{
				ok: true,
				message: activities,
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
