import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiAlertCircle, FiBook, FiChevronDown } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { useAuth } from "@/hooks/useAuth";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import bookService from "@/services/books/books.service";
import { BookCard } from "@/components/BookCard";
import { Spinner } from "@/components/ui/Spinner";
import type { Book } from "@/interfaces/books/book.interface";

const HomePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resultsPerPage = 32;
  const totalPages = Math.ceil(totalCount / resultsPerPage);
  const hasMore = hasNext && books.length < 2000;

  console.log("currentpage", currentPage, totalPages);
  useEffect(() => {
    const initialLoad = async () => {
      if (books.length > 0) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await bookService.getBooks(1);

        setBooks(data.results);
        setTotalCount(data.count);
        setCurrentPage(1);
        setHasNext(!!data.next);
      } catch (err) {
        setError("Error al cargar los libros.");
        console.log("error", err);
      } finally {
        setIsLoading(false);
      }
    };

    initialLoad();
  }, [books.length]);

  const fetchMoreBooks = useCallback(
    async (pageToFetch: number) => {
      if (isLoading || books.length >= 2000 || !hasNext) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await bookService.getBooks(pageToFetch);

        setBooks((prevBooks) => {
          // Usar el estado anterior para calcular correctamente
          const remainingSlots = 2000 - prevBooks.length;
          const newBooks = data.results.slice(0, remainingSlots);
          const combined = [...prevBooks, ...newBooks];

          // Garantizar que nunca excedamos 2000 libros
          return combined.slice(0, 2000);
        });

        setTotalCount(data.count);
        setCurrentPage(pageToFetch);

        // Actualizar hasNext basado en la respuesta de la API
        setHasNext(!!data.next);
      } catch (err: unknown) {
        setError("Error al cargar los libros.");
        console.log("error", err);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasNext]
  );

  const { loadMoreRef } = useInfiniteScroll({
    fetchMore: async () => {
      if (hasMore && books.length < 2000) {
        return fetchMoreBooks(currentPage + 1);
      }
      return Promise.resolve();
    },
    hasMore: hasMore,
    isLoading: isLoading,
  });

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
      <nav className="sticky top-0 z-10 bg-indigo-900/80 backdrop-blur-md border-b border-indigo-700 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BiLibrary className="text-3xl text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Biblioteca Digital
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gradient-to-r cursor-pointer from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-full transition duration-300 flex items-center md:space-x-2 shadow-md"
          >
            <FiLogOut className="text-lg" />
            <span className="hidden md:inline">Cerrar Sesión</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-400 rounded-xl p-4 flex items-center">
            <FiAlertCircle className="text-xl text-red-400 mr-3" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {books.length === 0 && !isLoading && !error && (
          <div className="text-center py-16 bg-indigo-800/20 rounded-xl border border-indigo-700 mt-8">
            <FiBook className="text-5xl mx-auto text-indigo-400 mb-4" />
            <p className="text-indigo-300 text-lg">
              No hay libros disponibles para mostrar.
            </p>
          </div>
        )}

        {books.length === 0 && isLoading && (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" color="text-purple-400" />
          </div>
        )}

        {books.length > 0 && (
          <>
            <div className="mb-8 mt-4">
              <div className="flex flex-wrap justify-between items-center">
                <h2 className="text-2xl font-semibold text-purple-300 flex items-center">
                  <FiBook className="mr-2" />
                  Libros Populares
                  <span className="text-indigo-400 text-sm ml-2 bg-indigo-800/40 px-2 py-1 rounded-full">
                    {books.length} de {Math.min(2000, totalCount)}
                  </span>
                </h2>
              </div>

              <div className="h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}

        {hasMore && books.length < 2000 && books.length > 0 && (
          <div
            ref={loadMoreRef}
            className="h-24 flex justify-center items-center mt-8"
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <Spinner size="md" color="text-purple-400" />
                <p className="text-purple-400 mt-2">Cargando más libros...</p>
              </div>
            ) : (
              <div className="text-indigo-300 bg-indigo-800/30 px-6 py-3 rounded-full border border-indigo-600 flex items-center shadow-md hover:bg-indigo-700/30 transition-all">
                <FiChevronDown className="mr-2 animate-bounce" />
                Desplázate para cargar más libros
              </div>
            )}
          </div>
        )}

        {books.length >= 2000 && (
          <div className="text-center text-indigo-400 mt-8 py-4 border-t border-indigo-800">
            Has alcanzado el límite de 2000 libros cargados.
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
