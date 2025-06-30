import { createContext, useCallback, useState } from "react";
import { set } from "react-hook-form";

interface DashboardContextValue {
	areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  toggleValuesVisibility: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardContextProvider({
	children,
}: { children: React.ReactNode }) {
	const [areValuesVisible, setAreValuesVisible] = useState(false);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

	const toggleValuesVisibility = useCallback(() => {
		setAreValuesVisible((prevState) => !prevState);
	}, []);

  const openNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(true);
	}, []);

   const closeNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(false);
	}, []);

	return (
		<DashboardContext.Provider
			value={{ areValuesVisible, toggleValuesVisibility, isNewAccountModalOpen, openNewAccountModal, closeNewAccountModal }}
		>
			{children}
		</DashboardContext.Provider>
	);
}
