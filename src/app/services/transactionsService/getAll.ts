import type { BankAccount } from "../../entities/BankAccount";
import { httpClient } from "../HttpClient";

type TransactionsResponse = Array<BankAccount>


export async function getAllBankAccounts() {
  const {data} = await httpClient.get<TransactionsResponse>("/transactions");
  return data;
}
