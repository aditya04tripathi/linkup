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

const EditPersonalDetailsSheet = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className={"absolute top-5 right-5 size-10"}>
					<Edit2 size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle>Edit Personal Details</DialogTitle>
				</DialogHeader>
				<div className="h-full flex flex-col gap-2.5 my-2.5">
					<div className="w-full flex gap-2.5">
						<Image
							src="https://picsum.photos/500"
							alt="User"
							height={500}
							width={500}
							className="flex-[0.6] rounded-full"
						/>
						<div className="flex gap-2.5 flex-col items-center justify-center">
							<Input type={"file"} />
							<Button className={"w-full"}>Upload</Button>
						</div>
					</div>
					<Label className={"flex flex-col items-start w-full gap-2"}>
						Name:
						<Input value={"John Doe"} />
					</Label>
				</div>
				<DialogFooter>
					<Button type="submit">Save</Button>
					<DialogClose>
						<Button variant="outline">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditPersonalDetailsSheet;
