import { forwardRef } from "react";
import { FiDownload, FiBookOpen } from "react-icons/fi";
import type { Book } from "@/interfaces/books/book.interface";
import { formatNumber } from "@/utils/formatNumber";

interface BookCardProps {
  book: Book;
}

export const BookCard = forwardRef<HTMLDivElement, BookCardProps>(
  ({ book }, ref) => {
    const authorName =
      book.authors && book.authors.length > 0
        ? book.authors[0].name
        : "Autor desconocido";

    const authorYears =
      book.authors && book.authors.length > 0 && book.authors[0].birth_year
        ? `(${book.authors[0].birth_year} - ${
            book.authors[0].death_year || "Presente"
          })`
        : "";

    return (
      <div
        ref={ref}
        className="bg-secondary-50 border border-secondary-200 text-secondary-900 rounded-xl"
      >
        <div
          className="relative overflow-hidden"
          style={{ minHeight: "200px" }}
        >
          {book.formats?.["image/jpeg"] && (
            <img
              src={book.formats["image/jpeg"]}
              alt={`Portada de ${book.title}`}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl"
              style={{ aspectRatio: "2/3" }}
              loading="lazy"
            />
          )}
          {!book.formats?.["image/jpeg"] && (
            <div className="flex items-center h-[335px] justify-center bg-secondary-100 text-secondary-400 p-4 text-center rounded-xl">
              <FiBookOpen
                className="h-16 w-16 opacity-50"
                data-testid="book-icon"
              />
            </div>
          )}
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3
              className="text-lg font-semibold text-primary-700 mb-1 line-clamp-2"
              title={book.title}
            >
              {book.title}
            </h3>
            <p className="text-secondary-700 text-sm mb-2 italic">
              {authorName}{" "}
              <span className="text-secondary-500 text-xs">{authorYears}</span>
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-secondary-200">
            <div className="flex items-center text-secondary-600 text-xs">
              <FiDownload className="h-4 w-4 mr-1" />
              <span>{formatNumber(book.download_count)} descargas</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
