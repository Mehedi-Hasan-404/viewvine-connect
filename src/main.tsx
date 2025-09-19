// /src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AdminProvider } from "./context/AdminContext.tsx"; // Add this import

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
  </AuthProvider>
);
