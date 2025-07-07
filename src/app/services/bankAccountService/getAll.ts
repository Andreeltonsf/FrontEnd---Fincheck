import type { BankAccount } from "../../entities/BankAccount";
import { httpClient } from "../HttpClient";

type BankAccountResponse = Array<BankAccount>


export async function getAllBankAccounts() {
  const {data} = await httpClient.get<BankAccountResponse>("/bank-accounts");
  return data;
}
