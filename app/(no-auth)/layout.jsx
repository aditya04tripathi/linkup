"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { ActivityProvider } from "@/contexts/ActivityContext";

export default function AuthenticatedLayout({ children }) {
	return (
		<ProtectedRoute>
			<ActivityProvider>
				<div className="flex flex-col min-h-screen">
					<Navbar />
					<main className="container flex-1 px-4 py-6 mx-auto">{children}</main>
					<Toaster />
				</div>
			</ActivityProvider>
		</ProtectedRoute>
	);
}
