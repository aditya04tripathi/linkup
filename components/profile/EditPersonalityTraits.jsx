import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { Edit2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { academicInterests, hobbiesList } from "@/lib/utils";

export const EditPersonalityProfile = () => {
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
							<Slider defaultValue={[5]} min={5} max={5} />
							<div className="w-full flex flex-1 items-center justify-between text-muted-foreground">
								<div>Introvert</div>
								<div>Extrovert</div>
							</div>
						</div>

						<div className="flex w-full items-stretch flex-col gap-2">
							<h3>Energy Level</h3>
							<Slider defaultValue={[5]} min={0} max={10} />
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
