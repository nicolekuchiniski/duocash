import { useState } from "react";

export default function NewTransactionModal({ isOpen, onClose }) {
  const [type, setType] = useState("expense");
  const [paymentMethod, setPaymentMethod] = useState("pix");

  if (!isOpen) return null;

  const isExpense = type === "expense";
  const isIncome = type === "income";
  const isTransfer = type === "transfer";
  const isCredit = paymentMethod === "credit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Novo lançamento
            </h2>
            <p className="text-sm text-slate-500">
              Receita, despesa ou transferência interna.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-600 hover:bg-slate-200"
          >
            X
          </button>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <button
            onClick={() => setType("income")}
            className={`rounded-2xl p-4 font-bold ${
              isIncome
                ? "bg-emerald-600 text-white"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            Receita
          </button>

          <button
            onClick={() => setType("expense")}
            className={`rounded-2xl p-4 font-bold ${
              isExpense
                ? "bg-red-600 text-white"
                : "bg-red-100 text-red-700"
            }`}
          >
            Despesa
          </button>

          <button
            onClick={() => setType("transfer")}
            className={`rounded-2xl p-4 font-bold ${
              isTransfer
                ? "bg-violet-700 text-white"
                : "bg-violet-100 text-violet-700"
            }`}
          >
            Transferência
          </button>
        </div>

        <div className="space-y-4">
          <input
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Valor"
          />

          {!isTransfer && (
            <input
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              placeholder="Categoria"
            />
          )}

          {isIncome && (
            <input
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              placeholder="Carteira de entrada"
            />
          )}

          {isExpense && (
            <>
              <input
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
                placeholder="Carteira"
              />

              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              >
                <option value="pix">Pix</option>
                <option value="debit">Débito</option>
                <option value="credit">Crédito</option>
                <option value="cash">Dinheiro</option>
                <option value="transfer">Transferência</option>
              </select>

              {isCredit && (
                <div className="grid grid-cols-2 gap-3">
                  <select className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600">
                    <option>À vista</option>
                    <option>Parcelado</option>
                  </select>

                  <input
                    type="number"
                    min="1"
                    className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
                    placeholder="Parcelas"
                  />
                </div>
              )}
            </>
          )}

          {isTransfer && (
            <>
              <input
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
                placeholder="Carteira de origem"
              />

              <input
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
                placeholder="Carteira de destino"
              />
            </>
          )}

          <input
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Tags: #mercado #extra"
          />

          <textarea
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Observação"
          />

          <button className="w-full rounded-2xl bg-violet-700 p-4 font-black text-white hover:bg-violet-800">
            Salvar lançamento
          </button>
        </div>
      </div>
    </div>
  );
}