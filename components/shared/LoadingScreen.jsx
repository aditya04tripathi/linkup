import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
	return (
		<div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="flex flex-col items-center gap-2">
				<Loader2 className="h-12 w-12 animate-spin text-primary" />
				<p className="text-sm text-muted-foreground">Loading...</p>
			</div>
		</div>
	);
};

export default LoadingScreen;
