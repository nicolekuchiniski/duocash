import {
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  Wallet,
} from "lucide-react";

import { transactions } from "../../data/financeData";
import { formatCurrency } from "../../utils/finance";

export default function Lancamentos() {
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

      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const isCredit = transaction.paymentMethod === "credit";

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
                      {transaction.date}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <Wallet size={14} />
                      {transaction.wallet}
                    </p>
                  </div>
                </div>

                <strong
                  className={
                    isIncome ? "text-emerald-600" : "text-red-600"
                  }
                >
                  {isIncome ? "+ " : "- "}
                  {formatCurrency(transaction.amount)}
                </strong>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}