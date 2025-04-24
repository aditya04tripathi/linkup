import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { academicInterests, hobbiesList } from "@/lib/utils";
import EditPersonalityProfile from "@/components/EditPersonalityTraits";
import EditPersonalDetailsSheet from "@/components/EditProfileDetails";
import ProfileSlider from "@/components/ProfileSlider";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";

export default function Profile() {
	return (
		<div>
			<div className="w-full flex justify-between items-center">
				<h1>Welcome, John Doe!</h1>
				<Link href="/notifications">
					<Button>
						<Bell />
					</Button>
				</Link>
			</div>
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

				<ProfileSlider
					title="Extroversion Level"
					value={57}
					leftLabel="Introvert"
					rightLabel="Extrovert"
				/>

				<ProfileSlider
					title="Energy Level"
					value={87}
					leftLabel="Low Energy"
					rightLabel="High Energy"
				/>

				<ProfileSlider
					title="Preferred Group Size (3-5)"
					value={[3, 5]}
					min={0}
					max={10}
					leftLabel="0"
					rightLabel="10"
					range
				/>

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
