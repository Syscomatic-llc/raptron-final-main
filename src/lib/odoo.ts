/**
 * Odoo REST API client — Raptron website.
 *
 * All requests target /odoo-api/{model}/{method}, a relative path handled by:
 *   - Vite dev proxy (local): injects Authorization from .env.local
 *   - Nginx reverse proxy (production): injects Authorization from server config
 *
 * The API key never appears in the compiled JS bundle.
 */

const ODOO_API_BASE = "/odoo-api";

// Core

/**
 * Issues a POST to the Odoo JSON REST API v2 endpoint for the given model
 * and method. Throws a descriptive Error on any non-2xx response.
 */
async function callOdoo<T = unknown>(
  model: string,
  method: string,
  payload: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${ODOO_API_BASE}/${model}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "No details available");
    throw new Error(
      `Odoo ${model}/${method} failed (${response.status}): ${detail}`,
    );
  }

  return response.json() as Promise<T>;
}

// Partners

/**
 * Resolves a res.partner by email. Returns the existing partner ID when found;
 * otherwise creates a new contact record and returns the new ID.
 */
export async function findOrCreatePartner(
  name: string,
  email: string,
  phone?: string,
): Promise<number> {
  const existing = await callOdoo<{ id: number }[]>(
    "res.partner",
    "search_read",
    {
      domain: [["email", "=", email]],
      fields: ["id"],
      limit: 1,
    },
  );

  if (existing.length > 0) return existing[0].id;

  const result = await callOdoo<number[]>("res.partner", "create", {
    vals_list: [{ name, email, phone: phone ?? "", is_company: false }],
  });

  return Array.isArray(result) ? result[0] : (result as number);
}

// Tags

/**
 * Resolves a crm.tag by name. Creates one if it does not exist.
 * Returns null on failure — tag resolution is non-blocking for form submission.
 */
export async function findOrCreateTag(tagName: string): Promise<number | null> {
  try {
    const existing = await callOdoo<{ id: number }[]>(
      "crm.tag",
      "search_read",
      {
        domain: [["name", "=", tagName]],
        fields: ["id"],
        limit: 1,
      },
    );

    if (existing.length > 0) return existing[0].id;

    const result = await callOdoo<number[]>("crm.tag", "create", {
      vals_list: [{ name: tagName }],
    });

    return Array.isArray(result) ? result[0] : (result as number);
  } catch {
    return null;
  }
}

// Users

/**
 * Returns the partner_id of the first internal (non-portal) Odoo user,
 * used as the company-side attendee on booked calendar events.
 * Returns null on failure — attendee resolution is non-blocking.
 */
export async function getMainInternalPartner(): Promise<number | null> {
  try {
    const result = await callOdoo<{ partner_id: [number, string] }[]>(
      "res.users",
      "search_read",
      {
        domain: [["share", "=", false]],
        fields: ["partner_id"],
        limit: 1,
        order: "id asc",
      },
    );

    return result.length > 0 ? result[0].partner_id[0] : null;
  } catch {
    return null;
  }
}

// CRM Lead

export interface CreateLeadPayload {
  name: string;
  partner_id: number;
  contact_name: string;
  email_from: string;
  phone?: string;
  partner_name?: string;
  website?: string;
  tag_ids?: [number, boolean, number[]][];
  description?: string;
}

/**
 * Creates a crm.lead record. Returns the new lead ID.
 */
export async function createLead(vals: CreateLeadPayload): Promise<number> {
  const result = await callOdoo<number[]>("crm.lead", "create", {
    vals_list: [vals],
  });

  return Array.isArray(result) ? result[0] : (result as number);
}

// Calendar Event

export interface CreateCalendarEventPayload {
  name: string;
  start: string;
  stop: string;
  allday: boolean;
  appointment_type_id?: number;
  partner_ids: [number, number][];
  description?: string;
}

/**
 * Creates a calendar.event record. Returns the new event ID.
 */
export async function createCalendarEvent(
  vals: CreateCalendarEventPayload,
): Promise<number> {
  const result = await callOdoo<number[]>("calendar.event", "create", {
    vals_list: [vals],
  });

  return Array.isArray(result) ? result[0] : (result as number);
}

// Utilities

/**
 * Formats a Date as the UTC datetime string Odoo expects: "YYYY-MM-DD HH:MM:SS".
 */
export function toOdooDatetime(date: Date): string {
  return date.toISOString().replace("T", " ").substring(0, 19);
}
