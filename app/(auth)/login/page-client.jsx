"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export const LoginClient = () => {
	const { signIn } = useAuth();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = form;

		if (!email || !password) return toast.error("Please fill in all fields");

		await signIn(email, password);
	};

	return (
		<>
			<h1>Welcome to LinkUp</h1>
			<p className="text-muted-foreground text-center">
				Enter your credentials to sign in to your account 🚀
			</p>
			<form
				onSubmit={handleSubmit}
				className="mt-5 w-full flex flex-col items-stretch justify-center gap-5"
			>
				<Label className="flex items-start flex-col gap-2" htmlFor="email">
					<div>Email</div>
					<Input
						onChange={handleChange}
						value={form.email}
						placeholder="john@doe.com"
						type="email"
						id="email"
						name="email"
					/>
				</Label>
				<Label className="flex items-start flex-col gap-2" htmlFor="password">
					<div>Password</div>
					<Input
						onChange={handleChange}
						value={form.password}
						placeholder="********"
						type="password"
						id="password"
						name="password"
					/>
				</Label>
				<div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">
					<Button type="submit" className={"w-full flex-1"}>
						Sign In
					</Button>
					<Button
						type="button"
						className={"flex-1"}
						variant={"ghost"}
						onClick={() => router.push("/register")}
					>
						Sign Up
					</Button>
				</div>
			</form>
		</>
	);
};

export default LoginClient;
