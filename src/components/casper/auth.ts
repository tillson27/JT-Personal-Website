export const CASPER_PASSWORD = "boo";
export const SESSION_KEY = "casper:auth:v1";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}

export function persistAuth(): void {
  window.sessionStorage.setItem(SESSION_KEY, "1");
}
