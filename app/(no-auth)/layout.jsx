import Navbar from "@/components/Navbar";
import React from "react";

const NoAuthLayout = ({ children }) => {
	return <Navbar>{children}</Navbar>;
};

export default NoAuthLayout;
