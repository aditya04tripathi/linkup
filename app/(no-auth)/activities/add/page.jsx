"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from "@/components/DateTimePicker";

// Replace with your context/hooks as needed
// import { useActivity } from "@/context/ActivityContext";
// import { useAuth } from "@/context/AuthContext";

const CreateActivity = () => {
	const router = useRouter();
	// const { createActivity } = useActivity();
	// const { user } = useAuth();

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		activityType: "social",
		locationType: "",
		dateTime: "",
		duration: 60,
		maxParticipants: 5,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			!formData.title ||
			!formData.description ||
			!formData.locationType ||
			!formData.dateTime
		) {
			toast.error("Please fill in all required fields");
			return;
		}

		// createActivity({
		//   ...formData,
		//   duration: Number(formData.duration),
		//   maxParticipants: Number(formData.maxParticipants),
		//   activityType: formData.activityType,
		// });

		toast.success("Activity created successfully! +10 points");
		router.push("/activities");
	};

	return (
		<div className="px-5 mx-auto w-full min-h-[calc(100vh-5rem)] flex items-center justify-start">
			<div className="p-5 border rounded-lg w-full">
				<h1 className="text-2xl font-bold mb-6">Create a LinkUp Activity</h1>
				<div className="rounded-lg shadow-md">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex flex-col gap-1">
							<Label htmlFor="title" className="mb-1">
								Activity Title*
							</Label>
							<Input
								type="text"
								id="title"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className="flex flex-col gap-1">
							<Label htmlFor="description" className="mb-1">
								Description*
							</Label>
							<Textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								rows={4}
								required
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-1">
								<Label htmlFor="activityType" className="mb-1">
									Activity Type*
								</Label>

								<Select
									name="activityType"
									value={formData.activityType}
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											activityType: value,
										}))
									}
								>
									<SelectTrigger className={"w-full"}>
										<SelectValue placeholder="Select Activity Type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="academic">Academic</SelectItem>
										<SelectItem value="hobby">Hobby</SelectItem>
										<SelectItem value="wellness">Wellness</SelectItem>
										<SelectItem value="social">Social</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex flex-col gap-1">
								<Label htmlFor="locationType" className="mb-1">
									Location*
								</Label>
								<Input
									type="text"
									id="locationType"
									name="locationType"
									value={formData.locationType}
									onChange={handleInputChange}
									required
									placeholder="e.g., Library, Cafe, Room 101"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-1">
								<Label htmlFor="dateTime" className="mb-1">
									Date and Time*
								</Label>
								<DateTimePicker
									value={formData.dateTime}
									onChange={(dateTime) =>
										setFormData((prev) => ({
											...prev,
											dateTime,
										}))
									}
								/>
							</div>

							<div className="flex flex-col gap-1">
								<Label htmlFor="duration" className="mb-1">
									Duration (minutes)*
								</Label>
								<Input
									type="number"
									id="duration"
									name="duration"
									value={formData.duration}
									onChange={handleInputChange}
									min={15}
									required
								/>
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<Label htmlFor="maxParticipants" className="mb-1">
								Maximum Participants*
							</Label>
							<Input
								type="number"
								id="maxParticipants"
								name="maxParticipants"
								value={formData.maxParticipants}
								onChange={handleInputChange}
								min={1}
								max={50}
								required
							/>
						</div>

						<div className="flex justify-end space-x-3 pt-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.push("/activities")}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="bg-primary hover:bg-primary-dark"
							>
								Create Activity
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateActivity;
