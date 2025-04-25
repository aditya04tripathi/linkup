"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function UserActions({ userId, isFollowing, isAuthenticated }) {
	const [following, setFollowing] = useState(isFollowing);
	const [loading, setLoading] = useState(false);
	const { followUser, unfollowUser } = useUser();
	const router = useRouter();

	const handleFollowAction = async () => {
		if (!isAuthenticated) {
			router.push("/login?redirect=/user/" + userId);
			return;
		}

		setLoading(true);
		try {
			if (following) {
				await unfollowUser(userId);
				setFollowing(false);
				toast.success("User unfollowed successfully");
			} else {
				await followUser(userId);
				setFollowing(true);
				toast.success("User followed successfully");
			}
		} catch (error) {
			toast.error("Failed to update follow status");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex gap-2 mt-4 md:mt-0">
			<Button onClick={handleFollowAction} disabled={loading}>
				{loading ? (
					<Loader2 size={16} className="mr-2 animate-spin" />
				) : (
					<UserPlus size={16} className="mr-2" />
				)}
				{loading ? "Processing..." : following ? "Unfollow" : "Follow"}
			</Button>

			<Link href={`/message/${userId}`}>
				<Button variant="outline">
					<MessageCircle size={16} className="mr-2" />
					Message
				</Button>
			</Link>
		</div>
	);
}
