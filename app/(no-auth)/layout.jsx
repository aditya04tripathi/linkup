"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";

export default function AuthenticatedLayout({ children }) {
	return (
		<ProtectedRoute>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main className="container flex-1 px-4 py-6 mx-auto">{children}</main>
				<Toaster />
			</div>
		</ProtectedRoute>
	);
}
