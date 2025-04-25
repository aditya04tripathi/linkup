"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { ProfileSlider } from "@/components/profile/ProfileSlider";
import { EditPersonalityProfile } from "@/components/profile/EditPersonalityProfile";
import { Badge } from "../ui/badge";

export const PersonalityClientContent = ({ initialUserData }) => {
	const { user } = useAuth();
	const { updateUserProfile } = useUser();
	const [userData, setUserData] = useState(initialUserData);

	const handleUpdateProfile = async (updatedData) => {
		try {
			await updateUserProfile(updatedData);
			setUserData((prev) => ({ ...prev, ...updatedData }));
		} catch (error) {
			console.error("Failed to update profile:", error);
		}
	};

	return (
		<div className="mt-10 relative flex flex-col gap-5 border rounded-lg p-10">
			<div className="flex justify-between items-center w-full">
				<h1>Personality Profile</h1>
				<EditPersonalityProfile
					onSave={handleUpdateProfile}
					userData={userData}
				/>
			</div>

			<ProfileSlider
				title="Extroversion Level"
				value={userData.extroversionLevel || 5}
				min={0}
				max={10}
				leftLabel="Introvert"
				rightLabel="Extrovert"
			/>

			<ProfileSlider
				title="Energy Level"
				value={userData.activenessLevel || 5}
				min={0}
				max={10}
				leftLabel="Calm"
				rightLabel="Energetic"
			/>

			<h3 className="text-lg font-semibold mt-5">Academic Interests</h3>
			{user.academicInterests.length > 0 ? (
				user.academicInterests.map((interest, index) => (
					<Badge key={index} className="w-fit" variant="outline">
						{interest}
					</Badge>
				))
			) : (
				<p className="text-muted-foreground">
					No academic interests added yet.
				</p>
			)}

			<h3 className="text-lg font-semibold mt-5">Hobbies</h3>
			{user.interests.length > 0 ? (
				user.interests.map((interest, index) => (
					<Badge key={index} className="w-fit" variant="outline">
						{interest}
					</Badge>
				))
			) : (
				<p className="text-muted-foreground">No hobbies added yet.</p>
			)}
		</div>
	);
};
