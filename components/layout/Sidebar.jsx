"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
	Home,
	Users,
	Calendar,
	MessageSquare,
	Bell,
	Settings,
	LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";

export const AppSidebar = () => {
	const { user, logout } = useAuth();
	const pathname = usePathname();

	const navItems = [
		{ href: "/", icon: Home, label: "Home" },
		{ href: "/community", icon: Users, label: "Community" },
		{ href: "/activities", icon: Calendar, label: "Activities" },
		{ href: "/messages", icon: MessageSquare, label: "Messages" },
		{ href: "/notifications", icon: Bell, label: "Notifications" },
		{ href: "/settings", icon: Settings, label: "Settings" },
	];

	const isActive = (path) => pathname === path;

	return (
		<Sidebar>
			<SidebarHeader className="p-4">
				<div className="flex items-center">
					<span className="text-xl font-bold">LinkUp</span>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarMenu>
					{navItems.map((item) => (
						<SidebarMenuItem key={item.href}>
							<Link href={item.href} passHref legacyBehavior>
								<SidebarMenuButton asChild isActive={isActive(item.href)}>
									<a>
										<item.icon className="mr-2" size={18} />
										{item.label}
									</a>
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter className="p-4">
				{user ? (
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
								{user.name?.charAt(0)}
							</div>
							<div>
								<p className="text-sm font-medium">{user.name}</p>
								<p className="text-xs text-muted-foreground">{user.email}</p>
							</div>
						</div>
						<Button
							variant="outline"
							className="w-full justify-start"
							onClick={() => logout()}
						>
							<LogOut className="mr-2" size={16} />
							Sign out
						</Button>
					</div>
				) : (
					<div className="space-y-2">
						<Link href="/login" passHref legacyBehavior>
							<Button asChild variant="default" className="w-full">
								<a>Sign in</a>
							</Button>
						</Link>
						<Link href="/register" passHref legacyBehavior>
							<Button asChild variant="outline" className="w-full">
								<a>Sign up</a>
							</Button>
						</Link>
					</div>
				)}
			</SidebarFooter>
		</Sidebar>
	);
};
