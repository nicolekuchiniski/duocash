import { RouterProvider } from "react-router-dom";

import { router } from "./routes/router";
import { FinanceProvider } from "./contexts/FinanceContext";

function App() {
  return (
    <FinanceProvider>
      <RouterProvider router={router} />
    </FinanceProvider>
  );
}

export default App;