import { useDashboard } from "../DashBoardContext/useDashboard";



export function useTransactionsController() {
  const{ areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isLoading: true, // Placeholder for loading state
  }
}
