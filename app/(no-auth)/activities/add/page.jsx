import AddActivityForm from "@/components/AddActivityForm";

const CreateActivity = () => {
	return (
		<div className="w-full flex items-center justify-start">
			<div className="rounded-lg w-full">
				<h1 className="text-2xl font-bold mb-6">Create a LinkUp Activity</h1>
				<div className="rounded-lg shadow-md">
					<AddActivityForm />
				</div>
			</div>
		</div>
	);
};

export default CreateActivity;
