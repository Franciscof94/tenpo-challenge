import { renderHook } from "@testing-library/react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

describe("useInfiniteScroll Hook", () => {
  const mockIntersectionObserver = jest.fn();
  const mockDisconnect = jest.fn();
  const mockObserve = jest.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockReset();
    mockDisconnect.mockReset();
    mockObserve.mockReset();

    mockIntersectionObserver.mockReturnValue({
      disconnect: mockDisconnect,
      observe: mockObserve,
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  test("debe devolver una función ref", () => {
    const fetchMore = jest.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        fetchMore,
        hasMore: true,
        isLoading: false,
      })
    );

    expect(result.current).toBeInstanceOf(Function);
  });

  test("debe llamar a fetchMore cuando el elemento es visible y hasMore es true", () => {
    const fetchMore = jest.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        fetchMore,
        hasMore: true,
        isLoading: false,
      })
    );

    const mockNode = document.createElement("div");
    result.current(mockNode);

    const [callback] = mockIntersectionObserver.mock.calls[0];

    callback([{ isIntersecting: true }]);

    expect(fetchMore).toHaveBeenCalledTimes(1);
  });

  test("no debe llamar a fetchMore cuando hasMore es false", () => {
    const fetchMore = jest.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        fetchMore,
        hasMore: false,
        isLoading: false,
      })
    );

    const mockNode = document.createElement("div");
    result.current(mockNode);

    const [callback] = mockIntersectionObserver.mock.calls[0];
    callback([{ isIntersecting: true }]);

    expect(fetchMore).not.toHaveBeenCalled();
  });
});
