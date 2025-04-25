"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from "react-redux";
import { store, persistor } from "@/stores";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<TooltipProvider>
						{children}
						<Toaster />
					</TooltipProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	);
};

export default Providers;
