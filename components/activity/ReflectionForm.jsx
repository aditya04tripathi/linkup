"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const ReflectionForm = ({ activity, isPastEvent, hasJoined }) => {
	const [isJoining, setIsJoining] = useState(false);
	const [isLeaving, setIsLeaving] = useState(false);
	const [joinStatus, setJoinStatus] = useState(hasJoined);

	const handleJoinActivity = async () => {
		setIsJoining(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setJoinStatus(true);
			toast.success("Successfully joined the activity!");
		} catch (error) {
			toast.error("Failed to join activity. Please try again.");
		} finally {
			setIsJoining(false);
		}
	};

	const handleLeaveActivity = async () => {
		setIsLeaving(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setJoinStatus(false);
			toast.success("Successfully left the activity");
		} catch (error) {
			toast.error("Failed to leave activity. Please try again.");
		} finally {
			setIsLeaving(false);
		}
	};

	if (isPastEvent) {
		return (
			<div className="p-4 bg-muted/30 rounded-md">
				<p className="text-muted-foreground text-center">
					This event has already taken place
				</p>
			</div>
		);
	}

	return (
		<div className="flex justify-center">
			{joinStatus ? (
				<Button
					variant="destructive"
					onClick={handleLeaveActivity}
					disabled={isLeaving}
					className="w-full sm:w-auto px-8"
				>
					{isLeaving ? (
						<>
							<Loader2 size={16} className="mr-2 animate-spin" />
							Leaving...
						</>
					) : (
						"Leave Activity"
					)}
				</Button>
			) : (
				<Button
					onClick={handleJoinActivity}
					disabled={
						isJoining ||
						activity.participants.length >= activity.maxParticipants
					}
					className="w-full sm:w-auto px-8"
				>
					{isJoining ? (
						<>
							<Loader2 size={16} className="mr-2 animate-spin" />
							Joining...
						</>
					) : (
						"Join Activity"
					)}
				</Button>
			)}
		</div>
	);
};
