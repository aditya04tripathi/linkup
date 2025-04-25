"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProfileSlider } from "@/components/profile/ProfileSlider";
import { Textarea } from "@/components/ui/textarea";
import { academicInterests, hobbiesList } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

export const EditPersonalityProfile = ({ userData, onSave }) => {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		extroversionLevel: userData?.extroversionLevel || 5,
		energyLevel: userData?.energyLevel || 5,
		bio: userData?.bio || "",
	});

	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
				size="sm"
				className="gap-1"
			>
				<Pencil size={14} />
				Edit
			</Button>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Edit Personality Profile</DialogTitle>
					<DialogDescription>
						Customize your personality traits to help us match you with
						compatible peers.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit}>
					<ScrollArea className="h-[60vh] md:h-[400px] pr-4">
						<div className="space-y-6">
							<h3 className="text-lg font-medium">Academic Interests</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
								{academicInterests.map((interest, idx) => (
									<div key={idx} className="flex items-center space-x-2">
										<Checkbox id={interest} />
										<label
											htmlFor={interest}
											className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{interest}
										</label>
									</div>
								))}
							</div>

							<h3 className="text-lg font-medium">Hobbies</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
								{hobbiesList.map((hobby, idx) => (
									<div key={idx} className="flex items-center space-x-2">
										<Checkbox id={hobby} />
										<label
											htmlFor={hobby}
											className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{hobby}
										</label>
									</div>
								))}
							</div>

							<ProfileSlider
								title="Extroversion Level"
								value={formData.extroversionLevel}
								min={0}
								max={10}
								leftLabel="Introvert"
								rightLabel="Extrovert"
								onChange={(value) => handleChange("extroversionLevel", value)}
							/>

							<ProfileSlider
								title="Energy Level"
								value={formData.energyLevel}
								min={0}
								max={10}
								leftLabel="Low Energy"
								rightLabel="High Energy"
								onChange={(value) => handleChange("energyLevel", value)}
							/>

							<h3 className="text-sm font-medium">Bio</h3>
							<Textarea
								value={formData.bio}
								onChange={(e) => handleChange("bio", e.target.value)}
								placeholder="Tell others about yourself..."
								className="min-h-[120px]"
							/>
						</div>
					</ScrollArea>

					<DialogFooter className="mt-6 gap-2">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
