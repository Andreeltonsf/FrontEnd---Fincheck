import { useState } from "react";

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());


  function handleSelectBankAccount(backAccountId: string) {
    setSelectedBankAccountId(prevState => prevState === backAccountId ? null : backAccountId);
  }

  function handleChangeYear(step: number) {
    setSelectedYear(prevState => prevState + step);
  }


  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
  }
}
