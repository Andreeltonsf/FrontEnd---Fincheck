import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
	const {
		isNewAccountModalOpen,
		closeNewAccountModal,
		errors,
		register,
		handleSubmit,
		control,
		isLoading,
	} = useNewAccountModalController();
	return (
		<Modal
			open={isNewAccountModalOpen}
			title="Nova conta"
			onClose={closeNewAccountModal}
		>
			<form onSubmit={handleSubmit}>
				<div className="flex  flex-col">
					<span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
					<div className="flex items-center gap-2 ">
						<span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
						<Controller
							control={control}
							name="initialBalance"
							render={({ field: { onChange, value } }) => (
								<InputCurrency
									error={errors.initialBalance?.message}
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-4">
					<Input
						type="text"
						placeholder="Nome da conta"
						error={errors.name?.message}
						{...register("name")}
					/>

					<Controller
						control={control}
						name="type"
						defaultValue="CASH"
						render={({ field: { onChange, value } }) => (
							<Select
								placeholder="Tipo de conta"
								onChange={onChange}
								value={value}
								error={errors.type?.message}
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
						)}
					/>

					<Controller
						control={control}
						name="color"
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<ColorsDropdownInput
								error={errors.color?.message}
								onChange={onChange}
								value={value}
							/>
						)}
					/>
					<Button type="submit" className="w-full mt-6" isLoading={isLoading}>
						Criar
					</Button>
				</div>
			</form>
		</Modal>
	);
}
