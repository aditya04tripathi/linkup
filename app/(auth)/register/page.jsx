import RegisterForm from "@/components/RegisterForm";
import React from "react";

const RegisterPage = () => {
	return (
		<>
			<h1>Welcome to LinkUp</h1>
			<p className="text-muted-foreground text-center">
				Enter your credentials to sign in to your account 🚀
			</p>
			<RegisterForm />
		</>
	);
};

export default RegisterPage;
