import { useState, useEffect, useCallback } from "react";
import bookService from "@/services/books/books.service";
import type { Book } from "@/interfaces/books/book.interface";

interface UseBooksReturn {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchMoreBooks: () => Promise<void>;
  totalCount: number;
}

const useBooks = (limit: number = 2000): UseBooksReturn => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = hasNext && books.length < limit;

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
        console.error("Error cargando libros:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initialLoad();
  }, [books.length]);

  const fetchMoreBooks = useCallback(async () => {
    if (isLoading || books.length >= limit || !hasNext) return;

    const pageToFetch = currentPage + 1;
    setIsLoading(true);
    setError(null);

    try {
      const data = await bookService.getBooks(pageToFetch);

      setBooks((prevBooks) => {
        const remainingSlots = limit - prevBooks.length;
        const newBooks = data.results.slice(0, remainingSlots);
        const combined = [...prevBooks, ...newBooks];

        return combined.slice(0, limit);
      });

      setTotalCount(data.count);
      setCurrentPage(pageToFetch);

      setHasNext(!!data.next);
    } catch (err) {
      setError("Error al cargar los libros.");
      console.error("Error cargando más libros:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasNext, currentPage, books.length, limit]);

  return {
    books,
    isLoading,
    error,
    hasMore,
    fetchMoreBooks,
    totalCount,
  };
};

export default useBooks;
