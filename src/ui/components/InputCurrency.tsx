import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";

interface InputCurrencyProps {
	error?: string;
	value?: string | number;
	onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
	return (
		<div>
			<NumericFormat
				onChange={(event) => onChange?.(event.target.value)}
				thousandSeparator="."
				decimalSeparator=","
        defaultValue='0'
				value={value}
				className="w-full text-[32px] font-bold tracking-[-1px] outline-none"
			/>

			{error && (
				<div className="flex  items-center gap-2 mt-1 text-red-900">
					<CrossCircledIcon />
					<span className="text-xs">{error}</span>
				</div>
			)}
		</div>
	);
}
