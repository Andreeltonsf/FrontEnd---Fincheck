import { useState } from "react";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>(undefined);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());



  const{accounts} = useBankAccounts();


  function handleSelectBankAccount(backAccountId: string) {
    setSelectedBankAccountId(prevState => prevState === backAccountId ? undefined : backAccountId);
  }

  function handleChangeYear(step: number) {
    setSelectedYear(prevState => prevState + step);
  }


  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts
  }
}
