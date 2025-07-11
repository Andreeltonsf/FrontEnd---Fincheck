import { httpClient } from "../HttpClient";

export interface UpdateTransactionParams {
  id: string;
  name: string;
  value: number;
  type: "EXPENSE" | "INCOME";
  date: Date;
  categoryId: string;
  bankAccountId: string;
}

export async function updateTransaction({id,...params}: UpdateTransactionParams) {
  const {data} = await httpClient.put(`/transactions/${id}`,params);

  return data;
}
