import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import type { Transaction } from "../../../../../app/entities/Transactions";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { tr } from "date-fns/locale";
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

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {


	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,

	} = useForm<FormData>({
		resolver: zodResolver(schema),
    defaultValues:{
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    }
	});

	const { accounts } = useBankAccounts();

	const { categories: categoriesList } = useCategories();

  const {isLoading,mutateAsync:updateTransaction} = useMutation(transactionsService.update);

  const QueryClient = useQueryClient();


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


	const categories = useMemo(() => {
		return categoriesList.filter(
			(category) => category.type === transaction?.type,
		);
	}, [categoriesList, transaction?.type]);



	const handleSubmit = hookFormSubmit(async (data) => {
    if (!transaction) return;
    try{

      await updateTransaction({
        ...data,
        id: transaction.id,
        value:currencyStringToNumber(data.value),
        type: transaction.type,
        date:new Date(data.date.toISOString()),
      });
      //Invalidate the transactions query to refetch the data
      QueryClient.invalidateQueries({queryKey:["transactions"]});

      toast.success(
        transaction?.type === "EXPENSE" ? "Despesa atualizada" : "Receita atualizada"
      );

      onClose();
    }catch{
      toast.error(
        transaction?.type === "EXPENSE" ? "Erro ao atualizar despesa" : "Erro ao atualizar receita"
      );
    }
  }
    );


    const {
      isLoading:isLoadingDelete,
      mutateAsync:deleteTransaction}
      = useMutation(transactionsService.delete);


    async function handleDeleteTransaction() {
      if (!transaction) return;
		try {
			await deleteTransaction(transaction?.id);

			QueryClient.invalidateQueries(["transactions"]);

			toast.success(transaction?.type === "EXPENSE" ? "Despesa excluída" : "Receita excluída");
			onClose();
		} catch {
			toast.error("Erro ao deletar a transação!");
		}
    }


    function handleCloseDeleteModal(){
      setIsDeleteModalOpen(false);
    }

    function handleOpenDeleteModal() {
      setIsDeleteModalOpen(true);
    }

	return {

		register,
		errors,
		handleSubmit,
		control,
		accounts,
		categories,
		isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal
	};
}
