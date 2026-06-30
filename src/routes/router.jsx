import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Carteiras from "../pages/Carteiras/Carteiras";
import Cartoes from "../pages/Cartoes/Cartoes";
import InstallmentsTest from "../pages/Testes/InstallmentsTest"
import Lancamentos from "../pages/Lancamentos/Lancamentos";
import Categorias from "../pages/Categorias/Categorias";

function PlaceholderPage({ title }) {
  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-black text-violet-700">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        Essa página será construída em breve.
      </p>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
  path: "lancamentos",
  element: <Lancamentos />,
},
      {
        path: "casal",
        element: <PlaceholderPage title="Casal" />,
      },
      {
  path: "carteiras",
  element: <Carteiras />,
},
      {
  path: "cartoes",
  element: <Cartoes />,
},
      {
        path: "metas",
        element: <PlaceholderPage title="Metas" />,
      },
      {
  path: "categorias",
  element: <Categorias />,
},
      {
        path: "configuracoes",
        element: <PlaceholderPage title="Configurações" />,
      },
      {
  path: "teste-parcelas",
  element: <InstallmentsTest />,
},
    ],
  },
]);