import { useState } from "react";

export default function NewWalletModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Conta digital");
  const [balance, setBalance] = useState("");

  if (!isOpen) return null;

  function resetForm() {
    setName("");
    setType("Conta digital");
    setBalance("");
  }

  function handleSave() {
    if (!name.trim()) {
      alert("Preencha o nome da carteira.");
      return;
    }

    if (!balance) {
      alert("Preencha o saldo inicial.");
      return;
    }

    const numericBalance = Number(balance.replace(",", "."));

    if (Number.isNaN(numericBalance)) {
      alert("Informe um saldo válido.");
      return;
    }

    if (!onSave) {
      alert("Erro: função de salvar carteira não foi encontrada.");
      return;
    }

    onSave({
      name: name.trim(),
      type,
      balance: numericBalance,
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
              Nova carteira
            </h2>

            <p className="text-sm text-slate-500">
              Cadastre uma conta, carteira física ou dinheiro.
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
            placeholder="Nome da carteira. Ex: Nubank"
          />

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
          >
            <option>Conta digital</option>
            <option>Conta corrente</option>
            <option>Carteira física</option>
            <option>Dinheiro</option>
            <option>Outro</option>
          </select>

          <input
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Saldo inicial. Ex: 250"
          />

          <button
            onClick={handleSave}
            className="w-full rounded-2xl bg-violet-700 p-4 font-black text-white hover:bg-violet-800"
          >
            Salvar carteira
          </button>
        </div>
      </div>
    </div>
  );
}