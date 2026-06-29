import { Car, ShoppingCart, Utensils } from "lucide-react";

export default function TransactionList() {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-xl font-black text-slate-900">
        Últimos lançamentos
      </h3>

      <Transaction icon={<ShoppingCart />} title="Mercado" category="Alimentação" value="- R$ 0,00" />
      <Transaction icon={<Utensils />} title="Restaurante" category="Lazer" value="- R$ 0,00" />
      <Transaction icon={<Car />} title="Transporte" category="Mobilidade" value="- R$ 0,00" />
    </div>
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