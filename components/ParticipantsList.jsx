"use client";

import React from "react";

const ParticipantsList = ({ participants, maxParticipants }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{/* In a real app, we would fetch the actual participant data */}
			{participants.map((participantId, index) => (
				<div
					key={participantId}
					className="bg-secondary/30 rounded-full w-10 h-10 flex items-center justify-center text-secondary-foreground font-medium"
				>
					{String.fromCharCode(65 + index)}
				</div>
			))}

			{Array.from({
				length: Math.max(0, maxParticipants - participants.length),
			}).map((_, i) => (
				<div
					key={`empty-${i}`}
					className="border border-dashed border-muted-foreground/30 rounded-full w-10 h-10 flex items-center justify-center text-muted-foreground"
				>
					+
				</div>
			))}
		</div>
	);
};

export default ParticipantsList;
