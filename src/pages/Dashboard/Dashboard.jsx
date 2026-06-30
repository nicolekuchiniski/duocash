import { useState } from "react";

import StatCard from "../../components/dashboard/StatCard";
import NewTransactionModal from "../../components/dashboard/NewTransactionModal";
import UserSummaryCard from "../../components/dashboard/UserSummaryCard";

import { useFinance } from "../../contexts/FinanceContext";

import {
  getBalance,
  getExpenseTotal,
  getIncomeTotal,
  getUserSummary,
  formatCurrency,
} from "../../utils/finance";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Heart,
  PiggyBank,
  Sparkles,
  Plane,
  ShoppingCart,
  Utensils,
  Car,
} from "lucide-react";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);

  const { transactions, addTransaction } = useFinance();

  const incomeTotal = getIncomeTotal(transactions);
  const expenseTotal = getExpenseTotal(transactions);
  const balance = getBalance(transactions);

  const nicole = getUserSummary(transactions, "Nicole");
  const emanuel = getUserSummary(transactions, "Emanuel");

  const latestTransactions = transactions.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-violet-700">
            Dashboard
          </h1>

          <p className="text-slate-500">
            Olá, Nicole 👋
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg hover:bg-violet-800"
        >
          + Novo lançamento
        </button>
      </header>

      <div className="mb-6 rounded-[2rem] bg-violet-700 p-8 text-white shadow-xl">
        <p className="text-violet-200">
          Saldo total do casal
        </p>

        <h2 className="mt-2 text-5xl font-black">
          {formatCurrency(balance)}
        </h2>

        <p className="mt-4 text-violet-100">
          Resumo financeiro com base nos lançamentos salvos.
        </p>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-4">
        <StatCard
          icon={<ArrowUpCircle />}
          title="Receitas"
          value={formatCurrency(incomeTotal)}
        />

        <StatCard
          icon={<ArrowDownCircle />}
          title="Despesas"
          value={formatCurrency(expenseTotal)}
        />

        <StatCard
          icon={<PiggyBank />}
          title="Saldo"
          value={formatCurrency(balance)}
        />

        <StatCard
          icon={<Heart />}
          title="Lançamentos"
          value={transactions.length}
        />
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2">
        <UserSummaryCard
          name="Nicole"
          income={formatCurrency(nicole.income)}
          expenses={formatCurrency(nicole.expenses)}
          balance={formatCurrency(nicole.balance)}
        />

        <UserSummaryCard
          name="Emanuel"
          income={formatCurrency(emanuel.income)}
          expenses={formatCurrency(emanuel.expenses)}
          balance={formatCurrency(emanuel.balance)}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-xl font-black text-slate-900">
            Últimos lançamentos
          </h3>

          {latestTransactions.length === 0 && (
            <p className="rounded-2xl bg-slate-100 p-4 text-sm font-semibold text-slate-500">
              Nenhum lançamento cadastrado.
            </p>
          )}

          {latestTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              icon={getTransactionIcon(transaction)}
              title={transaction.title}
              category={transaction.category}
              value={`${transaction.type === "income" ? "+ " : "- "}${formatCurrency(
                transaction.amount
              )}`}
              isIncome={transaction.type === "income"}
            />
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <Sparkles />
              </div>

              <h3 className="text-xl font-black text-slate-900">
                Planejamento Inteligente
              </h3>
            </div>

            <p className="text-slate-600">
              O saldo atual do casal é de {formatCurrency(balance)}.
              Conforme vocês lançarem receitas e despesas, esse resumo será
              atualizado automaticamente.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <Plane />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Meta da viagem
                </h3>

                <p className="text-sm text-slate-500">
                  Progresso inicial
                </p>
              </div>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[0%] bg-violet-700"></div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              R$ 0,00 guardados de R$ 8.000,00
            </p>
          </div>
        </div>
      </section>

      <NewTransactionModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={addTransaction}
      />
    </section>
  );
}

function getTransactionIcon(transaction) {
  if (transaction.type === "income") {
    return <ArrowUpCircle />;
  }

  if (transaction.paymentMethod === "credit") {
    return <Car />;
  }

  if (transaction.category === "Alimentação") {
    return <ShoppingCart />;
  }

  if (transaction.category === "Lazer") {
    return <Utensils />;
  }

  return <ArrowDownCircle />;
}

function Transaction({ icon, title, category, value, isIncome }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`rounded-2xl p-3 ${
            isIncome
              ? "bg-emerald-100 text-emerald-700"
              : "bg-violet-100 text-violet-700"
          }`}
        >
          {icon}
        </div>

        <div>
          <p className="font-bold text-slate-900">
            {title}
          </p>

          <p className="text-sm text-slate-500">
            {category}
          </p>
        </div>
      </div>

      <strong
        className={isIncome ? "text-emerald-600" : "text-red-600"}
      >
        {value}
      </strong>
    </div>
  );
}