import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  fetchMore: () => Promise<void>; // Función que carga más datos
  hasMore: boolean; // Si hay más datos para cargar
  isLoading: boolean; // Si actualmente está cargando
  threshold?: number; // Cuán cerca del final para disparar (0.0 a 1.0)
  rootMargin?: string; // Margen para el Intersection Observer
}

const useInfiniteScroll = ({
  fetchMore,
  hasMore,
  isLoading,
  threshold = 0.8,
  rootMargin = "0px 0px 200px 0px", // Carga 200px antes de llegar al final
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // Elemento a observar

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        fetchMore();
      }
    },
    [fetchMore, hasMore, isLoading]
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: rootMargin,
      threshold: threshold,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, rootMargin, threshold, hasMore, isLoading]);

  return { loadMoreRef };
};

export default useInfiniteScroll;
