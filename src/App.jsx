import { useState } from "react";

import Header from "./components/dashboard/Header";
import BalanceCard from "./components/dashboard/BalanceCard";
import StatCard from "./components/dashboard/StatCard";
import NewTransactionModal from "./components/dashboard/NewTransactionModal";

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

        <BalanceCard />

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <StatCard icon={<ArrowUpCircle />} title="Receitas" value="R$ 0,00" />
          <StatCard icon={<ArrowDownCircle />} title="Despesas" value="R$ 0,00" />
          <StatCard icon={<PiggyBank />} title="Economia" value="R$ 0,00" />
          <StatCard icon={<Heart />} title="Compartilhado" value="R$ 0,00" />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h3 className="mb-5 text-xl font-black text-slate-900">
              Últimos lançamentos
            </h3>

            <Transaction icon={<ShoppingCart />} title="Mercado" category="Alimentação" value="- R$ 0,00" />
            <Transaction icon={<Utensils />} title="Restaurante" category="Lazer" value="- R$ 0,00" />
            <Transaction icon={<Car />} title="Transporte" category="Mobilidade" value="- R$ 0,00" />
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
                Assim que vocês começarem a lançar receitas e despesas, o DuoCash vai mostrar dicas automáticas para economizar e alcançar metas.
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