import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useWindowWidht } from "../../../../../app/hooks/useWindowWidht";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function useAccountsController() {
	const windowWidth = useWindowWidht();

	const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
		useDashboard();
	const [sliderState, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	});

	const { data, isFetching } = useQuery({
		queryKey: ["BankAccounts"],
		queryFn: bankAccountService.getAll,
	});

	const currentBalance = useMemo(() => {
		if (!data) return 0;

		return data.reduce((acc, account) => acc + account.currentBalance, 0);
	}, [data]);

	return {
		sliderState,
		setSliderState,
		windowWidth,
		toggleValuesVisibility,
		areValuesVisible,
		isLoading: isFetching,
		accounts: data ?? [],
		openNewAccountModal,
		currentBalance,
	};
}
