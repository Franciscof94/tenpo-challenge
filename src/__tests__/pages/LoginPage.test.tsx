import type { ReactNode } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import authService from "../../services/auth/auth.service";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


jest.mock("../../services/auth/auth.service");
const mockAuthService = authService as jest.Mocked<typeof authService>;

jest.mock("../../hooks/useAuth");
const mockUseAuth = useAuth as jest.Mock;

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  useNavigate: jest.fn(),
}));
const mockUseNavigate = useNavigate as jest.Mock;

describe("LoginPage Component (Short Test)", () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockAuthService.fakeLogin.mockClear();
    mockLogin.mockClear();
    mockNavigate.mockClear();
    mockUseNavigate.mockReturnValue(mockNavigate);

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      token: null,
      login: mockLogin,
      logout: jest.fn(),
    });
  });

  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };

  test("renderiza el formulario de login", () => {
    renderWithRouter();

    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Ingresar/i })
    ).toBeInTheDocument();
  });

  test("maneja el login exitoso y navega a la página principal", async () => {
    const fakeToken = "fake-test-token";
    mockAuthService.fakeLogin.mockResolvedValue({ token: fakeToken });

    renderWithRouter();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole("button", { name: /Ingresar/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Ingresando.../i)).not.toBeInTheDocument();
    });

    expect(mockAuthService.fakeLogin).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );

    expect(mockLogin).toHaveBeenCalledWith(fakeToken);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
