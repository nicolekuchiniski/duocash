export default function NewCardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Novo cartão
            </h2>

            <p className="text-sm text-slate-500">
              Cadastre limite, fechamento e vencimento.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-600 hover:bg-slate-200"
          >
            X
          </button>
        </div>

        <div className="space-y-4">
          <input
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Nome do cartão. Ex: Nubank"
          />

          <input
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Limite do cartão"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="1"
              max="31"
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              placeholder="Dia fechamento"
            />

            <input
              type="number"
              min="1"
              max="31"
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              placeholder="Dia vencimento"
            />
          </div>

          <button className="w-full rounded-2xl bg-violet-700 p-4 font-black text-white hover:bg-violet-800">
            Salvar cartão
          </button>
        </div>
      </div>
    </div>
  );
}