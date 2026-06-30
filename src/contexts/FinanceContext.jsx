import { createContext, useContext, useState } from "react";

import { transactions as initialTransactions } from "../data/financeData";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);

  function addTransaction(transaction) {
    setTransactions((currentTransactions) => [
      {
        ...transaction,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
      ...currentTransactions,
    ]);
  }

  function deleteTransaction(transactionId) {
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionId
      )
    );
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}