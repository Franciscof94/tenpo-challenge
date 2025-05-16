import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/context/provider/auth/AuthProvider";
import LoginPage from "@/pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "@/pages/HomePage";
import { ROUTES } from "./routes";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path={ROUTES.public.LOGIN} element={<LoginPage />} />

          {/* Rutas Privadas (Protegidas) */}
          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.private.HOME} element={<HomePage />} />
          </Route>
          
          <Route
            path="*"
            element={<Navigate to={ROUTES.public.LOGIN} replace />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;