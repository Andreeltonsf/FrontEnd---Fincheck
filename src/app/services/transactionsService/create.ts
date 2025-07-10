import { httpClient } from "../HttpClient";

export interface CreateTransactionsParams {
	bankAccountId: string;
	categoryId: string;
  name: string;
	value: number;
	date: Date;
  type: 'EXPENSE' | 'INCOME';
}

export async function createTransaction(params: CreateTransactionsParams) {
	const { data } = await httpClient.post("/transactions", params);
	return data;
}
