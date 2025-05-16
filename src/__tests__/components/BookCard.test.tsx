import { render, screen } from "@testing-library/react";
import { BookCard } from "../../components/BookCard";

describe("BookCard Component", () => {
  const mockBook = {
    id: 1,
    title: "El Quijote",
    formats: {
      "image/jpeg": "https://example.com/image.jpg",
    },
    authors: [
      {
        name: "Miguel de Cervantes",
        birth_year: 1547,
        death_year: 1616,
      },
    ],
    download_count: 1500,
  };

  test("renderiza correctamente con todos los datos del libro", () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText("El Quijote")).toBeInTheDocument();

    expect(screen.getByText(/Miguel de Cervantes/)).toBeInTheDocument();

    expect(screen.getByText("(1547 - 1616)")).toBeInTheDocument();

    const image = screen.getByAltText("Portada de El Quijote");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  test("renderiza correctamente sin imagen", () => {
    const bookWithoutImage = {
      ...mockBook,
      formats: {},
    };

    render(<BookCard book={bookWithoutImage} />);

    expect(
      screen.queryByAltText("Portada de El Quijote")
    ).not.toBeInTheDocument();

    const bookIcon = screen.getByTestId("book-icon");
    expect(bookIcon).toBeInTheDocument();
  });

  test("renderiza correctamente sin autor", () => {
    const bookWithoutAuthor = {
      ...mockBook,
      authors: [],
    };

    render(<BookCard book={bookWithoutAuthor} />);

    expect(screen.getByText("Autor desconocido")).toBeInTheDocument();
  });

  test("renderiza correctamente con autor sin años", () => {
    const bookWithAuthorNoYears = {
      ...mockBook,
      authors: [{ name: "Autor Moderno" }],
    };

    render(<BookCard book={bookWithAuthorNoYears} />);

    expect(screen.getByText("Autor Moderno")).toBeInTheDocument();
    expect(screen.queryByText(/\(\d+ - \d+\)/)).not.toBeInTheDocument();
  });
});
