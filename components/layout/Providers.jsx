"use client";

import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts";

export const Providers = ({ children }) => {
	return (
		<TooltipProvider>
			<AppProvider>{children}</AppProvider>
			<Toaster />
		</TooltipProvider>
	);
};
