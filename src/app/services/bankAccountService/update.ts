import { httpClient } from "../HttpClient";

export interface UpdateBankAccountParams {
  id: string;
	name: string;
	initialBalance: number;
	color: string;
	type: "INVESTMENT" | "CASH" | "CHECKING";
}

export async function updateBankAccount({id, ...params}: UpdateBankAccountParams) {

	const { data } = await httpClient.put(`/bank-accounts/${id}`, params);
	return data;
}
