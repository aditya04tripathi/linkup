"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Edit2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const academicInterests = [
	"Computer Science",
	"Engineering",
	"Mathematics",
	"Physics",
	"Chemistry",
	"Biology",
	"Psychology",
	"Sociology",
	"Economics",
	"Business",
	"Art",
	"Music",
	"Literature",
	"History",
	"Philosophy",
	"Political Science",
	"Medicine",
	"Law",
	"Education",
	"Communications",
];

const hobbiesList = [
	"Reading",
	"Writing",
	"Photography",
	"Painting",
	"Drawing",
	"Hiking",
	"Running",
	"Swimming",
	"Cycling",
	"Yoga",
	"Meditation",
	"Cooking",
	"Baking",
	"Gardening",
	"Music",
	"Gaming",
	"Movies",
	"Sports",
	"Travel",
	"Volunteering",
];

export default function Profile() {
	const [academicInterest, setAcademicInterest] = useState("");
	const [hobbies, setHobbies] = useState("");
	const router = useRouter();

	return (
		<div className="p-5">
			<h1>Welcome, John Doe!</h1>
			<div className="relative flex flex-col items-center gap-5 border rounded-lg mt-5 p-10">
				<EditPersonalDetailsSheet />
				<Image
					src="https://picsum.photos/500"
					alt="User"
					height={500}
					width={500}
					className="rounded-full w-32 h-32 object-cover"
				/>
				<div className="flex flex-col items-center justify-center">
					<h1>John Doe</h1>
					<p className="text-sm text-muted-foreground">john@doe.com</p>
				</div>

				<div className="border h-8 flex items-center justify-center px-5 rounded-lg">
					✨ 25 engagement points ✨
				</div>
			</div>

			<div className="mt-10 relative flex flex-col gap-5 border rounded-lg p-10">
				<div className="flex justify-between items-center w-full">
					<h1>Personality Profile</h1>
					<EditPersonalityProfile />
				</div>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Extroversion Level</h3>
					<Slider value={[57]} />
					<div className="w-full flex flex-1 items-center justify-between text-muted-foreground">
						<div>Introvert</div>
						<div>Extrovert</div>
					</div>
				</div>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Energy Level</h3>
					<Slider value={[87]} />
					<div className="w-full flex flex-1 items-center justify-between text-muted-foreground">
						<div>Low Energy</div>
						<div>High Energy</div>
					</div>
				</div>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Preferred Group Size (3-5)</h3>
					<Slider value={[3, 5]} max={10} />
					<div className="w-full flex flex-1 items-center justify-between text-muted-foreground">
						<div>0</div>
						<div>10</div>
					</div>
				</div>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Academic Interests</h3>
					<div className="flex-wrap flex gap-2">
						{academicInterests.map((interest, idx) => (
							<Badge key={idx}>{interest}</Badge>
						))}
					</div>
				</div>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Hobbies</h3>
					<div className="flex-wrap flex gap-2">
						{hobbiesList.map((interest, idx) => (
							<Badge key={idx}>{interest}</Badge>
						))}
					</div>
				</div>

				<div className="flex w-full items-stretch flex-col gap-2">
					<h3>Accomodations</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Exercitationem minima iure autem itaque sit rerum odio doloremque
						similique unde pariatur aliquid minus adipisci nulla saepe explicabo
						porro excepturi earum fuga officia illo, vitae et consectetur
						perspiciatis quaerat. Vel labore fugit quae beatae temporibus quis
						expedita veniam quos, placeat natus excepturi.
					</p>
				</div>
			</div>
		</div>
	);
}

const EditPersonalityProfile = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button className={"size-10"}>
					<Edit2 size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className={"flex justify-center"}>
					<DialogTitle>Edit Personality Profiles</DialogTitle>
				</DialogHeader>

				<ScrollArea className={"w-full h-[calc(100vh-20rem)]"}>
					<div className="flex flex-col gap-2.5 my-2.5">
						<div className="flex w-full items-stretch flex-col gap-2">
							<h3>Extroversion Level</h3>
							<Slider defaultValue={[57]} />
							<div className="w-full flex flex-1 items-center justify-between text-muted-foreground">
								<div>Introvert</div>
								<div>Extrovert</div>
							</div>
						</div>

						<div className="flex w-full items-stretch flex-col gap-2">
							<h3>Energy Level</h3>
							<Slider defaultValue={[87]} />
							<div className="w-full flex flex-1 items-center justify-between text-muted-foreground">
								<div>Low Energy</div>
								<div>High Energy</div>
							</div>
						</div>

						<div className="flex w-full items-stretch flex-col gap-2">
							<h3>Preferred Group Size (3-5)</h3>
							<Slider defaultValue={[3, 5]} max={10} />
							<div className="w-full flex flex-1 items-center justify-between text-muted-foreground">
								<div>0</div>
								<div>10</div>
							</div>
						</div>

						<div className="flex w-full items-stretch flex-col gap-2">
							<h3>Academic Interests</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-wrap">
								{academicInterests.map((interest, idx) => (
									<div key={idx} className="flex items-center space-x-2">
										<Checkbox id={interest} />
										<label
											htmlFor={interest}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{interest}
										</label>
									</div>
								))}
							</div>
						</div>

						<div className="flex w-full items-stretch flex-col gap-2">
							<h3>Hobbies</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-wrap">
								{hobbiesList.map((hobby, idx) => (
									<div key={idx} className="flex items-center space-x-2">
										<Checkbox id={hobby} />
										<label
											htmlFor={hobby}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{hobby}
										</label>
									</div>
								))}
							</div>
						</div>

						<div className="flex w-full items-stretch flex-col gap-2">
							<h3>Accomodations</h3>
							<Textarea
								rows={5}
								value={
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem minima iure autem itaque sit rerum odio doloremque similique unde pariatur aliquid minus adipisci nulla saepe explicabo porro excepturi earum fuga officia illo, vitae et consectetur perspiciatis quaerat. Vel labore fugit quae beatae temporibus quis expedita veniam quos, placeat natus excepturi."
								}
							/>
						</div>
					</div>
				</ScrollArea>

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
