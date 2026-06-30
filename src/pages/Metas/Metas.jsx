import { Plus, Target, Plane, Home, PiggyBank } from "lucide-react";

import { formatCurrency } from "../../utils/finance";

const goals = [
  {
    id: 1,
    title: "Viagem",
    icon: Plane,
    targetAmount: 8000,
    currentAmount: 0,
  },
  {
    id: 2,
    title: "Reserva de emergência",
    icon: PiggyBank,
    targetAmount: 10000,
    currentAmount: 1500,
  },
  {
    id: 3,
    title: "Casa",
    icon: Home,
    targetAmount: 50000,
    currentAmount: 3000,
  },
];

export default function Metas() {
  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-violet-700">
            Metas
          </h1>

          <p className="text-slate-500">
            Acompanhe os objetivos financeiros do casal.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg hover:bg-violet-800">
          <Plus size={20} />
          Nova meta
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const progress = Math.min(
            (goal.currentAmount / goal.targetAmount) * 100,
            100
          );

          return (
            <div
              key={goal.id}
              className="rounded-[2rem] bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                  <Icon size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {goal.title}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Meta financeira
                  </p>
                </div>
              </div>

              <div className="mb-3 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-violet-700"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-sm text-slate-500">
                {formatCurrency(goal.currentAmount)} guardados de{" "}
                {formatCurrency(goal.targetAmount)}
              </p>

              <strong className="mt-3 block text-lg text-violet-700">
                {progress.toFixed(0)}%
              </strong>
            </div>
          );
        })}
      </section>
    </section>
  );
}