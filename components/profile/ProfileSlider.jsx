"use client";
import { Slider } from "@/components/ui/slider";

export const ProfileSlider = ({
	title,
	value,
	min,
	max,
	leftLabel,
	rightLabel,
	onChange,
}) => {
	return (
		<div className="w-full">
			<h3 className="mb-2">{title}</h3>
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm text-muted-foreground">{leftLabel}</span>
				<span className="text-sm text-muted-foreground">{rightLabel}</span>
			</div>
			<Slider
				defaultValue={[value]}
				max={max}
				min={min}
				step={1}
				className="mb-2"
				disabled={!onChange}
				onValueChange={onChange ? (val) => onChange(val[0]) : undefined}
			/>
			<div className="w-full flex justify-center">
				<span className="text-lg font-medium">
					{value}/{max}
				</span>
			</div>
		</div>
	);
};
