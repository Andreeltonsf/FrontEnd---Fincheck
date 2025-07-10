import { useMemo, useState } from "react";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useWindowWidht } from "../../../../../app/hooks/useWindowWidht";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function useAccountsController() {
	const windowWidth = useWindowWidht();

	const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
		useDashboard();
	const [sliderState, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	});

	const { accounts, isFetching } = useBankAccounts();

	const currentBalance = useMemo(() => {
		return accounts.reduce((acc, account) => acc + account.currentBalance, 0);
	}, [accounts]);

	return {
		sliderState,
		setSliderState,
		windowWidth,
		toggleValuesVisibility,
		areValuesVisible,
		isLoading: isFetching,
		accounts,
		openNewAccountModal,
		currentBalance,
	};
}
