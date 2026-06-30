import { useState } from "react";
import { Landmark, Plus, Trash2, Wallet } from "lucide-react";

import NewWalletModal from "../../components/wallets/NewWalletModal";
import { useFinance } from "../../contexts/FinanceContext";
import { formatCurrency } from "../../utils/finance";

export default function Carteiras() {
  const [openModal, setOpenModal] = useState(false);

  const { wallets, addWallet, deleteWallet } = useFinance();

  function handleDeleteWallet(walletId, walletName) {
    const confirmed = confirm(
      `Tem certeza que deseja excluir a carteira ${walletName}?`
    );

    if (!confirmed) return;

    deleteWallet(walletId);
  }

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

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg hover:bg-violet-800"
        >
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
            <div className="mb-5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                  {wallet.type === "Carteira física" ||
                  wallet.type === "Dinheiro" ? (
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

              <button
                onClick={() =>
                  handleDeleteWallet(wallet.id, wallet.name)
                }
                className="rounded-xl bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                title="Excluir carteira"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <p className="text-sm text-slate-500">
              Saldo atual
            </p>

            <strong className="mt-1 block text-3xl text-slate-900">
              {formatCurrency(wallet.balance)}
            </strong>
          </div>
        ))}
      </section>

      <NewWalletModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={addWallet}
      />
    </section>
  );
}