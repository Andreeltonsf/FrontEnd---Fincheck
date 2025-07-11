import { useEffect, useState } from "react";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import type { TransactionFilters } from "../../../../../app/services/transactionsService/getAll";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function useTransactionsController() {
	const { areValuesVisible } = useDashboard();

	const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

	const { transactions,isLoading,isInitialLoading,refetch } = useTransactions(filters);


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(()=>{
	refetch();
  }, [filters, refetch])

  function handleChangeFilters<TFilters extends keyof TransactionFilters>(filter:  TFilters) {
    return (value: TransactionFilters[TFilters]) => {
      if (value === filters[filter]) return;
      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    }
  }

  function handleApplyFilters({bankAccounId,year}:{
    bankAccounId:string | undefined;year:number
  }) {
    handleChangeFilters('bankAccountId')(bankAccounId);
    handleChangeFilters('year')(year);
    setIsFiltersModalOpen(false);
  }

  function handleChangeMonth(month: number) {
    setFilters((prevState) =>({
      ...prevState,
      month,
    }))
  }


	function handleOpenFiltersModal() {
		setIsFiltersModalOpen(true);
	}

	function handleCloseFiltersModal() {
		setIsFiltersModalOpen(false);
	}

	return {
		areValuesVisible,
		isInitialLoading,
		isLoading,
		transactions,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
		isFiltersModalOpen,
    handleChangeMonth,
    filters,
    handleChangeFilters,
    handleApplyFilters
	};
}
