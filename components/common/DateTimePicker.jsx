"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const DateTimePicker = ({ value, onChange }) => {
	const [date, setDate] = React.useState(value ? new Date(value) : new Date());
	const [isOpen, setIsOpen] = React.useState(false);

	// Update internal state when value prop changes
	React.useEffect(() => {
		if (value) {
			setDate(new Date(value));
		}
	}, [value]);

	const hours = Array.from({ length: 12 }, (_, i) => i + 1);

	const handleDateSelect = (selectedDate) => {
		const newDate = new Date(selectedDate);
		// Preserve the time from the current date
		newDate.setHours(date.getHours(), date.getMinutes());
		setDate(newDate);

		// Notify parent component about the change
		if (onChange) {
			onChange(newDate.getTime());
		}
	};

	const handleTimeChange = (type, value) => {
		const newDate = new Date(date);
		if (type === "hour") {
			newDate.setHours(
				(parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
			);
		} else if (type === "minute") {
			newDate.setMinutes(parseInt(value));
		} else if (type === "ampm") {
			const currentHours = newDate.getHours();
			const isPM = currentHours >= 12;

			if (value === "PM" && !isPM) {
				newDate.setHours(currentHours + 12);
			} else if (value === "AM" && isPM) {
				newDate.setHours(currentHours - 12);
			}
		}
		setDate(newDate);

		// Notify parent component about the change
		if (onChange) {
			onChange(newDate.getTime());
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						format(date, "MM/dd/yyyy hh:mm aa")
					) : (
						<span>MM/DD/YYYY hh:mm aa</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<div className="sm:flex">
					<Calendar
						mode="single"
						selected={date}
						onSelect={handleDateSelect}
						initialFocus
					/>
					<div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
						<ScrollArea className="w-64 sm:w-auto">
							<div className="flex sm:flex-col p-2">
								{hours.reverse().map((hour) => (
									<Button
										key={hour}
										size="icon"
										variant={
											date && date.getHours() % 12 === hour % 12
												? "default"
												: "ghost"
										}
										className="sm:w-full shrink-0 aspect-square"
										onClick={() => handleTimeChange("hour", hour.toString())}
									>
										{hour}
									</Button>
								))}
							</div>
							<ScrollBar orientation="horizontal" className="sm:hidden" />
						</ScrollArea>
						<ScrollArea className="w-64 sm:w-auto">
							<div className="flex sm:flex-col p-2">
								{Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
									<Button
										key={minute}
										size="icon"
										variant={
											date && date.getMinutes() === minute ? "default" : "ghost"
										}
										className="sm:w-full shrink-0 aspect-square"
										onClick={() =>
											handleTimeChange("minute", minute.toString())
										}
									>
										{minute}
									</Button>
								))}
							</div>
							<ScrollBar orientation="horizontal" className="sm:hidden" />
						</ScrollArea>
						<ScrollArea className="">
							<div className="flex sm:flex-col p-2">
								{["AM", "PM"].map((ampm) => (
									<Button
										key={ampm}
										size="icon"
										variant={
											date &&
											((ampm === "AM" && date.getHours() < 12) ||
												(ampm === "PM" && date.getHours() >= 12))
												? "default"
												: "ghost"
										}
										className="sm:w-full shrink-0 aspect-square"
										onClick={() => handleTimeChange("ampm", ampm)}
									>
										{ampm}
									</Button>
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
