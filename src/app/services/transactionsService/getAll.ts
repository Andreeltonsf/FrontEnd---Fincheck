import type { Transaction } from "../../entities/Transactions";
import { httpClient } from "../HttpClient";

type TransactionsResponse = Array<Transaction>;

export type TransactionFilters = {
	month: number;
	year: number;
	bankAccountId?: string;
	type?: Transaction["type"];
};

export async function getAllTransactions(filters: TransactionFilters) {
	const { data } = await httpClient.get<TransactionsResponse>("/transactions", {
		params: {
      month: filters.month,
      year: filters.year,
      bankAccountId: filters.bankAccountId,
      type: filters.type,
    }
	});
	return data;
}
