import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  WalletCards,
  BarChart3,
  Landmark,
  CreditCard,
  Target,
  Settings,
  Wallet,
  Tags,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: Home, path: "/" },
  { label: "Lançamentos", icon: WalletCards, path: "/lancamentos" },
  { label: "Casal", icon: BarChart3, path: "/casal" },
  { label: "Carteiras", icon: Landmark, path: "/carteiras" },
  { label: "Cartões", icon: CreditCard, path: "/cartoes" },
  { label: "Categorias", icon: Tags, path: "/categorias" },
  { label: "Metas", icon: Target, path: "/metas" },
  { label: "Configurações", icon: Settings, path: "/configuracoes" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`hidden lg:flex flex-col bg-white border-r border-slate-200 shadow-md transition-all duration-300 ${
        expanded ? "w-72" : "w-20"
      }`}
    >
      <div className="flex h-24 items-center justify-center border-b border-slate-100">
        {expanded ? (
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-violet-100 p-3">
              <Wallet size={28} className="text-violet-700" />
            </div>

            <div>
              <h1 className="text-2xl font-black text-violet-700">
                DuoCash
              </h1>

              <p className="text-xs text-slate-500">
                Nicole & Emanuel
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-violet-100 p-3">
            <Wallet size={24} className="text-violet-700" />
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-2 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex w-full items-center rounded-2xl transition-all duration-200 ${
                  expanded ? "gap-4 px-4 py-3" : "justify-center py-3"
                } ${
                  isActive
                    ? "bg-violet-100 text-violet-700"
                    : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                }`
              }
            >
              <Icon size={22} />

              {expanded && (
                <span className="font-semibold">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}