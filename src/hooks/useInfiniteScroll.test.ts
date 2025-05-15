import { renderHook, act } from "@testing-library/react";
import useInfiniteScroll from "./useInfiniteScroll";

// Mock para IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  // Reseteamos los mocks entre tests
  mockIntersectionObserver.mockReset();
  mockObserve.mockReset();
  mockDisconnect.mockReset();

  // Configuramos el mock del IntersectionObserver
  mockIntersectionObserver.mockImplementation((callback) => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: jest.fn(),
    // Guardamos el callback para poder invocarlo en los tests
    triggerCallback: (entries: IntersectionObserverEntry[]) =>
      callback(entries),
  }));

  // Sobreescribimos IntersectionObserver global
  global.IntersectionObserver = mockIntersectionObserver;
});

describe("useInfiniteScroll", () => {
  test("debería llamar a fetchMore cuando el elemento es visible y hay más datos", () => {
    const fetchMore = jest.fn().mockResolvedValue(undefined);

    renderHook(() =>
      useInfiniteScroll({
        fetchMore,
        hasMore: true,
        isLoading: false,
      })
    );

    // Obtenemos la instancia del observer mock
    const observerInstance = mockIntersectionObserver.mock.results[0].value;

    // Simulamos que el elemento está visible (intersecting)
    act(() => {
      observerInstance.triggerCallback([{ isIntersecting: true }]);
    });

    expect(fetchMore).toHaveBeenCalledTimes(1);
  });

  test("no debería llamar a fetchMore cuando isLoading es true", () => {
    const fetchMore = jest.fn().mockResolvedValue(undefined);

    renderHook(() =>
      useInfiniteScroll({
        fetchMore,
        hasMore: true,
        isLoading: true, // está cargando
      })
    );

    const observerInstance = mockIntersectionObserver.mock.results[0].value;

    // Simulamos que el elemento está visible
    act(() => {
      observerInstance.triggerCallback([{ isIntersecting: true }]);
    });

    // No debería llamar a fetchMore porque está cargando
    expect(fetchMore).not.toHaveBeenCalled();
  });
});
