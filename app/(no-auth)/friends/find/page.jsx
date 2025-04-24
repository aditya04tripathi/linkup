import React from "react";
import ProfileCard from "@/components/ProfileCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { MOCK_USERS } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const FindFriends = () => {
	return (
		<div className="w-full">
			<Link className="flex items-center gap-2 mb-5" href="/friends">
				<ChevronLeft className="mr-2" size={16} />
				Back to Friends
			</Link>
			<div className="w-full flex flex-col gap-5 mb-5">
				<h1>Find Friends</h1>

				<div className="relative w-full">
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
						size={18}
					/>
					<Input placeholder="Search for friends..." className="pl-10" />
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{MOCK_USERS.map((profile) => (
					<ProfileCard isFriend={false} key={profile.id} profile={profile} />
				))}
			</div>
		</div>
	);
};

export default FindFriends;
