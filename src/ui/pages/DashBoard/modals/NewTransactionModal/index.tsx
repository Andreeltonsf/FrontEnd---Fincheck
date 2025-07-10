import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
	const {
		closeNewTransactionModal,
		isNewTransactionModalOpen,
		newTransactionType,
		control,
		register,
		handleSubmit,
		errors,
		accounts,
		categories,
		isLoading,
	} = useNewTransactionModalController();

	const isExpense = newTransactionType === "EXPENSE";

	return (
		<Modal
			open={isNewTransactionModalOpen}
			title={isExpense ? "Nova despesa" : "Nova receita"}
			onClose={closeNewTransactionModal}
		>
			<form onSubmit={handleSubmit}>
				<div className="flex  flex-col mt-2">
					<span className="text-gray-600 tracking-[-0.5px] text-xs">
						Valor {isExpense ? "da despesa" : "da receita"}
					</span>
					<div className="flex items-center gap-2 ">
						<span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
						<Controller
							control={control}
							name="value"
							render={({ field: { onChange, value } }) => (
								<InputCurrency
									error={errors.value?.message}
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
						{...register("name")}
						error={errors.name?.message}
						placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
					/>

					<Controller
						control={control}
						name="categoryId"
						render={({ field: { onChange, value } }) => (
							<Select
								placeholder="Categoria"
								onChange={onChange}
								value={value}
								error={errors.categoryId?.message}
								options={categories.map((category) => ({
									value: category.id,
									label: category.name,
								}))}
							/>
						)}
					/>

					<Controller
						control={control}
						name="bankAccountId"
						render={({ field: { onChange, value } }) => (
							<Select
								placeholder={isExpense ? "Pagar com" : "Receber com"}
								onChange={onChange}
								value={value}
								error={errors.bankAccountId?.message}
								options={accounts.map((account) => ({
									value: account.id,
									label: account.name,
								}))}
							/>
						)}
					/>
					<Controller
						control={control}
						name="date"
						defaultValue={new Date()}
						render={({ field: { value, onChange } }) => (
							<DatePickerInput
								error={errors.date?.message}
								value={value}
								onChange={onChange}
							/>
						)}
					/>
				</div>
				<Button className="w-full mt-6" isLoading={isLoading}>
					Criar
				</Button>
			</form>
		</Modal>
	);
}
