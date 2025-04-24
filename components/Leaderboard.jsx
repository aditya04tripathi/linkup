import { cn } from "@/lib/utils";
import { Medal, Trophy, User, Star } from "lucide-react";
import Link from "next/link";

const Leaderboard = ({ className, users, title = "Top Users" }) => {
	// Sort users by score in descending order
	const sortedUsers = [...users].sort((a, b) => b.score - a.score);

	// Apply rankings
	const rankedUsers = sortedUsers.map((user, index) => ({
		...user,
		rank: index + 1,
	}));

	const getRankIcon = (rank) => {
		switch (rank) {
			case 1:
				return <Trophy className="h-5 w-5 text-yellow-500" />;
			case 2:
				return <Medal className="h-5 w-5 text-gray-400" />;
			case 3:
				return <Medal className="h-5 w-5 text-amber-600" />;
			default:
				return <span className="text-sm font-medium">{rank}</span>;
		}
	};

	return (
		<div className={cn("w-full border rounded-lg overflow-hidden", className)}>
			<div className="bg-muted/50 p-4 border-b">
				<h2 className="font-medium text-lg flex items-center gap-2">
					<Trophy className="h-5 w-5 text-primary" />
					{title}
				</h2>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-muted/30">
						<tr>
							<th className="px-4 py-3 text-left font-medium text-muted-foreground text-sm w-16">
								Rank
							</th>
							<th className="px-4 py-3 text-left font-medium text-muted-foreground text-sm">
								User
							</th>
							<th className="px-4 py-3 text-left font-medium text-muted-foreground text-sm">
								Score
							</th>
						</tr>
					</thead>
					<tbody>
						{rankedUsers.map((user) => (
							<tr
								key={user.id}
								className={cn(
									"border-b last:border-0 hover:bg-muted/20 transition-colors",
									user.rank <= 3 ? "bg-muted/10" : ""
								)}
							>
								<td className="px-4 py-3">
									<div className="flex items-center gap-1">
										{getRankIcon(user.rank)}
									</div>
								</td>
								<td className="px-4 py-3">
									<Link
										href={`/user/${user.id}`}
										className="flex items-center gap-3 hover:underline"
									>
										<div className="size-8 rounded-full bg-muted overflow-hidden">
											{user.avatar ? (
												<img
													src={user.avatar}
													alt={user.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center bg-primary/10">
													<User size={16} />
												</div>
											)}
										</div>
										<span className="font-medium">{user.name}</span>
									</Link>
								</td>
								<td className="px-4 py-3">
									<span className="font-medium">{user.score}</span>
									<span className="text-xs text-muted-foreground ml-1">
										pts
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{rankedUsers.length === 0 && (
				<div className="p-8 text-center text-muted-foreground">
					<p>No users to display</p>
				</div>
			)}
		</div>
	);
};

export default Leaderboard;
