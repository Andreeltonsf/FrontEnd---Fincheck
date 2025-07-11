import { createTransaction } from "./create";
import { deleteTransaction } from "./delete";
import { getAllTransactions } from "./getAll";
import { updateTransaction } from "./update";

export const transactionsService = {
	create: createTransaction,
	getAll: getAllTransactions,
  update: updateTransaction,
  delete: deleteTransaction,
};
