"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Calendar, Plus, User, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Users } from "lucide-react";
import Link from "next/link";

function ButtonGroup({ isMobile = false }) {
	const router = useRouter();
	const activeRoute = usePathname();

	const isActive = (route) => {
		console.log(route, activeRoute, "route", `activeRoute`);
		return activeRoute === route;
	};

	const buttonClass = (route) =>
		cn(
			"text-sm flex gap-2 items-center",
			isMobile ? "flex-col" : "flex-row",
			isActive(route)
				? "bg-card text-card-foreground"
				: "bg-background text-foreground"
		);

	return (
		<>
			<Button
				onClick={() => router.push("/")}
				variant="ghost"
				className={buttonClass("/")}
			>
				<Home />
				Home
			</Button>
			<Button
				onClick={() => router.push("/activities")}
				variant="ghost"
				className={buttonClass("/activities")}
			>
				<Calendar />
				Activities
			</Button>
			{isMobile && (
				<Button
					onClick={() => router.push("/activities/add")}
					className="bg-muted-foreground text-muted p-2 rounded-full"
				>
					<Plus size={32} />
				</Button>
			)}
			<Button
				onClick={() => router.push("/profile")}
				variant="ghost"
				className={buttonClass("/profile")}
			>
				<User />
				Profile
			</Button>
			<Button
				onClick={() => router.push("/friends")}
				variant="ghost"
				className={buttonClass("/friends")}
			>
				<Users />
				Friends
			</Button>
		</>
	);
}

const Navbar = ({ children }) => {
	const isMobile = useIsMobile();
	const router = useRouter();

	if (isMobile) {
		return (
			<div className="w-full h-screen relative">
				<div className="bg-background fixed top-0 left-0 right-0 h-20 border-b-2 z-10 flex flex-row justify-between items-center px-10 w-full">
					<Link href="/">
						<h1>LinkUp</h1>
					</Link>

					<div className="flex items-center gap-2">
						<Button variant={"secondary"}>
							<Plus />
							Create
						</Button>
						<Avatar>
							<AvatarFallback>JD</AvatarFallback>
							<AvatarImage
								src="https://picsum.photos/100"
								alt="User"
								className="rounded-full w-full h-full"
							/>
						</Avatar>
					</div>
				</div>
				<ScrollArea className="absolute top-20 right-0 left-0 bottom-10 h-[calc(100vh-10rem)]">
					<div className="h-auto mx-auto w-full max-w-3xl p-5">{children}</div>
				</ScrollArea>
				<div className="bg-background fixed bottom-0 left-0 right-0 h-20 border-t-2 z-10 flex flex-row justify-around items-center w-full">
					<ButtonGroup isMobile={isMobile} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="w-full h-screen relative">
				<div className="bg-background fixed top-0 left-0 right-0 h-20 border-b-2 z-10 flex flex-row justify-between px-10 items-center w-full">
					<Link href="/">
						<h1>LinkUp</h1>
					</Link>

					<div className="flex flex-1 justify-center items-center gap-2">
						<ButtonGroup isMobile={isMobile} />
					</div>

					<div className="flex items-center gap-2">
						<Button
							onClick={() => router.push("/activities/add")}
							variant={"secondary"}
						>
							<Plus />
							Create
						</Button>
						<Link href="/profile">
							<Avatar>
								<AvatarFallback>JD</AvatarFallback>
								<AvatarImage
									src="https://picsum.photos/100"
									alt="User"
									className="rounded-full w-full h-full"
								/>
							</Avatar>
						</Link>
					</div>
				</div>
				<ScrollArea className="absolute top-20 right-0 left-0 bottom-0 h-[calc(100vh-5rem)]">
					<div className="w-full h-full max-w-4xl mx-auto p-5">{children}</div>
				</ScrollArea>
			</div>
		);
	}
};

export default Navbar;
