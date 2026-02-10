/**
 * Auth utilities – static site: no authentication. Kept for compatibility.
 */

export async function checkAuth(): Promise<null> {
  return null;
}

export function clearAuthCache(): void {
  // no-op
}

export function getCachedUser(): null {
  return null;
}

export async function isUserAuthenticated(): Promise<boolean> {
  return false;
}
