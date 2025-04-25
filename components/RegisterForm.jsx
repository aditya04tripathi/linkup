"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const RegisterForm = () => {
	const [form, setForm] = React.useState({
		name: "John Doe",
		username: "johndoe",
		email: "jdoe0001@student.monash.edu",
		password: "1234567890",
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
		const { name, email, password } = form;

		if (!name || !email || !password) {
			return toast.error("Please fill in all fields");
		}

		const { data } = await axios.post("/api/auth/register", form);
		if (data.ok) {
			toast.success("Registered successfully");
			router.push("/login");
		} else {
			toast.error(data.message);
		}
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
			<Label className="flex items-start flex-col gap-2" htmlFor="username">
				<div>Username</div>
				<Input
					onChange={handleChange}
					value={form.username}
					placeholder="johndoe"
					type="text"
					id="username"
					name="username"
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
			<div className="flex flex-col md:flex-row w-full justify-between items-center gap-5">
				<Button
					disabled={register.isPending}
					type="submit"
					className={"flex-1 w-full"}
				>
					Create Account
				</Button>
				<Button
					type="button"
					className={"flex-1 w-full flex-wrap"}
					variant={"ghost"}
					disabled={register.isPending}
					onClick={() => router.push("/login")}
				>
					Already have an account?
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
