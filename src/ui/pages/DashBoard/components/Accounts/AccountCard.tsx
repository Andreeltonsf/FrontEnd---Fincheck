import type { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../DashBoardContext/useDashboard";

interface AccountCardProps {
	data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
	const { areValuesVisible, openEditAccountModal } = useDashboard();

	const { name, type, currentBalance, color } = data;
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
			type="button"
			className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 text-left"
			style={{ borderColor: color }}
			onClick={() => openEditAccountModal(data)}
		>
			<div>
				<BankAccountTypeIcon type={type} />
				<span
					className="text-gray-800 tracking-[-0.5px] mt-4 block"
				>
					{name}
				</span>
			</div>

			<div className="">
				<span
					className={cn("text-gray-800 tracking-[-0.5px] block", !areValuesVisible && "blur-sm")}
				>
					{formatCurrency(currentBalance)}
				</span>
				<small className="text-gray-600 text-sm">Saldo atual</small>
			</div>
		</div>
	)
}
