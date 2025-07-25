import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashBoardContext/useDashboard";

const schema = z.object({
	initialBalance: z.union([
		z.string().nonempty("Saldo é obrigatório"),
		z.number(),
	]),
	name: z.string().nonempty("Nome da conta é obrigatório"),
	color: z.string().nonempty("Cor  é obrigatório"),
	type: z.enum(["INVESTMENT", "CASH", "CHECKING"]),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
	const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
		useDashboard();

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			color: accountBeingEdited?.color,
			initialBalance: accountBeingEdited?.initialBalance,
			name: accountBeingEdited?.name,
			type: accountBeingEdited?.type,
		},
	});

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const queryClient = useQueryClient();
	const { isLoading, mutateAsync: updateAccount } = useMutation(
		bankAccountService.update,
	);
	const { isLoading: isLoadingDelete, mutateAsync: deleteAccount } =
		useMutation(bankAccountService.delete);

	const handleSubmit = hookFormSubmit(async (data) => {
		if (!accountBeingEdited) return;
		try {
			await updateAccount({
				...data,
				initialBalance: currencyStringToNumber(data.initialBalance),
				id: accountBeingEdited.id,
			});
			queryClient.invalidateQueries(["BankAccounts"]);
			closeEditAccountModal();
			toast.success("A conta foi editada com sucesso");
		} catch {
			toast.error("Erro ao editar a conta!");
		}
	});

	function handleOpenDeleteModal() {
		setIsDeleteModalOpen(true);
	}

	function handleCloseDeleteModal() {
		setIsDeleteModalOpen(false);
	}
	async function handleConfirmDelete() {
		if (!accountBeingEdited) return;
		try {
			await deleteAccount(accountBeingEdited.id);

			queryClient.invalidateQueries(["BankAccounts"]);

			toast.success("A conta foi deletada com sucesso");
			closeEditAccountModal();
		} catch {
			toast.error("Erro ao deletar a conta!");
		}
	}

	return {
		isEditAccountModalOpen,
		closeEditAccountModal,
		register,
		errors,
		handleSubmit,
		control,
		isLoading,
		accountBeingEdited,
		isDeleteModalOpen,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
		handleConfirmDelete,
		isLoadingDelete,
	};
}
