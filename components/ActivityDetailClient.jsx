"use client";

import React from "react";
import { useState } from "react";
import ParticipantsList from "@/components/ParticipantsList";
import JoinActivityButton from "./JoinActivityButton";
import ReflectionForm from "@/components/ReflectionForm";

const ActivityDetailClient = ({
	activity,
	currentUser,
	isPastEvent,
	hasJoined,
}) => {
	const [showReflectionForm, setShowReflectionForm] = useState(false);
	const [participants, setParticipants] = useState(activity.participants);

	const handleJoinActivity = () => {
		// In a real app, this would make an API call
		if (!participants.includes(currentUser.id)) {
			setParticipants([...participants, currentUser.id]);
		}
	};

	return (
		<div>
			<div className="mt-8">
				<h3 className="font-medium mb-3 text-foreground">
					Participants ({participants.length}/{activity.maxParticipants})
				</h3>

				<ParticipantsList
					participants={participants}
					maxParticipants={activity.maxParticipants}
				/>
			</div>

			<div className="flex justify-end mt-6">
				{isPastEvent && hasJoined && !showReflectionForm ? (
					<JoinActivityButton
						onClick={() => setShowReflectionForm(true)}
						type="reflection"
						disabled={false}
					/>
				) : !isPastEvent && !hasJoined ? (
					<JoinActivityButton
						onClick={handleJoinActivity}
						type="join"
						disabled={participants.length >= activity.maxParticipants}
					/>
				) : null}
			</div>

			{showReflectionForm && (
				<ReflectionForm onCancel={() => setShowReflectionForm(false)} />
			)}
		</div>
	);
};

export default ActivityDetailClient;
