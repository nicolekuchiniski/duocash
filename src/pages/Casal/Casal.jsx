import { Heart, UserRound, Wallet } from "lucide-react";

import { transactions } from "../../data/financeData";
import {
  formatCurrency,
  getBalance,
  getExpenseTotal,
  getIncomeTotal,
  getUserSummary,
} from "../../utils/finance";

const coupleMembers = ["Nicole", "Emanuel"];

export default function Casal() {
  const totalIncome = getIncomeTotal(transactions);
  const totalExpenses = getExpenseTotal(transactions);
  const totalBalance = getBalance(transactions);

  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-violet-700">
          Casal
        </h1>

        <p className="text-slate-500">
          Visão financeira compartilhada do casal.
        </p>
      </header>

      <section className="mb-6 rounded-[2rem] bg-violet-700 p-8 text-white shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <Heart size={26} />
          </div>

          <div>
            <p className="text-violet-200">
              Saldo total do casal
            </p>

            <h2 className="text-5xl font-black">
              {formatCurrency(totalBalance)}
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-violet-200">Receitas do casal</p>
            <strong className="text-2xl">
              {formatCurrency(totalIncome)}
            </strong>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-violet-200">Despesas do casal</p>
            <strong className="text-2xl">
              {formatCurrency(totalExpenses)}
            </strong>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {coupleMembers.map((member) => {
          const summary = getUserSummary(transactions, member);

          return (
            <div
              key={member}
              className="rounded-[2rem] bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                  <UserRound size={24} />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {member}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Resumo individual
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <InfoLine
                  label="Receitas"
                  value={formatCurrency(summary.income)}
                  color="text-emerald-600"
                />

                <InfoLine
                  label="Despesas"
                  value={formatCurrency(summary.expenses)}
                  color="text-red-600"
                />

                <div className="border-t border-slate-200"></div>

                <div className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2 font-semibold text-slate-700">
                    <Wallet size={20} />
                    Saldo
                  </span>

                  <strong className="text-violet-700">
                    {formatCurrency(summary.balance)}
                  </strong>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}

function InfoLine({ label, value, color }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>

      <strong className={color}>{value}</strong>
    </div>
  );
}