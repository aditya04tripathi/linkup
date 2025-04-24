import React from "react";
import ProfileCard from "@/components/ProfileCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { MOCK_USERS } from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Friends = () => {
	return (
		<div className="w-full">
			<div className="w-full flex flex-col gap-5 mb-5">
				<div className="flex w-full items-center justify-center">
					<h1 className="w-full">Your Friends</h1>
					<Link className="w-fit" href="/friends/find">
						<Button className="">
							<Plus />
							Add Friends
						</Button>
					</Link>
				</div>

				<div className="relative w-full">
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
						size={18}
					/>
					<Input placeholder="Search for your friends..." className="pl-10" />
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{MOCK_USERS.map((profile) => (
					<ProfileCard isFriend={true} key={profile.id} profile={profile} />
				))}
			</div>
		</div>
	);
};

export default Friends;
