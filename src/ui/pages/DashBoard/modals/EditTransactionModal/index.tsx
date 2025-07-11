import { Controller } from "react-hook-form";
import type { Transaction } from "../../../../../app/entities/Transactions";
import { Button } from "../../../../components/Button";
import { ConfirmDelete } from "../../../../components/ConfirmDelete";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { TrashIcon } from "@radix-ui/react-icons";


interface EditTransactionModalProps {

  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function EditTransactionModal({transaction,open,onClose}:EditTransactionModalProps) {
	const {

		control,
		register,
		handleSubmit,
		errors,
		accounts,
		categories,
		isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    handleOpenDeleteModal
	} = useEditTransactionModalController(transaction,onClose);

	const isExpense = transaction?.type === "EXPENSE";



  if (isDeleteModalOpen) {
      return (
        <ConfirmDelete
          title={`Tem certeza que deseja excluir a ${isExpense ? "despesa" : "receita"}?`}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteTransaction}
          isLoading={isLoadingDelete}
        />
      );
    }

	return (
		<Modal
			open={open}
			title={isExpense ? "Editar despesa" : "Editar receita"}
			onClose={onClose}
      rightAction={(
        <button type="button" onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 w-6 h-6" />
        </button>
      )}
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
					Salvar
				</Button>
			</form>
		</Modal>
	);
}
