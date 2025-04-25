"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";
import { Menu, Moon, Sun, X } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
	const { user, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const [sheetOpen, setSheetOpen] = useState(false);
	const router = useRouter();

	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "Friends", href: "/friends" },
		{ name: "Activities", href: "/activities" },
		{ name: "Notifications", href: "/notifications" },
	];

	return (
		<nav className="border-b">
			<div className="flex h-16 items-center px-4 container mx-auto">
				{/* Mobile menu trigger */}
				<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
					<SheetTrigger asChild className="md:hidden">
						<Button variant="ghost" size="icon" className="mr-2">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-[240px] sm:w-[300px]">
						<SheetHeader>
							<SheetTitle>MACathon</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col gap-4 py-4">
							{navItems.map((item) => (
								<SheetClose asChild key={item.name}>
									<Link
										href={item.href}
										className="px-2 py-1 text-lg hover:underline"
										onClick={() => setSheetOpen(false)}
									>
										{item.name}
									</Link>
								</SheetClose>
							))}
						</div>
					</SheetContent>
				</Sheet>

				{/* Logo */}
				<Link href="/" className="font-bold text-xl md:mr-6">
					MACathon
				</Link>

				{/* Desktop navigation */}
				<div className="hidden md:flex items-center space-x-6 mx-auto">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="text-sm font-medium hover:text-primary"
						>
							{item.name}
						</Link>
					))}
				</div>

				{/* Right side controls */}
				<div className="ml-auto flex items-center space-x-4">
					<Button
						variant={"outline"}
						className={"size-10 rounded-full"}
						onClick={toggleTheme}
					>
						{theme === "dark" ? <Moon /> : <Sun />}
					</Button>

					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-10 w-10 rounded-full"
								>
									<Avatar className="h-10 w-10">
										<AvatarImage
											src={user.avatar || "/avatars/01.png"}
											alt={user.name}
										/>
										<AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">
											{user.name}
										</p>
										<p className="text-xs leading-none text-muted-foreground">
											{user.email}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => {
										router.push("/profile");
									}}
								>
									<span className="">Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={logout}>
									<span className="text-destructive">Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className="flex gap-2">
							<Button asChild variant="ghost" className="hidden sm:flex">
								<Link href="/login">Login</Link>
							</Button>
							<Button asChild>
								<Link href="/signup">Sign Up</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};
