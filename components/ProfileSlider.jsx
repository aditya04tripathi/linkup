"use client";
import { Slider } from "@/components/ui/slider";

const ProfileSlider = ({
	title,
	value,
	min = 0,
	max = 100,
	leftLabel,
	rightLabel,
	range = false,
}) => {
	return (
		<div className="flex w-full items-stretch flex-col gap-2">
			<h3>{title}</h3>
			<Slider value={range ? value : [value]} min={min} max={max} />
			<div className="w-full flex flex-1 items-center justify-between text-muted-foreground">
				<div>{leftLabel}</div>
				<div>{rightLabel}</div>
			</div>
		</div>
	);
};

export default ProfileSlider;
