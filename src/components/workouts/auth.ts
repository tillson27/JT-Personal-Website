export const WORKOUTS_PASSWORD = "mobility";
export const SESSION_KEY = "workouts:auth:v1";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.localStorage.getItem(SESSION_KEY) === "1" ||
    window.sessionStorage.getItem(SESSION_KEY) === "1"
  );
}

export function persistAuth(): void {
  window.localStorage.setItem(SESSION_KEY, "1");
  window.sessionStorage.setItem(SESSION_KEY, "1");
}
