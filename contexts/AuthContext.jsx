"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("token");
		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
			setToken(storedToken);
		}
		setLoading(false);
	}, []);

	const signIn = async (email, password) => {
		try {
			const { data } = await axios.post("/api/auth/login", { email, password });
			console.log(data);
			if (data.ok) {
				toast.success("Logged in successfully");
				setUser(data.message);
				setToken(data.message.token);
				localStorage.setItem("user", JSON.stringify(data.message));
				localStorage.setItem("token", data.message.token);
				router.push("/");
			} else {
				toast.error(data.message);
			}

			return data.message;
		} catch (error) {
			console.error("Sign in failed:", error);
			throw error;
		}
	};

	const signUp = async (userData) => {
		try {
			const { data } = await axios.post("/api/auth/register", userData);
			if (data.ok) {
				toast.success("Registered successfully");
				router.push("/login");
			} else {
				toast.error(data.message);
			}

			router.push("/");
			return data.message;
		} catch (error) {
			console.error("Sign up failed:", error);
			throw error;
		}
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		router.push("/login");
	};

	const updateUser = async (updatedUser) => {
		try {
			if (token) {
				await axios.post("/api/auth/me", updatedUser, {
					headers: { Authorization: `Bearer ${token}` },
				});
			}

			setUser((prevUser) => ({
				...prevUser,
				...updatedUser,
			}));

			const updatedUserData = { ...user, ...updatedUser };
			localStorage.setItem("user", JSON.stringify(updatedUserData));
			return updatedUserData;
		} catch (error) {
			console.error("Profile update failed:", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, token, signIn, signUp, logout, updateUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
