import { createTransaction } from "./create";
import { getAllTransactions } from "./getAll";

export const transactionsService = {
	create: createTransaction,
	getAll: getAllTransactions,
};
