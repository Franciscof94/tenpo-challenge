import { type ReactNode } from "react";
import { renderHook, act, type RenderHookResult } from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import { AUTH_KEY } from "../../routes/routes";
import { AuthProvider } from "@/context/provider/auth/AuthProvider";
import type { AuthContextType } from "@/context/context/auth/AuthContext";

const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("useAuth Hook", () => {
  beforeEach(() => {
    mockSessionStorage.clear();
  });

  test("login establece el token y actualiza isAuthenticated", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper,
    }) as RenderHookResult<AuthContextType, unknown>;

    act(() => {
      result.current.login("test-token");
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBe("test-token");
  });

  test("logout elimina el token y actualiza isAuthenticated", () => {
    mockSessionStorage.setItem(AUTH_KEY, "test-token");

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    }) as RenderHookResult<AuthContextType, unknown>;

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.token).toBeNull();
  });
});
