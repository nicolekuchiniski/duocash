import { CreditCard, Plus } from "lucide-react";

const cards = [
  {
    id: 1,
    name: "Nubank",
    limit: "R$ 3.000,00",
    closingDay: 8,
    dueDay: 15,
  },
  {
    id: 2,
    name: "Mercado Pago",
    limit: "R$ 2.500,00",
    closingDay: 10,
    dueDay: 20,
  },
];

export default function Cartoes() {
  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-violet-700">
            Cartões
          </h1>

          <p className="text-slate-500">
            Controle cartões de crédito, limite, fechamento e vencimento.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg hover:bg-violet-800">
          <Plus size={20} />
          Novo cartão
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-[2rem] bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <CreditCard size={24} />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {card.name}
                </h2>

                <p className="text-sm text-slate-500">
                  Cartão de crédito
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">
                  Limite
                </p>

                <strong className="text-lg text-slate-900">
                  {card.limit}
                </strong>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Fechamento
                </p>

                <strong className="text-lg text-slate-900">
                  Dia {card.closingDay}
                </strong>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Vencimento
                </p>

                <strong className="text-lg text-slate-900">
                  Dia {card.dueDay}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
