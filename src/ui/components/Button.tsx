import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
	isLoading?: boolean;
}

export function Button({
	className,
	disabled,
	isLoading,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			disabled={disabled || isLoading}
			className={cn(
				"bg-[#087F5B] hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white flex items-center justify-center ",
				className,
			)}
		>
			{!isLoading && children}
			{isLoading && <Spinner className="mr-2" />}
		</button>
	);
}
