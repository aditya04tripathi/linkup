"use client";

import React from "react";
import ProfileCard from "@/components/ProfileCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Friends = () => {
	const [users, setUsers] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(null);

	const fetchUsers = async () => {
		const { data } = await axios.get("/api/users?limit=10");

		if (data.ok) {
			setUsers(data.message);
			setLoading(false);
			return;
		} else {
			setError(data.message);
			setLoading(false);
			return;
		}
	};

	React.useEffect(() => {
		fetchUsers();
	}, []);

	return loading ? (
		<div>loading...</div>
	) : (
		<div className="w-full">
			<div className="flex flex-col w-full gap-5 mb-5">
				<div className="flex items-center justify-center w-full">
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
						className="absolute transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
						size={18}
					/>
					<Input placeholder="Search for your friends..." className="pl-10" />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
				{users.map((profile) => (
					<ProfileCard isFriend={true} key={profile._id} profile={profile} />
				))}
			</div>
		</div>
	);
};

export default Friends;
