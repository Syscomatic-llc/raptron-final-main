export interface CookieConsent {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export const CONSENT_COOKIE_NAME = "cookie_consent";

/**
 * Reads a cookie value by name.
 * Returns null if the cookie is not found or document is not available.
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));

  return match ? match.substring(name.length + 1) : null;
}

/**
 * Sets a cookie with an optional expiry (defaults to 365 days).
 * Uses SameSite=Lax and Secure flags for security.
 */
export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value || ""}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
}

/**
 * Parses and returns the stored cookie consent object.
 * Returns null if no consent has been recorded yet.
 */
export function getConsent(): CookieConsent | null {
  const val = getCookie(CONSENT_COOKIE_NAME);
  if (!val) return null;
  try {
    return JSON.parse(val) as CookieConsent;
  } catch {
    return null;
  }
}

/**
 * Persists the user's cookie consent decision and fires a
 * window event so any listening components can react.
 */
export function setConsent(consent: CookieConsent) {
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(consent));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cookie-consent-updated"));
  }
}
