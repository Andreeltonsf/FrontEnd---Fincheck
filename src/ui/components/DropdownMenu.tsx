import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

export function DropdownMenuRoot({ children }: { children: React.ReactNode }) {
	return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}

export function DropdownMenuTrigger({
	children,
}: { children: React.ReactNode }) {
	return <RdxDropdownMenu.Trigger>{children}</RdxDropdownMenu.Trigger>;
}

interface DropdownMenuContentProps {
	children: React.ReactNode;
	className?: string;
}

function DropdownMenuContent({
	children,
	className,
}: DropdownMenuContentProps) {
	return (
		<RdxDropdownMenu.Portal>
			<RdxDropdownMenu.Content

				className={cn(
					"rounded-2xl p-4 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,_0,_0,_0.10)] data-[side=bottom]:animate-slide-down-and-fade z-100 ",
					className,
				)}
			>
				{children}
			</RdxDropdownMenu.Content>
		</RdxDropdownMenu.Portal>
	);
}

interface DropdownMenuItemProps {
	children: React.ReactNode;
	className?: string;
  onSelect?: () => void;
}

function DropdownMenuItem({ children, className, onSelect }: DropdownMenuItemProps) {
	return (
		<RdxDropdownMenu.Item
	    onSelect={onSelect}
			className={cn(
				"min-h-[48px] outline-none flex items-center p-2 text-gray-800 text-sm data-[highlighted]:bg-gray-100 rounded-2xl transition-colors cursor-pointer",
				className,
			)}
		>
			{children}
		</RdxDropdownMenu.Item>
	);
}

export const DropdownMenu = {
	Root: DropdownMenuRoot,
	Trigger: DropdownMenuTrigger,
	Content: DropdownMenuContent,
	Item: DropdownMenuItem,
};
