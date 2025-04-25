import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import Image from "next/image";

export const EditPersonalDetailsSheet = ({ initialUserData, onSave }) => {
	const [userData, setUserData] = useState({
		name: initialUserData?.name || "",
		avatar: initialUserData?.avatar || "https://picsum.photos/500",
	});
	const [imageFile, setImageFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImageFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!imageFile) return;

		// Implement file upload logic here
		// This is a placeholder for where you would upload the image
		setIsLoading(true);
		try {
			// Simulating a file upload
			const imageUrl = URL.createObjectURL(imageFile);
			setUserData((prev) => ({
				...prev,
				avatar: imageUrl,
			}));
		} catch (error) {
			console.error("Failed to upload image:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = () => {
		if (onSave) {
			onSave(userData);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className={""}>
					<Edit2 size={20} />
					Edit Profile
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle>Edit Personal Details</DialogTitle>
				</DialogHeader>
				<div className="h-full flex flex-col gap-2.5 my-2.5">
					<div className="w-full flex gap-2.5">
						<Image
							src={userData.avatar}
							alt="User"
							height={500}
							width={500}
							className="flex-[0.6] rounded-full object-cover w-32 h-32"
						/>
						<div className="flex gap-2.5 flex-col items-center justify-center">
							<Input type="file" onChange={handleFileChange} accept="image/*" />
							<Button
								className="w-full"
								onClick={handleUpload}
								disabled={!imageFile || isLoading}
							>
								{isLoading ? "Uploading..." : "Upload"}
							</Button>
						</div>
					</div>
					<Label className="flex flex-col items-start w-full gap-2">
						Name:
						<Input
							name="name"
							value={userData.name}
							onChange={handleInputChange}
						/>
					</Label>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSave}>
						Save
					</Button>
					<DialogClose>
						<Button variant="outline">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
