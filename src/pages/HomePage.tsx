import React, { useMemo } from "react";
import { FiBook, FiChevronDown } from "react-icons/fi";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { BookCard as BookCardBase } from "@/components/BookCard";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import useBooks from "@/hooks/useBooks";
import SkeletonBookCard from "@/components/skeletons/SkeletonBookCard";

const BookCard = React.memo(BookCardBase);

const HomePage = () => {
  const { books, isLoading, error, hasMore, fetchMoreBooks, totalCount } =
    useBooks(2000);

  const lastElementRef = useInfiniteScroll({
    fetchMore: fetchMoreBooks,
    hasMore,
    isLoading,
  });

  const bookCards = useMemo(
    () =>
      books.map((book, idx) => {
        if (idx === books.length - 1) {
          return <BookCard ref={lastElementRef} key={book.id} book={book} />;
        }
        return <BookCard key={book.id} book={book} />;
      }),
    [books, lastElementRef]
  );

  if (error) {
    return (
      <ErrorDisplay message={error} onRetry={fetchMoreBooks} className="mb-8" />
    );
  }

  if (books.length === 0 && isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, idx) => (
          <SkeletonBookCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 text-secondary-800">
      <main className="container mx-auto px-4 py-8">
        {books.length === 0 && !isLoading && !error && (
          <div className="text-center py-16 bg-white rounded-xl border border-secondary-200 mt-8">
            <FiBook className="text-5xl mx-auto text-secondary-400 mb-4" />
            <p className="text-secondary-600 text-lg">
              No hay libros disponibles para mostrar.
            </p>
          </div>
        )}

        {books.length > 0 && (
          <>
            <div className="mb-8 mt-4">
              <div className="flex flex-wrap justify-between items-center">
                <h2 className="text-2xl font-semibold text-primary-600 flex items-center">
                  <FiBook className="mr-2" />
                  Libros Populares
                  <span className="text-secondary-500 text-sm ml-2 bg-secondary-100 px-2 py-1 rounded-full">
                    {books.length} de {Math.min(2000, totalCount)}
                  </span>
                </h2>
              </div>
              <div className="h-1 w-32 bg-primary-300 rounded-full mt-2"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {bookCards}
            </div>
          </>
        )}

        {hasMore && books.length < 2000 && books.length > 0 && (
          <div
            ref={lastElementRef}
            className="h-24 flex justify-center items-center mt-8"
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <Spinner size="md" color="text-primary-400" />
                <p className="text-secondary-500 mt-2">Cargando más libros...</p>
              </div>
            ) : (
              <div className="text-secondary-600 bg-white px-6 py-3 rounded-full border border-secondary-200 flex items-center shadow-sm hover:bg-secondary-50 transition-all">
                <FiChevronDown className="mr-2 animate-bounce" />
                Desplázate para cargar más libros
              </div>
            )}
          </div>
        )}

        {books.length >= 2000 && (
          <div className="text-center text-secondary-500 mt-8 py-4 border-t border-secondary-200">
            Has alcanzado el límite de 2000 libros cargados.
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
