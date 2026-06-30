import { useState } from "react";

import {
  wallets,
  cards,
  categories,
} from "../../data/financeData";

import { generateInstallments } from "../../utils/installments";

const currentUser = "Nicole";

export default function NewTransactionModal({ isOpen, onClose, onSave }) {
  const [type, setType] = useState("expense");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [creditType, setCreditType] = useState("cash");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [wallet, setWallet] = useState("");
  const [cardName, setCardName] = useState("");
  const [installments, setInstallments] = useState("");
  const [tags, setTags] = useState("");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const isExpense = type === "expense";
  const isIncome = type === "income";
  const isTransfer = type === "transfer";
  const isCredit = paymentMethod === "credit";
  const isInstallment = creditType === "installment";

  function resetForm() {
    setType("expense");
    setPaymentMethod("pix");
    setCreditType("cash");
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
    setWallet("");
    setCardName("");
    setInstallments("");
    setTags("");
    setNote("");
  }

  function handleSave() {
    if (!title || !amount || !date) {
      alert("Preencha descrição, valor e data.");
      return;
    }

    const numericAmount = Number(amount.replace(",", "."));

    if (!numericAmount || numericAmount <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    const formattedTags = tags
      .split(" ")
      .filter(Boolean)
      .map((tag) => tag.replace("#", ""));

    if (isCredit && isInstallment) {
      const selectedCard = cards.find((card) => card.name === cardName);

      if (!selectedCard) {
        alert("Selecione um cartão.");
        return;
      }

      const generatedInstallments = generateInstallments({
        title,
        amount: numericAmount,
        installments: Number(installments),
        startDate: date,
        card: selectedCard,
        category,
        tags: formattedTags,
      });

      generatedInstallments.forEach((transaction) => {
        onSave({
          ...transaction,
          user: currentUser,
          wallet: selectedCard.name,
          note,
        });
      });

      resetForm();
      onClose();
      return;
    }

    onSave({
      user: currentUser,
      type,
      title,
      category,
      wallet: isCredit ? cardName : wallet,
      paymentMethod: isExpense ? paymentMethod : null,
      amount: numericAmount,
      date,
      tags: formattedTags,
      note,
    });

    resetForm();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Descrição. Ex: Mercado, salário, parcela celular"
          />

          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Valor"
          />

          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
          />

          {!isTransfer && (
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            >
              <option value="">Selecione a categoria</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}

          {isIncome && (
            <select
              value={wallet}
              onChange={(event) => setWallet(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            >
              <option value="">Carteira de entrada</option>

              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.name}>
                  {wallet.name}
                </option>
              ))}
            </select>
          )}

          {isExpense && (
            <>
              {!isCredit && (
                <select
                  value={wallet}
                  onChange={(event) => setWallet(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
                >
                  <option value="">Carteira de saída</option>

                  {wallets.map((wallet) => (
                    <option key={wallet.id} value={wallet.name}>
                      {wallet.name}
                    </option>
                  ))}
                </select>
              )}

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
                  <select
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
                  >
                    <option value="">Selecione o cartão</option>

                    {cards.map((card) => (
                      <option key={card.id} value={card.name}>
                        {card.name}
                      </option>
                    ))}
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
                        value={installments}
                        onChange={(event) =>
                          setInstallments(event.target.value)
                        }
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
              <select
                value={wallet}
                onChange={(event) => setWallet(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
              >
                <option value="">Carteira de origem</option>

                {wallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.name}>
                    {wallet.name}
                  </option>
                ))}
              </select>

              <select className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600">
                <option>Carteira de destino</option>

                {wallets.map((wallet) => (
                  <option key={wallet.id}>{wallet.name}</option>
                ))}
              </select>
            </>
          )}

          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Tags: #mercado #extra #revenda"
          />

          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-violet-600"
            placeholder="Observação"
          />

          <button
            onClick={handleSave}
            className="w-full rounded-2xl bg-violet-700 p-4 font-black text-white hover:bg-violet-800"
          >
            Salvar lançamento
          </button>
        </div>
      </div>
    </div>
  );
}