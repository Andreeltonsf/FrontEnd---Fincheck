import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import * as RdxSelect from "@radix-ui/react-select";
import { useState } from "react";
import { cn } from "../../app/utils/cn";

interface SelectProps {
	className?: string;
	error?: string;
	placeholder?: string;
  options:{
    value: string;
    label: string;
  }[]

  onChange?(value: string): void;
  value?: string;
}

export function Select({ className, error, placeholder , options, onChange, value }: SelectProps) {
	const [selectedValue, setSelectValue] = useState(value ?? "");

	function handleValueChange(value: string) {
		setSelectValue(value);
    onChange?.(value);
	}
	return (
		<div>
			<div className="relative">
				{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
				<label
					className={cn(
						"absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none",
						selectedValue &&
							"text-xs left-[13px] top-2  transition-all translate-y-0",
					)}
				>
					{placeholder}
				</label>
				<RdxSelect.Root value={value} onValueChange={handleValueChange} >
					<RdxSelect.Trigger
						className={cn(
							"bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800   focus:border-gray-800 transition-all outline-none text-left relative pt-4 ",
							error && "border-red-900",
							className,
						)}
					>
						<RdxSelect.Value />
						<RdxSelect.Icon className="absolute right-3 top-3">
							<ChevronDownIcon className="w-6 h-6 text-gray-800" />
						</RdxSelect.Icon>
					</RdxSelect.Trigger>
					<RdxSelect.Content
						className="z-[200] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-[352px] "
						position="popper"
					>
						<RdxSelect.Viewport className="p-2">
						{options.map((option) => (
              <RdxSelect.Item key={option.value} value={option.value} className="p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-100 rounded-lg transition-colors">
                <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>

              </RdxSelect.Item>
            ))}


						</RdxSelect.Viewport>
					</RdxSelect.Content>
				</RdxSelect.Root>
			</div>

			{error && (
				<div className="flex  items-center gap-2 mt-2 text-red-900">
					<CrossCircledIcon />
					<span className="text-xs">{error}</span>
				</div>
			)}
		</div>
	);
}
