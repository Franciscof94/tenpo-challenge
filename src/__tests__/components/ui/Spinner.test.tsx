import { render, screen } from "@testing-library/react";
import { Spinner } from "@/components/ui/Spinner";

describe("Spinner Component", () => {
  test("renderiza correctamente con tamaño predeterminado", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinner-svg");
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass("text-3xl");
    expect(spinnerElement).toHaveClass("text-primary-400");
  });

  test("renderiza correctamente con tamaño pequeño", () => {
    render(<Spinner size="sm" />);
    const spinnerElement = screen.getByTestId("spinner-svg");
    expect(spinnerElement).toHaveClass("text-xl");
  });

  test("renderiza correctamente con tamaño grande", () => {
    render(<Spinner size="lg" />);
    const spinnerElement = screen.getByTestId("spinner-svg");
    expect(spinnerElement).toHaveClass("text-5xl");
  });

  test("renderiza correctamente con color personalizado", () => {
    render(<Spinner color="text-red-500" />);
    const spinnerElement = screen.getByTestId("spinner-svg");
    expect(spinnerElement).toHaveClass("text-red-500");
  });
});
