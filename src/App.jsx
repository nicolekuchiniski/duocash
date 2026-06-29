import { useState } from "react";

import StatCard from "./components/dashboard/StatCard";
import NewTransactionModal from "./components/dashboard/NewTransactionModal";
import UserSummaryCard from "./components/dashboard/UserSummaryCard";

import { transactions } from "./data/mockData";
import {
  getBalance,
  getExpenseTotal,
  getIncomeTotal,
  getUserSummary,
  formatCurrency,
} from "./utils/finance";

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

function App() {
  const [openModal, setOpenModal] = useState(false);

  const incomeTotal = getIncomeTotal(transactions);
  const expenseTotal = getExpenseTotal(transactions);
  const balance = getBalance(transactions);

  const nicole = getUserSummary(transactions, "Nicole");
  const emanuel = getUserSummary(transactions, "Emanuel");

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-violet-700">💜 DuoCash</h1>
            <p className="text-slate-500">Olá, Nicole 👋</p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg hover:bg-violet-800"
          >
            + Novo lançamento
          </button>
        </header>

        <div className="mb-6 rounded-[2rem] bg-violet-700 p-8 text-white shadow-xl">
          <p className="text-violet-200">Saldo total do casal</p>

          <h2 className="mt-2 text-5xl font-black">
            {formatCurrency(balance)}
          </h2>

          <p className="mt-4 text-violet-100">
            Resumo financeiro com base nos lançamentos do mês.
          </p>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <StatCard icon={<ArrowUpCircle />} title="Receitas" value={formatCurrency(incomeTotal)} />
          <StatCard icon={<ArrowDownCircle />} title="Despesas" value={formatCurrency(expenseTotal)} />
          <StatCard icon={<PiggyBank />} title="Saldo" value={formatCurrency(balance)} />
          <StatCard icon={<Heart />} title="Lançamentos" value={transactions.length} />
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2">
          <UserSummaryCard
            name="👩 Nicole"
            income={formatCurrency(nicole.income)}
            expenses={formatCurrency(nicole.expenses)}
            balance={formatCurrency(nicole.balance)}
          />

          <UserSummaryCard
            name="👨 Emanuel"
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

            <Transaction icon={<ShoppingCart />} title="Mercado" category="Alimentação" value="- R$ 320,00" />
            <Transaction icon={<Utensils />} title="Restaurante" category="Lazer" value="- R$ 150,00" />
            <Transaction icon={<Car />} title="Compra parcelada" category="Compras" value="- R$ 100,00" />
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
                Vocês têm saldo positivo de {formatCurrency(balance)} neste mês.
                O próximo passo será criar projeções automáticas para os meses seguintes.
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
                  <p className="text-sm text-slate-500">Progresso inicial</p>
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
        />
      </section>
    </main>
  );
}

function Transaction({ icon, title, category, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
          {icon}
        </div>

        <div>
          <p className="font-bold text-slate-900">{title}</p>
          <p className="text-sm text-slate-500">{category}</p>
        </div>
      </div>

      <strong className="text-slate-900">{value}</strong>
    </div>
  );
}

export default App;