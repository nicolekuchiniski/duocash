import { useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  Search,
  Trash2,
  Wallet,
} from "lucide-react";

import { useFinance } from "../../contexts/FinanceContext";
import { formatCurrency } from "../../utils/finance";

const currentUser = "Nicole";

function formatDate(date) {
  if (!date) return "Sem data";

  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function getCreatedDate(transaction) {
  if (transaction.createdAt) {
    return transaction.createdAt.split("T")[0];
  }

  return transaction.date;
}

export default function Lancamentos() {
  const { transactions, deleteTransaction } = useFinance();

  const [search, setSearch] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  function handleDelete(transactionId) {
    const confirmed = confirm(
      "Tem certeza que deseja excluir este lançamento?"
    );

    if (!confirmed) return;

    deleteTransaction(transactionId);
  }

  const filteredTransactions = transactions
    .filter((transaction) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        transaction.title?.toLowerCase().includes(searchText) ||
        transaction.category?.toLowerCase().includes(searchText) ||
        transaction.wallet?.toLowerCase().includes(searchText) ||
        transaction.user?.toLowerCase().includes(searchText) ||
        transaction.amount?.toString().includes(searchText);

      const transactionCreatedDate = getCreatedDate(transaction);

      const matchesCreatedDate = createdDate
        ? transactionCreatedDate === createdDate
        : true;

      return matchesSearch && matchesCreatedDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date);
      const dateB = new Date(b.createdAt || b.date);

      return dateB - dateA;
    });

  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-violet-700">
          Lançamentos
        </h1>

        <p className="text-slate-500">
          Histórico geral de receitas, despesas e parcelas.
        </p>
      </header>

      <section className="mb-5 grid gap-3 md:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
          <Search size={20} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Buscar por descrição, categoria, carteira ou valor"
          />
        </div>

        <input
          type="date"
          value={createdDate}
          onChange={(event) => setCreatedDate(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm outline-none focus:border-violet-600"
        />
      </section>

      {(search || createdDate) && (
        <button
          onClick={() => {
            setSearch("");
            setCreatedDate("");
          }}
          className="mb-5 rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-600 hover:bg-slate-200"
        >
          Limpar filtros
        </button>
      )}

      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {filteredTransactions.length === 0 && (
            <p className="rounded-2xl bg-slate-100 p-4 text-sm font-semibold text-slate-500">
              Nenhum lançamento encontrado.
            </p>
          )}

          {filteredTransactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const isCredit = transaction.paymentMethod === "credit";
            const canDelete = transaction.user === currentUser;
            const createdDateValue = getCreatedDate(transaction);

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-2xl p-3 ${
                      isIncome
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isIncome ? (
                      <ArrowUpCircle size={22} />
                    ) : isCredit ? (
                      <CreditCard size={22} />
                    ) : (
                      <ArrowDownCircle size={22} />
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      {transaction.title}

                      {transaction.installment && (
                        <span className="ml-2 text-sm text-violet-700">
                          {transaction.installment}
                        </span>
                      )}
                    </p>

                    <p className="text-sm text-slate-500">
                      {transaction.user} • {transaction.category} •{" "}
                      {formatDate(transaction.date)}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <Wallet size={14} />
                      {transaction.wallet}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Criado em: {formatDate(createdDateValue)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <strong
                    className={
                      isIncome ? "text-emerald-600" : "text-red-600"
                    }
                  >
                    {isIncome ? "+ " : "- "}
                    {formatCurrency(transaction.amount)}
                  </strong>

                  {canDelete && (
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="rounded-xl bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                      title="Excluir lançamento"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}