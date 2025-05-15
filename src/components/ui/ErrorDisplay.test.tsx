import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorDisplay } from "./ErrorDisplay";

describe("ErrorDisplay Component", () => {
  test("renderiza con mensaje por defecto", () => {
    render(<ErrorDisplay />);
    expect(
      screen.getByText("Ha ocurrido un error inesperado")
    ).toBeInTheDocument();
  });

  test("renderiza con mensaje personalizado", () => {
    const customMessage = "Error al cargar los datos";
    render(<ErrorDisplay message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  test("no muestra el botón de reintentar cuando no se proporciona onRetry", () => {
    render(<ErrorDisplay />);
    expect(screen.queryByText("Reintentar")).not.toBeInTheDocument();
  });

  test("muestra el botón de reintentar cuando se proporciona onRetry", () => {
    const handleRetry = jest.fn();
    render(<ErrorDisplay onRetry={handleRetry} />);

    const retryButton = screen.getByText("Reintentar");
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  test("aplica clases personalizadas", () => {
    const customClass = "custom-class";
    render(<ErrorDisplay className={customClass} />);

    const container = screen.getByRole("alert");
    expect(container).toHaveClass(customClass);
  });
});
