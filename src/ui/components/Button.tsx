import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
	isLoading?: boolean;
	variant?: "danger" | "ghost";
}

export function Button({
	className,
	disabled,
	isLoading,
	children,
	variant,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			disabled={disabled || isLoading}
			className={cn(
				"bg-[#087F5B] hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white flex items-center justify-center ",
				variant === "danger" && " bg-red-900 hover:bg-red-800",
        variant === "ghost" && " bg-transparent border border-gray-800  text-gray-800 hover:bg-gray-100",
				className,
			)}
		>
			{!isLoading && children}
			{isLoading && <Spinner className="mr-2" />}
		</button>
	);
}
