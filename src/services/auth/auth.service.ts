import { AUTH_KEY } from "@/routes/routes";

class AuthService {
  getStoredToken(): string | null {
    try {
      return sessionStorage.getItem(AUTH_KEY);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error getting token:", error.message);
      } else {
        console.error("Unknown error getting token");
      }
      return null;
    }
  }

  async fakeLogin(email: string, password: string): Promise<{ token: string }> {
    console.log(`Attempting fake login for email: ${email}, pass: ${password}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeToken = `fake-jwt-token-${Date.now()}`;
        resolve({ token: fakeToken });
      }, 1000);
    });
  }

  async logout(): Promise<void> {
    sessionStorage.removeItem(AUTH_KEY);
    return Promise.resolve();
  }

  async getCurrentUserSession(): Promise<string | null> {
    return this.getStoredToken();
  }
}

export default new AuthService();
