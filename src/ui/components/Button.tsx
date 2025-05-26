import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
	isLoading?: boolean;
}

export function Button({
	className,
	disabled,
	isLoading,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			disabled={disabled || isLoading}
			className={cn(
				"bg-teal-900 hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white ",
				className,
			)}
		/>
	);
}
