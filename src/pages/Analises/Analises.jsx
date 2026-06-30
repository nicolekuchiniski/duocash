import { BarChart3, TrendingDown, TrendingUp, Wallet } from "lucide-react";

import { transactions } from "../../data/financeData";
import {
  formatCurrency,
  getBalance,
  getExpenseTotal,
  getIncomeTotal,
} from "../../utils/finance";

export default function Analises() {
  const income = getIncomeTotal(transactions);
  const expenses = getExpenseTotal(transactions);
  const balance = getBalance(transactions);

  const expensePercentage =
    income > 0 ? Math.min((expenses / income) * 100, 100) : 0;

  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-violet-700">
          Análises
        </h1>

        <p className="text-slate-500">
          Entenda como o dinheiro está entrando e saindo.
        </p>
      </header>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AnalysisCard
          icon={TrendingUp}
          title="Receitas"
          value={formatCurrency(income)}
          description="Total recebido no período."
        />

        <AnalysisCard
          icon={TrendingDown}
          title="Despesas"
          value={formatCurrency(expenses)}
          description="Total gasto no período."
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
              Uso da renda
            </h2>

            <p className="text-sm text-slate-500">
              Quanto da renda já foi comprometida com despesas.
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