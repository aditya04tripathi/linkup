"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import EditPersonalityProfile from "@/components/EditPersonalityTraits";
import EditPersonalDetailsSheet from "@/components/EditProfileDetails";
import ProfileSlider from "@/components/ProfileSlider";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
	const { token, user } = useAuth();

	const fetchUser = async () => {
		const { data } = await axios.get("/api/auth/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (data.ok) {
		} else {
			console.error("Failed to fetch user data");
		}
	};
	useEffect(() => {
		fetchUser();
	}, []);

	if (!user) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div>
			<div className="w-full flex justify-between items-center">
				<h1>Welcome, {user.name}!</h1>
				<Link href="/notifications">
					<Button>
						<Bell />
					</Button>
				</Link>
			</div>
			<div className="relative flex flex-col items-center gap-5 border rounded-lg mt-5 p-10">
				<EditPersonalDetailsSheet />
				<Image
					src="https://picsum.photos/500"
					alt="User"
					height={500}
					width={500}
					className="rounded-full w-32 h-32 object-cover"
				/>
				<div className="flex flex-col items-center justify-center">
					<h1>{user.name}</h1>
					<p className="text-sm text-muted-foreground">{user.email}</p>
				</div>

				<div className="border h-8 flex items-center justify-center px-5 rounded-lg">
					✨ {user.score} engagement points ✨
				</div>
			</div>

			<div className="mt-10 relative flex flex-col gap-5 border rounded-lg p-10">
				<div className="flex justify-between items-center w-full">
					<h1>Personality Profile</h1>
					<EditPersonalityProfile />
				</div>

				<ProfileSlider
					title="Extroversion Level"
					value={user.extroversionLevel}
					min={0}
					max={10}
					leftLabel="Introvert"
					rightLabel="Extrovert"
				/>

				<ProfileSlider
					title="Energy Level"
					value={user.energyLevel}
					min={0}
					max={10}
					leftLabel="Low Energy"
					rightLabel="High Energy"
				/>

				<ProfileSlider
					title={`Preferred Group Size (${user.preferredGroupSize[0]}-${user.preferredGroupSize[1]})`}
					value={user.preferredGroupSize}
					min={0}
					max={10}
					leftLabel="0"
					rightLabel="10"
					range
				/>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Academic Interests</h3>
					<div className="flex-wrap flex gap-2">
						{user.academicInterests.length === 0
							? "Such empty"
							: user.academicInterests.map((interest, idx) => (
									<Badge key={idx}>{interest}</Badge>
							  ))}
					</div>
				</div>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Hobbies</h3>
					<div className="flex-wrap flex gap-2">
						{user.interests.length === 0
							? "Such empty"
							: user.interests.map((interest, idx) => (
									<Badge key={idx}>{interest}</Badge>
							  ))}
					</div>
				</div>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Accomodations</h3>
					<p>
						{user.accommodation.length > 0 ? user.accommodation : "Such empty"}
					</p>
				</div>
			</div>
		</div>
	);
}
