import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

export const metadata = {
	title: "Linkup | MACathon 2025",
	description: "Turning Digital Connection into Real-World Belonging",
};

export default function RootLayout({ children }) {
	return (
		<html
			suppressContentEditableWarning={true}
			suppressHydrationWarning={true}
			lang="en"
		>
			<body
				className={`${montserrat.variable} dark antialiased bg-background text-foreground`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
