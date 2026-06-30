import { useState } from "react";

export default function NewTransactionModal({ isOpen, onClose }) {
  const [type, setType] = useState("expense");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [creditType, setCreditType] = useState("cash");

  if (!isOpen) return null;

  const isExpense = type === "expense";
  const isIncome = type === "income";
  const isTransfer = type === "transfer";
  const isCredit = paymentMethod === "credit";
  const isInstallment = creditType === "installment";

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
            placeholder="Descrição. Ex: Mercado, salário, parcela celular"
          />

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
            <select className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600">
              <option>Carteira de entrada</option>
              <option>Nubank</option>
              <option>Mercado Pago</option>
              <option>Dinheiro</option>
            </select>
          )}

          {isExpense && (
            <>
              <select className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600">
                <option>Carteira de saída</option>
                <option>Nubank</option>
                <option>Mercado Pago</option>
                <option>Dinheiro</option>
              </select>

              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              >
                <option value="pix">Pix</option>
                <option value="debit">Débito</option>
                <option value="credit">Crédito</option>
                <option value="cash">Dinheiro</option>
              </select>

              {isCredit && (
                <>
                  <select className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600">
                    <option>Selecione o cartão</option>
                    <option>Nubank</option>
                    <option>Mercado Pago</option>
                  </select>

                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={creditType}
                      onChange={(event) => setCreditType(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
                    >
                      <option value="cash">Crédito à vista</option>
                      <option value="installment">Parcelado</option>
                    </select>

                    {isInstallment && (
                      <input
                        type="number"
                        min="2"
                        max="48"
                        className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
                        placeholder="Parcelas"
                      />
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {isTransfer && (
            <>
              <select className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600">
                <option>Carteira de origem</option>
                <option>Nubank</option>
                <option>Mercado Pago</option>
                <option>Dinheiro</option>
              </select>

              <select className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600">
                <option>Carteira de destino</option>
                <option>Nubank</option>
                <option>Mercado Pago</option>
                <option>Dinheiro</option>
              </select>
            </>
          )}

          <input
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Tags: #mercado #extra #revenda"
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