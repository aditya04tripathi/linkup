"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RegisterForm = () => {
	const [form, setForm] = React.useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, confirmPassword } = form;

		if (!name || !email || !password || !confirmPassword)
			return toast.error("Please fill in all fields");

		if (password !== confirmPassword)
			return toast.error("Passwords do not match");

		toast.success("Account created successfully");
		router.push("/login");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mt-5 w-full flex flex-col items-stretch justify-center gap-5"
		>
			<Label className="flex items-start flex-col gap-2" htmlFor="name">
				<div>Full Name</div>
				<Input
					onChange={handleChange}
					value={form.name}
					placeholder="John Doe"
					type="text"
					id="name"
					name="name"
				/>
			</Label>
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
			<Label
				className="flex items-start flex-col gap-2"
				htmlFor="confirmPassword"
			>
				<div>Confirm Password</div>
				<Input
					onChange={handleChange}
					value={form.confirmPassword}
					placeholder="********"
					type="password"
					id="confirmPassword"
					name="confirmPassword"
				/>
			</Label>
			<div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
				<Button type="submit" className={"flex-1 w-full"}>
					Create Account
				</Button>
				<Button
					type="button"
					className={"flex-1 w-full flex-wrap"}
					variant={"ghost"}
					onClick={() => router.push("/login")}
				>
					Sign in
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
