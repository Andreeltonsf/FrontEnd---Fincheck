import { createBankAccount } from "./create";
import { deleteBankAccount } from "./delete";
import { getAllBankAccounts } from "./getAll";
import { updateBankAccount } from "./update";

export const bankAccountService = {
  create: createBankAccount,
  getAll: getAllBankAccounts,
  update: updateBankAccount,
  delete: deleteBankAccount,
};
