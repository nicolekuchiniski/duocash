import { useState } from "react";

export default function NewCardModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [closingDay, setClosingDay] = useState("");
  const [dueDay, setDueDay] = useState("");

  if (!isOpen) return null;

  function resetForm() {
    setName("");
    setLimit("");
    setClosingDay("");
    setDueDay("");
  }

  function handleSave() {
    if (!name.trim()) {
      alert("Preencha o nome do cartão.");
      return;
    }

    if (!limit) {
      alert("Preencha o limite do cartão.");
      return;
    }

    if (!closingDay || !dueDay) {
      alert("Preencha fechamento e vencimento.");
      return;
    }

    const numericLimit = Number(limit.replace(",", "."));
    const numericClosingDay = Number(closingDay);
    const numericDueDay = Number(dueDay);

    if (Number.isNaN(numericLimit) || numericLimit <= 0) {
      alert("Informe um limite válido.");
      return;
    }

    if (
      numericClosingDay < 1 ||
      numericClosingDay > 31 ||
      numericDueDay < 1 ||
      numericDueDay > 31
    ) {
      alert("Fechamento e vencimento precisam ser entre 1 e 31.");
      return;
    }

    onSave({
      name: name.trim(),
      limit: numericLimit,
      closingDay: numericClosingDay,
      dueDay: numericDueDay,
    });

    resetForm();
    onClose();
  }

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
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Nome do cartão. Ex: Nubank"
          />

          <input
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Limite do cartão. Ex: 3000"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              value={closingDay}
              onChange={(event) => setClosingDay(event.target.value)}
              type="number"
              min="1"
              max="31"
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              placeholder="Dia fechamento"
            />

            <input
              value={dueDay}
              onChange={(event) => setDueDay(event.target.value)}
              type="number"
              min="1"
              max="31"
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              placeholder="Dia vencimento"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full rounded-2xl bg-violet-700 p-4 font-black text-white hover:bg-violet-800"
          >
            Salvar cartão
          </button>
        </div>
      </div>
    </div>
  );
}