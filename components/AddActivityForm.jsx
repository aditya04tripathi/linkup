"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { DateTimePicker } from "./DateTimePicker";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const AddActivityForm = () => {
	const router = useRouter();
	const [formData, setFormData] = React.useState({
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
			alert("Please fill in all required fields");
			return;
		}

		// Simulate API call
		setTimeout(() => {
			alert("Activity created successfully!");
			router.push("/activities");
		}, 1000);
	};

	return (
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
				<Button type="submit" className="bg-primary hover:bg-primary-dark">
					Create Activity
				</Button>
			</div>
		</form>
	);
};

export default AddActivityForm;
