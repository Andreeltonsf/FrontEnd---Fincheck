import { httpClient } from "../HttpClient";



export interface BankAccountParams{
  name: string;
  initialBalance: number;
  color: string;
  type: 'INVESTMENT' | 'CASH' | 'CHECKING';
}




export async function createBankAccount(params: BankAccountParams) {
  const {data} = await httpClient.post("/bank-accounts", params);
  return data;
}
