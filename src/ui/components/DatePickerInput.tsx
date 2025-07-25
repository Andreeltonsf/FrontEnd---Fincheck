import { CrossCircledIcon } from "@radix-ui/react-icons";

import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { DatePicker } from "./DatePicker";
import { Popover } from "./Popover";

interface DatePickerInputProps {
	className?: string;
	error?: string;
	value?: Date;
	onChange?: (date: Date) => void;
}

export function DatePickerInput({
	className,
	error,
	value,
	onChange,
}: DatePickerInputProps) {
	const [selectedDate, setSelectedDate] = useState(value ?? new Date());

	function handleDateChange(date: Date) {
		setSelectedDate(date);
		onChange?.(date);
	}
	return (
		<div>
			<Popover.Root>
				<Popover.Trigger>
					<button
						type="button"
						className={cn(
							"bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700   focus:border-gray-800 transition-all outline-none text-left relative pt-4 ",
							error && "border-red-900",
							className,
						)}
					>
						<span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none ">
							Data
						</span>
						<span>{formatDate(selectedDate)}</span>
					</button>
				</Popover.Trigger>

				<Popover.Content className="z-[200] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-[352px] ">
					<DatePicker value={selectedDate} onChange={handleDateChange} />
				</Popover.Content>
			</Popover.Root>
			{error && (
				<div className="flex  items-center gap-2 mt-2 text-red-900">
					<CrossCircledIcon />
					<span className="text-xs">{error}</span>
				</div>
			)}
		</div>
	);
}
