import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../app/hooks/useAuth";
import { DropdownMenu } from "./DropdownMenu";

export function UserMenu() {
	const { signout } = useAuth();
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<div className="bg-teal-100 rounded-full w-12 h-12 items-center justify-center flex">
					<span className="text-sm tracking-[-.5px] text-teal-900 font-medium">
						FF
					</span>
				</div>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content className="w-28 transition-all duration-300 ease-in-out">
				<DropdownMenu.Item
					className="flex items-center justify-between"
					onSelect={signout}
				>
					Sair
					<ExitIcon className="w-4 h-4" />
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
