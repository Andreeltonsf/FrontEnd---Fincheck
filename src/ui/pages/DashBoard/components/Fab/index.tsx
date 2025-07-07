import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { Expense } from "../../../../components/icons/categories/expense/Expense";
import { Income } from "../../../../components/icons/categories/income/Income";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function Fab() {
	const { openNewAccountModal, openNewTransactionModal } = useDashboard();
	return (
		<div className="fixed right-4 bottom-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button
						type="button"
						className=" bg-[#087F5B] w-12 h-12 rounded-full flex items-center justify-center"
					>
						<PlusIcon className="w-6 h-6 text-white" />
					</button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content>
					<DropdownMenu.Item
						className=" gap-2"
						onSelect={() => openNewTransactionModal("EXPENSE")}
					>
						<Expense />
						Nova despesa
					</DropdownMenu.Item>
					<DropdownMenu.Item
						className=" gap-2"
						onSelect={() => openNewTransactionModal("INCOME")}
					>
						<Income />
						Nova receita
					</DropdownMenu.Item>
					<DropdownMenu.Item className=" gap-2" onSelect={openNewAccountModal}>
						<BankAccountIcon />
						Nova conta
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
}
