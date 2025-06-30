import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
	const { isNewAccountModalOpen, closeNewAccountModal } =
		useNewAccountModalController();
	return (
		<Modal
			open={isNewAccountModalOpen}
			title="Nova conta"
			onClose={closeNewAccountModal}
		>
			<form>
				<div className="flex  flex-col">
					<span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
					<div className="flex items-center gap-2 ">
						<span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
						<InputCurrency />
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-4">
					<Input type="text" name="name" placeholder="Nome da conta" />

					<Select
						placeholder="Tipo de conta"
						options={[
							{
								value: "INVESTMENT",
								label: "Investimento",
							},
							{
								value: "CASH",
								label: "Dinheiro Físico",
							},
							{
								value: "CHECKING",
								label: "Conta Corrente",
							},
						]}
					/>
				</div>
			</form>
		</Modal>
	);
}
