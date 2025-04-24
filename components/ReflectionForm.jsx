"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReflectionForm = ({ onCancel }) => {
	const [reflection, setReflection] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (reflection.trim().length < 10) {
			toast.error("Please write a more detailed reflection");
			return;
		}

		// In a real app, this would submit to the backend
		toast.success("Reflection submitted! +3 points");
		setReflection("");
		onCancel();
	};

	return (
		<div className="mt-6 pt-6 border-t border-border">
			<h3 className="font-medium mb-3 text-foreground">Add Your Reflection</h3>
			<form onSubmit={handleSubmit}>
				<textarea
					value={reflection}
					onChange={(e) => setReflection(e.target.value)}
					placeholder="Share your thoughts about this activity..."
					className="w-full px-4 py-2 border border-input rounded-md focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none mb-3 bg-background text-foreground"
					rows={4}
					required
				/>
				<div className="flex justify-end space-x-3">
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button type="submit">Submit Reflection</Button>
				</div>
			</form>
		</div>
	);
};

export default ReflectionForm;
