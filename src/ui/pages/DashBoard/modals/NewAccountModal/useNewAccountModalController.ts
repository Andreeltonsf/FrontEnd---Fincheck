import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashBoardContext/useDashboard";

const schema = z.object({
	initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
	name: z.string().nonempty("Nome da conta é obrigatório"),
	color: z.string().nonempty("Cor  é obrigatório"),
	type: z.enum(["INVESTMENT", "CASH", "CHECKING"]),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
	const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			initialBalance: "0,00",
		},
	});

	const queryClient = useQueryClient();
	const { isLoading, mutateAsync } = useMutation(bankAccountService.create);

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			await mutateAsync({
				...data,
				initialBalance: currencyStringToNumber(data.initialBalance),
			});
			queryClient.invalidateQueries(["BankAccounts"]);
			closeNewAccountModal();
			toast.success("A conta foi cadastrada com sucesso");
			reset();
		} catch {
			toast.error("Erro ao cadastrar a conta!");
		}
	});

	return {
		isNewAccountModalOpen,
		closeNewAccountModal,
		register,
		errors,
		handleSubmit,
		control,
		isLoading,
	};
}
