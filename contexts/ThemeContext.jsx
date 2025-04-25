"use client";

import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext();

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("system");
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme) {
			setTheme(storedTheme);
			setIsActive(storedTheme === "dark");
			if (storedTheme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
			setIsActive(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		setIsActive(newTheme === "dark");
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark");
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isActive }}>
			{children}
		</ThemeContext.Provider>
	);
};
