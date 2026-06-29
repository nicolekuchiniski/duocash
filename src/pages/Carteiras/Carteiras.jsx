import { Landmark, Plus, Wallet } from "lucide-react";

const wallets = [
  {
    id: 1,
    name: "Nubank",
    type: "Conta digital",
    balance: "R$ 2.450,00",
  },
  {
    id: 2,
    name: "Mercado Pago",
    type: "Conta digital",
    balance: "R$ 680,00",
  },
  {
    id: 3,
    name: "Dinheiro",
    type: "Carteira física",
    balance: "R$ 120,00",
  },
];

export default function Carteiras() {
  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-violet-700">
            Carteiras
          </h1>
          <p className="text-slate-500">
            Cadastre onde seu dinheiro fica.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg hover:bg-violet-800">
          <Plus size={20} />
          Nova carteira
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="rounded-[2rem] bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                {wallet.type === "Carteira física" ? (
                  <Wallet size={24} />
                ) : (
                  <Landmark size={24} />
                )}
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {wallet.name}
                </h2>
                <p className="text-sm text-slate-500">
                  {wallet.type}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-500">Saldo atual</p>
            <strong className="mt-1 block text-3xl text-slate-900">
              {wallet.balance}
            </strong>
          </div>
        ))}
      </section>
    </section>
  );
}