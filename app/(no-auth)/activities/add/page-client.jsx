"use client";

import { AddActivityForm } from "@/components/activity/AddActivityForm";
import { useAuth } from "@/contexts/AuthContext";
import { useActivity } from "@/contexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddActivityClient = () => {
	const { user } = useAuth();
	const { loading } = useActivity();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	if (!user) {
		return null;
	}

	return (
		<div className="w-full flex items-center justify-start">
			<div className="rounded-lg w-full">
				<h1 className="text-2xl font-bold mb-6">Create a LinkUp Activity</h1>
				<div className="rounded-lg shadow-md">
					<AddActivityForm />
				</div>
			</div>
			{loading && (
				<div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				</div>
			)}
		</div>
	);
};

export default AddActivityClient;
