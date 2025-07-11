import { createContext, useCallback, useState } from "react";
import type { BankAccount } from "../../../../../app/entities/BankAccount";

interface DashboardContextValue {
	areValuesVisible: boolean;
	isNewAccountModalOpen: boolean;
	isNewTransactionModalOpen: boolean;
	newTransactionType: "INCOME" | "EXPENSE" | null;

	openNewAccountModal: () => void;
	closeNewAccountModal: () => void;
	openNewTransactionModal: (type: "INCOME" | "EXPENSE") => void;
	closeNewTransactionModal: () => void;
	toggleValuesVisibility: () => void;

  isEditAccountModalOpen: boolean;
  accountBeingEdited: BankAccount | null;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardContextProvider({
	children,
}: { children: React.ReactNode }) {
	const [areValuesVisible, setAreValuesVisible] = useState(false);
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
		useState(false);
	const [newTransactionType, setNewTransactionType] = useState<
		"INCOME" | "EXPENSE" | null
	>(null);
	const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
	const [accountBeingEdited, setAccountBeingEdited] =
		useState<BankAccount | null>(null);

	const toggleValuesVisibility = useCallback(() => {
		setAreValuesVisible((prevState) => !prevState);
	}, []);

	const openNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(true);
	}, []);

	const closeNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(false);
	}, []);

	const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
		setNewTransactionType(type);
		setIsNewTransactionModalOpen(true);
	}, []);

	const closeNewTransactionModal = useCallback(() => {
		setNewTransactionType(null);
		setIsNewTransactionModalOpen(false);
	}, []);

	const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
		setIsEditAccountModalOpen(true);
		setAccountBeingEdited(bankAccount);
	}, []);

	const closeEditAccountModal = useCallback(() => {
		setIsEditAccountModalOpen(false);
		setAccountBeingEdited(null);
	}, []);

	return (
		<DashboardContext.Provider
			value={{
				areValuesVisible,
				toggleValuesVisibility,
				isNewAccountModalOpen,
				openNewAccountModal,
				closeNewAccountModal,
				isNewTransactionModalOpen,
				openNewTransactionModal,
				closeNewTransactionModal,
				newTransactionType,
        isEditAccountModalOpen,
				accountBeingEdited,
				openEditAccountModal,
				closeEditAccountModal,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
}
