import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import PrivateLayout from "@/layouts/PrivateLayout";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <PrivateLayout />;
};

export default PrivateRoute;
