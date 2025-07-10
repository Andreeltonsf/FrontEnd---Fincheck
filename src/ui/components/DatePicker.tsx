import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { ClassNames } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import { capitalizeFirstLetter } from "../../app/utils/capitalizeFirstLetter";

const Classnames: Partial<ClassNames> = {
	day: "w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
	button_next:
		"w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
	button_previous:
		"w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
};
interface DatePickerProps {
	value: Date;
	onChange(date: Date): void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
	return (
		<DayPicker
			animate
			locale={ptBR}
			mode="single"
			navLayout="after"
			selected={value}
			onSelect={(date) => onChange(date ?? new Date())}
			classNames={Classnames}
			formatters={{
				formatCaption: (date, options) =>
					capitalizeFirstLetter(format(date, "LLLL yyyy", options)),
			}}
		/>
	);
}
