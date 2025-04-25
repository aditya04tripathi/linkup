"use client";

import { createContext, useContext } from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "./ThemeContext";
import { NotificationProvider } from "./NotificationContext";

// Create a combined App context to avoid deeply nested providers
export const AppContext = createContext(null);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};

export function AppProvider({ children }) {
	return (
		<AuthProvider>
			<UserProvider>
				<ThemeProvider>
					<NotificationProvider>{children}</NotificationProvider>
				</ThemeProvider>
			</UserProvider>
		</AuthProvider>
	);
}
