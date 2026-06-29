export default function UserSummaryCard({
  name,
  income,
  expenses,
  balance,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-black text-slate-900">
        {name}
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Receitas</span>
          <strong className="text-emerald-600">
            {income}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>Despesas</span>
          <strong className="text-red-600">
            {expenses}
          </strong>
        </div>

        <hr />

        <div className="flex justify-between text-base">
          <span>Saldo</span>
          <strong className="text-violet-700">
            {balance}
          </strong>
        </div>
      </div>
    </div>
  );
}