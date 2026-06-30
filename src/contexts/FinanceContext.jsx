import { createContext, useContext, useEffect, useState } from "react";

import { transactions as initialTransactions } from "../data/financeData";

const FinanceContext = createContext();

const STORAGE_KEY = "duocash_transactions";

const transactionsWithCreatedAt = initialTransactions.map(
  (transaction) => ({
    ...transaction,
    createdAt:
      transaction.createdAt || "2026-06-01T12:00:00.000Z",
  })
);

function getInitialTransactions() {
  const savedTransactions = localStorage.getItem(STORAGE_KEY);

  if (savedTransactions) {
    return JSON.parse(savedTransactions);
  }

  return transactionsWithCreatedAt;
}

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(getInitialTransactions);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

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