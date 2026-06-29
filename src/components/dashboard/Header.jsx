export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-black text-violet-700">
          💜 DuoCash
        </h1>

        <p className="text-slate-500">
          Olá, Nicole 👋
        </p>
      </div>

      <button className="rounded-2xl bg-violet-700 px-5 py-3 font-bold text-white shadow-lg hover:bg-violet-800">
        + Novo lançamento
      </button>
    </header>
  )
}