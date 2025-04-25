import { cn } from "@/lib/utils";
import { Medal, Trophy, User, Star } from "lucide-react";
import Link from "next/link";

const Leaderboard = ({ className, users, title = "Top Users" }) => {
	const sortedUsers = [...users].sort((a, b) => b.score - a.score);

	const rankedUsers = sortedUsers.map((user, index) => ({
		...user,
		rank: index + 1,
	}));

	const getRankIcon = (rank) => {
		switch (rank) {
			case 1:
				return <Trophy className="w-5 h-5 text-yellow-500" />;
			case 2:
				return <Medal className="w-5 h-5 text-gray-400" />;
			case 3:
				return <Medal className="w-5 h-5 text-amber-600" />;
			default:
				return <span className="text-sm font-medium">{rank}</span>;
		}
	};

	return (
		<div className={cn("w-full border rounded-lg overflow-hidden", className)}>
			<div className="p-4 border-b bg-muted/50">
				<h2 className="flex items-center gap-2 text-lg font-medium">
					<Trophy className="w-5 h-5 text-primary" />
					{title}
				</h2>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-muted/30">
						<tr>
							<th className="w-16 px-4 py-3 text-sm font-medium text-left text-muted-foreground">
								Rank
							</th>
							<th className="px-4 py-3 text-sm font-medium text-left text-muted-foreground">
								User
							</th>
							<th className="px-4 py-3 text-sm font-medium text-left text-muted-foreground">
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
										href={`/user/${user._id}`}
										className="flex items-center gap-3 hover:underline"
									>
										<div className="overflow-hidden rounded-full size-8 bg-muted">
											{user.avatar ? (
												<img
													src={user.avatar}
													alt={user.name}
													className="object-cover w-full h-full"
												/>
											) : (
												<div className="flex items-center justify-center w-full h-full bg-primary/10">
													<User size={16} />
												</div>
											)}
										</div>
										<span className="font-medium">{user.name}</span>
									</Link>
								</td>
								<td className="px-4 py-3">
									<span className="font-medium">{user.score}</span>
									<span className="ml-1 text-xs text-muted-foreground">
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
