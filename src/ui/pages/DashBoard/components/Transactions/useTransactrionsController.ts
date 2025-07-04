import { useState } from "react";
import { useDashboard } from "../DashBoardContext/useDashboard";



export function useTransactionsController() {
  const{ areValuesVisible } = useDashboard();


  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions:[],
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
  }
}
