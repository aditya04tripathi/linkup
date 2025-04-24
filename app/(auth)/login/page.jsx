import LoginForm from "@/components/LoginForm";
import React from "react";

const LoginPage = () => {
	return (
		<>
			<h1>Welcome to LinkUp</h1>
			<p className="text-muted-foreground text-center">
				Enter your credentials to sign in to your account 🚀
			</p>
			<LoginForm />
		</>
	);
};

export default LoginPage;
