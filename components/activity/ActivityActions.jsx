"use client";

import { Button } from "@/components/ui/button";
import { useActivity } from "@/contexts";
import { useState, useEffect } from "react";

export const ActivityActions = ({ activity, isPastEvent, hasJoined }) => {
	const [joinStatus, setJoinStatus] = useState(hasJoined);
	const [isJoining, setIsJoining] = useState(false);
	const [isLeaving, setIsLeaving] = useState(false);
	const { joinActivity, leaveActivity } = useActivity();

	useEffect(() => {
		console.log("hasJoined", hasJoined);
		setJoinStatus(hasJoined);
	}, [hasJoined]);

	const handleJoinActivity = async () => {
		setIsJoining(true);
		try {
			await joinActivity(activity._id);
			setJoinStatus(true);
		} catch (error) {
			console.error("Failed to join activity:", error);
		} finally {
			setIsJoining(false);
		}
	};

	const handleLeaveActivity = async () => {
		setIsLeaving(true);
		try {
			await leaveActivity(activity._id);
			setJoinStatus(false);
		} catch (error) {
			console.error("Failed to leave activity:", error);
		} finally {
			setIsLeaving(false);
		}
	};

	if (isPastEvent) {
		return (
			<div className="w-full sm:w-auto">
				<p className="text-muted-foreground text-center">
					This event has already taken place
				</p>
			</div>
		);
	}

	return joinStatus ? (
		<Button
			onClick={handleLeaveActivity}
			variant="destructive"
			disabled={isLeaving}
			className="w-full sm:w-auto px-8"
		>
			{isLeaving ? "Leaving..." : "Leave Activity"}
		</Button>
	) : (
		<Button
			onClick={handleJoinActivity}
			disabled={
				isJoining || activity.participants.length >= activity.maxParticipants
			}
			className="w-full sm:w-auto px-8"
		>
			{isJoining ? "Joining..." : "Join Activity"}
		</Button>
	);
};
