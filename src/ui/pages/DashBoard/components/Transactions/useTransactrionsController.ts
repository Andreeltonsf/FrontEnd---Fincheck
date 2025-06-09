import { useDashboard } from "../DashBoardContext/useDashboard";



export function useTransactionsController() {
  const{ areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isLoading: false, // Placeholder for loading state
  }
}
