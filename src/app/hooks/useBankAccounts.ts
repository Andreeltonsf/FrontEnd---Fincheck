import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../services/bankAccountService";

export function useBankAccounts() {
	const { data, isFetching } = useQuery({
		queryKey: ["BankAccounts"],
		queryFn: bankAccountService.getAll,
	});

	return { isFetching, accounts: data ?? [] };
}
