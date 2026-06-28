import { ArrowDownCircle, ArrowUpCircle, Heart, PiggyBank } from 'lucide-react'

function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-violet-700">💜 DuoCash</h1>
            <p className="text-slate-500">Olá, Nicole 👋</p>
          </div>

          <button className="rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg">
            + Novo lançamento
          </button>
        </header>

        <div className="mb-6 rounded-[2rem] bg-violet-700 p-8 text-white shadow-xl">
          <p className="text-violet-200">Saldo total</p>
          <h2 className="mt-2 text-5xl font-black">R$ 0,00</h2>
          <p className="mt-4 text-violet-100">
            Seu planejamento financeiro inteligente começa aqui.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          <Card icon={<ArrowUpCircle />} title="Receitas" value="R$ 0,00" />
          <Card icon={<ArrowDownCircle />} title="Despesas" value="R$ 0,00" />
          <Card icon={<PiggyBank />} title="Economia" value="R$ 0,00" />
          <Card icon={<Heart />} title="Compartilhado" value="R$ 0,00" />
        </section>
      </section>
    </main>
  )
}

function Card({ icon, title, value }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-violet-700">{icon}</div>
      <p className="text-sm text-slate-500">{title}</p>
      <strong className="mt-1 block text-2xl text-slate-900">{value}</strong>
    </div>
  )
}

export default App