"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function ProfileClient() {
	const { user, updateUser } = useAuth();
	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		bio: user?.bio || "",
		occupation: user?.occupation || "",
		location: user?.location || "",
		interests: (user?.interests || []).join(", "),
		academicInterests: (user?.academicInterests || []).join(", "),
		extroversionLevel: user?.extroversionLevel || 5,
		energyLevel: user?.energyLevel || 5,
		preferredGroupSizeMin: user?.preferredGroupSize?.[0] || 2,
		preferredGroupSizeMax: user?.preferredGroupSize?.[1] || 5,
	});
	const [profileImage, setProfileImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(user?.avatar || null);
	const [saving, setSaving] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSliderChange = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value[0] }));
	};

	const handleSelectChange = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfileImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);

		try {
			const updateData = {
				...formData,
				interests: formData.interests
					.split(",")
					.map((i) => i.trim())
					.filter((i) => i),
				academicInterests: formData.academicInterests
					.split(",")
					.map((i) => i.trim())
					.filter((i) => i),
				preferredGroupSize: [
					formData.preferredGroupSizeMin,
					formData.preferredGroupSizeMax,
				],
			};

			if (profileImage) {
				updateData.profileImage = profileImage;
			}

			await updateUser(updateData);
		} catch (error) {
			console.error("Failed to update profile:", error);
		} finally {
			setSaving(false);
		}
	};

	if (!user) {
		return <div className="p-6">Loading...</div>;
	}

	return (
		<div className="container max-w-2xl mx-auto p-6">
			<h1 className="mb-6">Edit Your Profile</h1>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="flex flex-col items-center mb-6">
					<Avatar className="h-32 w-32 mb-4">
						<AvatarImage src={previewUrl || ""} alt={user.name} />
						<AvatarFallback className="text-2xl">
							{user.name?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>

				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								disabled
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="bio">Bio</Label>
						<Textarea
							id="bio"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
							rows={3}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="occupation">Occupation</Label>
							<Input
								id="occupation"
								name="occupation"
								value={formData.occupation}
								onChange={handleChange}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="location">Location</Label>
							<Input
								id="location"
								name="location"
								value={formData.location}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="interests">Interests (comma separated)</Label>
						<Input
							id="interests"
							name="interests"
							value={formData.interests}
							onChange={handleChange}
							placeholder="e.g. Reading, Music, Hiking"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="academicInterests">
							Academic Interests (comma separated)
						</Label>
						<Input
							id="academicInterests"
							name="academicInterests"
							value={formData.academicInterests}
							onChange={handleChange}
							placeholder="e.g. Computer Science, Mathematics"
						/>
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<Label htmlFor="extroversionLevel">Extroversion Level</Label>
								<span className="text-sm text-muted-foreground">
									{formData.extroversionLevel}/10
								</span>
							</div>
							<Slider
								id="extroversionLevel"
								min={1}
								max={10}
								step={1}
								value={[formData.extroversionLevel]}
								onValueChange={(value) =>
									handleSliderChange("extroversionLevel", value)
								}
							/>
							<div className="flex justify-between text-xs text-muted-foreground mt-1">
								<span>Introvert</span>
								<span>Extrovert</span>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<Label htmlFor="energyLevel">Energy Level</Label>
								<span className="text-sm text-muted-foreground">
									{formData.energyLevel}/10
								</span>
							</div>
							<Slider
								id="energyLevel"
								min={1}
								max={10}
								step={1}
								value={[formData.energyLevel]}
								onValueChange={(value) =>
									handleSliderChange("energyLevel", value)
								}
							/>
							<div className="flex justify-between text-xs text-muted-foreground mt-1">
								<span>Low</span>
								<span>High</span>
							</div>
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={saving}>
						{saving ? "Saving..." : "Save Changes"}
					</Button>
				</div>
			</form>
		</div>
	);
}
