export function getIncomeTotal(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function getExpenseTotal(transactions) {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function getBalance(transactions) {
  return getIncomeTotal(transactions) - getExpenseTotal(transactions);
}

export function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
