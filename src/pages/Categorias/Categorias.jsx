import { Plus, Tags } from "lucide-react";

import { categories } from "../../data/financeData";

export default function Categorias() {
  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-violet-700">
            Categorias
          </h1>

          <p className="text-slate-500">
            Organize receitas e despesas por tipo.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg hover:bg-violet-800">
          <Plus size={20} />
          Nova categoria
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category}
            className="flex items-center gap-3 rounded-[2rem] bg-white p-5 shadow-sm"
          >
            <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
              <Tags size={22} />
            </div>

            <strong className="text-slate-900">
              {category}
            </strong>
          </div>
        ))}
      </section>
    </section>
  );
}