import { createContext, useContext, useEffect, useState } from "react";

import {
  transactions as initialTransactions,
  wallets as initialWallets,
} from "../data/financeData";

const FinanceContext = createContext();

const TRANSACTIONS_STORAGE_KEY = "duocash_transactions";
const WALLETS_STORAGE_KEY = "duocash_wallets";

const transactionsWithCreatedAt = initialTransactions.map((transaction) => ({
  ...transaction,
  createdAt: transaction.createdAt || "2026-06-01T12:00:00.000Z",
}));

function getInitialTransactions() {
  const savedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);

  if (savedTransactions) {
    return JSON.parse(savedTransactions);
  }

  return transactionsWithCreatedAt;
}

function getInitialWallets() {
  const savedWallets = localStorage.getItem(WALLETS_STORAGE_KEY);

  if (savedWallets) {
    return JSON.parse(savedWallets);
  }

  return initialWallets;
}

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [wallets, setWallets] = useState(getInitialWallets);

  useEffect(() => {
    localStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(wallets));
  }, [wallets]);

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

  function addWallet(wallet) {
    setWallets((currentWallets) => [
      {
        ...wallet,
        id: crypto.randomUUID(),
      },
      ...currentWallets,
    ]);
  }

  function deleteWallet(walletId) {
    setWallets((currentWallets) =>
      currentWallets.filter((wallet) => wallet.id !== walletId)
    );
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        wallets,
        addWallet,
        deleteWallet,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}