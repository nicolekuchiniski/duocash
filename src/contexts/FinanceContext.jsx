import { createContext, useContext, useEffect, useState } from "react";

import {
  transactions as initialTransactions,
  wallets as initialWallets,
  cards as initialCards,
} from "../data/financeData";

const FinanceContext = createContext();

const TRANSACTIONS_STORAGE_KEY = "duocash_transactions";
const WALLETS_STORAGE_KEY = "duocash_wallets";
const CARDS_STORAGE_KEY = "duocash_cards";

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

function getInitialCards() {
  const savedCards = localStorage.getItem(CARDS_STORAGE_KEY);

  if (savedCards) {
    return JSON.parse(savedCards);
  }

  return initialCards;
}

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [wallets, setWallets] = useState(getInitialWallets);
  const [cards, setCards] = useState(getInitialCards);

  useEffect(() => {
    localStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(WALLETS_STORAGE_KEY, JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

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

  function addCard(card) {
    setCards((currentCards) => [
      {
        ...card,
        id: crypto.randomUUID(),
      },
      ...currentCards,
    ]);
  }

  function deleteCard(cardId) {
    setCards((currentCards) =>
      currentCards.filter((card) => card.id !== cardId)
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
        cards,
        addCard,
        deleteCard,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}