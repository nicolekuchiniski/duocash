import { Bell, Moon, Palette, Shield, UserRound } from "lucide-react";

const settings = [
  {
    id: 1,
    title: "Perfil",
    description: "Dados da conta logada.",
    icon: UserRound,
  },
  {
    id: 2,
    title: "Tema",
    description: "Modo claro e escuro futuramente.",
    icon: Moon,
  },
  {
    id: 3,
    title: "Cores",
    description: "Personalização visual do DuoCash.",
    icon: Palette,
  },
  {
    id: 4,
    title: "Notificações",
    description: "Alertas de vencimentos e metas.",
    icon: Bell,
  },
  {
    id: 5,
    title: "Segurança",
    description: "Login, acesso e proteção dos dados.",
    icon: Shield,
  },
];

export default function Configuracoes() {
  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-violet-700">
          Configurações
        </h1>

        <p className="text-slate-500">
          Ajustes gerais do DuoCash.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {settings.map((setting) => {
          const Icon = setting.icon;

          return (
            <div
              key={setting.id}
              className="rounded-[2rem] bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                  <Icon size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {setting.title}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {setting.description}
                  </p>
                </div>
              </div>

              <button className="rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-600 hover:bg-violet-100 hover:text-violet-700">
                Configurar
              </button>
            </div>
          );
        })}
      </section>
    </section>
  );
}