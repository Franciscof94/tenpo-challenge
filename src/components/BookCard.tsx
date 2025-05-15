import { type FC } from "react";
import { FiDownload, FiBookOpen } from "react-icons/fi";

interface Book {
  id: number;
  title: string;
  formats: {
    "image/jpeg"?: string;
  };
  authors: Array<{
    name: string;
    birth_year?: number;
    death_year?: number;
  }>;
  download_count: number;
}

interface BookCardProps {
  book: Book;
}

export const BookCard: FC<BookCardProps> = ({ book }) => {
  const authorName =
    book.authors && book.authors.length > 0
      ? book.authors[0].name
      : "Autor desconocido";

  const formattedDownloads = new Intl.NumberFormat("es-ES").format(
    book.download_count
  );

  const authorYears =
    book.authors && book.authors.length > 0 && book.authors[0].birth_year
      ? `(${book.authors[0].birth_year} - ${
          book.authors[0].death_year || "Presente"
        })`
      : "";

  return (
    <div className="bg-gradient-to-br from-indigo-800/80 to-purple-900/80 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-indigo-700/50 hover:border-purple-400 h-full flex flex-col group">
      <div className="relative overflow-hidden" style={{ minHeight: "200px" }}>
        {book.formats?.["image/jpeg"] && (
          <img
            src={book.formats["image/jpeg"]}
            alt={`Portada de ${book.title}`}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ aspectRatio: "2/3" }}
            loading="lazy"
          />
        )}
        {!book.formats?.["image/jpeg"] && (
          <div className="flex items-center justify-center h-full bg-indigo-800/50 text-indigo-300 p-4 text-center">
            <FiBookOpen
              className="h-16 w-16 opacity-50"
              data-testid="book-icon"
            />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900 to-transparent h-16"></div>
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-1 line-clamp-2"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-indigo-300 text-sm mb-2 italic">
            {authorName}{" "}
            <span className="text-indigo-400/70 text-xs">{authorYears}</span>
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-indigo-700/50">
          <div className="flex items-center text-indigo-300 text-xs">
            <FiDownload className="h-4 w-4 mr-1" />
            <span>{formattedDownloads} descargas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
