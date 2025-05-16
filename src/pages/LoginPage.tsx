import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { useAuth } from "@/hooks/useAuth";
import authService from "@/services/auth/auth.service";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await authService.fakeLogin(email, password);
      auth.login(response.token);
      navigate("/");
    } catch (err) {
      setError("Error en el login. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = (email.trim() === "" && password.trim() === "") || loading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 text-secondary-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary-200">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-5 rounded-full">
              <BiLibrary className="h-14 w-14 text-primary-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-center text-primary-700">
            Biblioteca Digital
          </h1>

          <p className="text-secondary-700 text-center mb-8">
            Accede a tu cuenta para explorar miles de libros
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-secondary-700 mb-1"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                  iconLeft={<FiMail className="h-5 w-5 text-secondary-500" />}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-secondary-700 mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  iconLeft={<FiLock className="h-5 w-5 text-secondary-500" />}
                />
              </div>
            </div>

            {error && (
              <div className="bg-error/10 border border-error rounded-xl p-4 flex items-center">
                <FiAlertCircle className="h-5 w-5 text-error mr-2" />
                <p className="text-secondary-800 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isDisabled}
              isLoading={loading}
              iconLeft={<FiLogIn className="h-5 w-5" />}
              className="w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-sm"
            >
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
