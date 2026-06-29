import { UserRound } from "lucide-react";

export default function UserSummaryCard({
  name,
  income,
  expenses,
  balance,
}) {
  const color =
    name === "Nicole"
      ? "bg-pink-100 text-pink-600"
      : "bg-blue-100 text-blue-600";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className={`rounded-2xl p-3 ${color}`}>
          <UserRound size={22} />
        </div>

        <div>
          <h3 className="text-2xl font-black text-slate-900">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            Resumo financeiro
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-500">
            Receitas
          </span>

          <strong className="text-emerald-600">
            {income}
          </strong>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">
            Despesas
          </span>

          <strong className="text-red-600">
            {expenses}
          </strong>
        </div>

        <div className="border-t border-slate-200"></div>

        <div className="flex justify-between text-lg">
          <span className="font-semibold">
            Saldo
          </span>

          <strong className="text-violet-700">
            {balance}
          </strong>
        </div>
      </div>
    </div>
  );
}