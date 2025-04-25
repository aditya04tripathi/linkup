import Image from "next/image";
import React from "react";

export const AuthLayout = ({ children }) => {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="h-[80%] w-[80%] grid grid-cols-1 md:grid-cols-2 border rounded overflow-clip">
				{/* This isn't a profile picture, so we'll keep using Image */}
				<Image
					src="https://picsum.photos/1080"
					alt="Background"
					width={1080}
					height={1080}
					className="hidden md:block w-full h-full object-cover"
				/>
				<div className="flex flex-col items-center justify-center p-5">
					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
