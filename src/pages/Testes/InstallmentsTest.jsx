import { generateInstallments } from "../../utils/installments";
import { formatCurrency } from "../../utils/finance";

const testInstallments = generateInstallments({
  title: "Celular",
  amount: 3000,
  installments: 3,
  startDate: "2026-06-20",
  card: {
    name: "Nubank",
    closingDay: 8,
    dueDay: 15,
  },
  category: "Compras",
  tags: ["celular"],
});

export default function InstallmentsTest() {
  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-violet-700">
          Teste de parcelas
        </h1>

        <p className="text-slate-500">
          Compra de R$ 3.000,00 em 3x no cartão Nubank.
        </p>
      </header>

      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {testInstallments.map((installment) => (
            <div
              key={installment.id}
              className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0"
            >
              <div>
                <p className="font-bold text-slate-900">
                  {installment.title} — {installment.installment}
                </p>

                <p className="text-sm text-slate-500">
                  Data da fatura: {installment.date} | Cartão:{" "}
                  {installment.card}
                </p>
              </div>

              <strong className="text-red-600">
                - {formatCurrency(installment.amount)}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}