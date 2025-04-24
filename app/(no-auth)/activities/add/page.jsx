import AddActivityForm from "@/components/AddActivityForm";

const CreateActivity = () => {
	return (
		<div className="px-5 mx-auto w-full min-h-[calc(100vh-5rem)] flex items-center justify-start">
			<div className="p-5 border rounded-lg w-full">
				<h1 className="text-2xl font-bold mb-6">Create a LinkUp Activity</h1>
				<div className="rounded-lg shadow-md">
					<AddActivityForm />
				</div>
			</div>
		</div>
	);
};

export default CreateActivity;
