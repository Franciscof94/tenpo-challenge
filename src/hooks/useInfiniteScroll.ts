import { useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  fetchMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
}

const useInfiniteScroll = ({
  fetchMore,
  hasMore,
  isLoading,
}: UseInfiniteScrollOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchMore();
          }
        },
        {
          root: null,
          rootMargin: "0px 0px 200px 0px",
          threshold: 0.8,
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [fetchMore, hasMore, isLoading]
  );

  return lastElementRef;
};

export default useInfiniteScroll;
