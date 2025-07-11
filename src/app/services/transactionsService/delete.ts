import { httpClient } from "../HttpClient";

export async function deleteTransaction(transactionId: string) {
	const { data } = await httpClient.delete(`/transactions/${transactionId}`);
	return data;
}
