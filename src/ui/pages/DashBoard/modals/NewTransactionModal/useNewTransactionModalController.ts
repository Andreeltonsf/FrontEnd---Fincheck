import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashBoardContext/useDashboard";
const schema = z.object({
	value: z.union([
		z.string().nonempty("Valor da despesa é obrigatório"),
		z.number(),
	]),
	name: z.string().nonempty("Nome da despesa é obrigatório"),
	categoryId: z.string().nonempty("Categoria da despesa é obrigatório"),
	bankAccountId: z.string().nonempty("Conta da despesa é obrigatório"),
	date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
	const {
		isNewTransactionModalOpen,
		closeNewTransactionModal,
		newTransactionType,
	} = useDashboard();

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { accounts } = useBankAccounts();

	const { categories: categoriesList } = useCategories();
	const { isLoading, mutateAsync } = useMutation(transactionsService.create);

	const categories = useMemo(() => {
		return categoriesList.filter(
			(category) => category.type === newTransactionType,
		);
	}, [categoriesList, newTransactionType]);

	const queryClient = useQueryClient();

	const handleSubmit = hookFormSubmit(async (data) => {
		if (!newTransactionType) return;
		try {
			await mutateAsync({
				...data,
				value: currencyStringToNumber(data.value),
				type: newTransactionType,
				date: new Date(data.date.toISOString()),
			});
			queryClient.invalidateQueries(["transactions"]);
			closeNewTransactionModal();
			toast.success(
				newTransactionType === "EXPENSE"
					? "Despesa cadastrada com sucesso!"
					: "Receita cadastrada com sucesso!",
			);
			reset();
		} catch {
			toast.error(
				newTransactionType === "EXPENSE"
					? "Erro ao cadastrar a despesa!"
					: "Erro ao cadastrar a receita!",
			);
		}
	});

	return {
		isNewTransactionModalOpen,
		closeNewTransactionModal,
		newTransactionType,
		register,
		errors,
		handleSubmit,
		control,
		accounts,
		categories,
		isLoading,
	};
}
