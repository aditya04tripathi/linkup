"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { EditPersonalityTraits } from ".";

export const ProfileClientContent = ({ initialUserData }) => {
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
				<EditPersonalityTraits
					onSave={handleUpdateProfile}
					userData={userData}
				/>
			</div>
		</div>
	);
};
