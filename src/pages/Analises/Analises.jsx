import { useState } from "react";
import { BarChart3, TrendingDown, TrendingUp, Wallet } from "lucide-react";

import { useFinance } from "../../contexts/FinanceContext";

import {
  formatCurrency,
  getBalance,
  getExpenseTotal,
  getIncomeTotal,
} from "../../utils/finance";

import {
  buildMonthKey,
  filterTransactionsByMonth,
  monthOptions,
  yearOptions,
} from "../../utils/monthlyAnalysis";

export default function Analises() {
  const { transactions } = useFinance();

  const [selectedMonth, setSelectedMonth] = useState("06");
  const [selectedYear, setSelectedYear] = useState(2026);

  const selectedMonthKey = buildMonthKey(selectedYear, selectedMonth);

  const monthlyTransactions = filterTransactionsByMonth(
    transactions,
    selectedMonthKey
  );

  const income = getIncomeTotal(monthlyTransactions);
  const expenses = getExpenseTotal(monthlyTransactions);
  const balance = getBalance(monthlyTransactions);

  const expensePercentage =
    income > 0 ? Math.min((expenses / income) * 100, 100) : 0;

  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-violet-700">
            Análises
          </h1>

          <p className="text-slate-500">
            Histórico da saúde financeira do casal.
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white p-4 font-bold text-slate-700 outline-none focus:border-violet-600"
          >
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(event) => setSelectedYear(Number(event.target.value))}
            className="rounded-2xl border border-slate-200 bg-white p-4 font-bold text-slate-700 outline-none focus:border-violet-600"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AnalysisCard
          icon={TrendingUp}
          title="Receitas"
          value={formatCurrency(income)}
          description="Total recebido no mês."
        />

        <AnalysisCard
          icon={TrendingDown}
          title="Despesas"
          value={formatCurrency(expenses)}
          description="Total gasto no mês."
        />

        <AnalysisCard
          icon={Wallet}
          title="Saldo"
          value={formatCurrency(balance)}
          description="Diferença entre entradas e saídas."
        />
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
            <BarChart3 size={24} />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">
              Saúde financeira do mês
            </h2>

            <p className="text-sm text-slate-500">
              Percentual da renda comprometida com despesas.
            </p>
          </div>
        </div>

        <div className="mb-3 h-5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-violet-700"
            style={{ width: `${expensePercentage}%` }}
          ></div>
        </div>

        <strong className="text-violet-700">
          {expensePercentage.toFixed(0)}% da renda usada
        </strong>

        {monthlyTransactions.length === 0 && (
          <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm font-semibold text-slate-500">
            Nenhum lançamento encontrado para este mês.
          </p>
        )}
      </section>
    </section>
  );
}

function AnalysisCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
          <Icon size={24} />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-900">
            {title}
          </h2>

          <p className="text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <strong className="text-2xl text-slate-900">
        {value}
      </strong>
    </div>
  );
}