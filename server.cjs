/**
 * server.cjs
 *
 * Secure Express proxy server that bridges the Raptron frontend with the
 * Odoo CRM backend. Keeps the Odoo API key out of the browser by running
 * all authenticated requests server-side.
 *
 * Endpoints:
 *   POST /api/contact          — Contact form → creates a crm.lead
 *   POST /api/request-demo     — ERP demo request → creates a crm.lead
 *   POST /api/book-appointment — Consultation booking → creates a calendar.event
 */
"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");

// Load .env.local first (Vite convention), then fall back to .env
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const ODOO_API_KEY = process.env.ODOO_API_KEY;
const ODOO_BASE_URL = process.env.ODOO_BASE_URL || "https://hq.syscomatic.com";

if (!ODOO_API_KEY) {
  console.error("CRITICAL: ODOO_API_KEY is not set in the environment.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Odoo API helpers
// ---------------------------------------------------------------------------

/**
 * Makes an authenticated JSON-RPC call to the Odoo REST API.
 * @param {string} model  - The Odoo model name (e.g. "crm.lead")
 * @param {string} method - The method to call (e.g. "create", "search_read")
 * @param {object} payload - The request body payload
 * @returns {Promise<unknown>} The parsed JSON response from Odoo
 */
async function callOdoo(model, method, payload) {
  const url = `${ODOO_BASE_URL}/json/2/${model}/${method}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ODOO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Odoo API Error (${response.status}): ${errorText}`);
  }

  return response.json();
}

/**
 * Finds an existing res.partner by email, or creates a new one.
 * @returns {Promise<number>} The Odoo partner ID
 */
async function findOrCreatePartner(name, email, phone) {
  try {
    const existing = await callOdoo("res.partner", "search_read", {
      domain: [["email", "=", email]],
      fields: ["id", "name"],
      limit: 1,
    });

    if (existing && existing.length > 0) {
      console.log(`Found partner ID: ${existing[0].id} for ${email}`);
      return existing[0].id;
    }

    console.log(`Creating new partner for ${email}`);
    const result = await callOdoo("res.partner", "create", {
      vals_list: [
        {
          name,
          email,
          phone: phone || "",
          is_company: false,
        },
      ],
    });

    const newId = Array.isArray(result) ? result[0] : result;
    console.log(`Created partner ID: ${newId}`);
    return newId;
  } catch (error) {
    console.error("Error in findOrCreatePartner:", error.message);
    throw error;
  }
}

/**
 * Finds an existing crm.tag by name, or creates a new one.
 * Returns null on failure so the caller can proceed without a tag.
 * @returns {Promise<number|null>} The Odoo tag ID, or null
 */
async function findOrCreateTag(tagName) {
  try {
    const existing = await callOdoo("crm.tag", "search_read", {
      domain: [["name", "=", tagName]],
      fields: ["id"],
      limit: 1,
    });

    if (existing && existing.length > 0) {
      console.log(`Found CRM tag ID: ${existing[0].id} for "${tagName}"`);
      return existing[0].id;
    }

    console.log(`Creating new CRM tag: "${tagName}"`);
    const result = await callOdoo("crm.tag", "create", {
      vals_list: [{ name: tagName }],
    });

    const newId = Array.isArray(result) ? result[0] : result;
    console.log(`Created CRM tag ID: ${newId}`);
    return newId;
  } catch (error) {
    console.error("Error in findOrCreateTag:", error.message);
    return null;
  }
}

/**
 * Returns the partner_id of the first internal (non-portal) user.
 * Used to include a company representative in booked calendar events.
 * @returns {Promise<number|null>}
 */
async function getMainInternalPartner() {
  try {
    const result = await callOdoo("res.users", "search_read", {
      domain: [["share", "=", false]],
      fields: ["partner_id"],
      limit: 1,
      order: "id asc",
    });

    if (result && result.length > 0) {
      return result[0].partner_id[0];
    }

    return null;
  } catch (error) {
    console.error("Error in getMainInternalPartner:", error.message);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * POST /api/contact
 * Handles the website contact form. Creates a CRM lead in Odoo.
 *
 * Required body fields: name, email, subject, message
 * Optional body fields: company, phone
 */
app.post("/api/contact", async (req, res) => {
  const { name, company, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: "Missing required fields: name, email, subject, message",
    });
  }

  try {
    const partnerId = await findOrCreatePartner(name, email, phone);

    const leadResult = await callOdoo("crm.lead", "create", {
      vals_list: [
        {
          name: `Contact Inquiry: ${subject}`,
          partner_id: partnerId,
          contact_name: name,
          email_from: email,
          phone: phone || "",
          partner_name: company || "",
          description: `<p>${message.replace(/\n/g, "<br/>")}</p>`,
        },
      ],
    });

    const leadId = Array.isArray(leadResult) ? leadResult[0] : leadResult;
    console.log(`Created CRM lead ID: ${leadId} (contact inquiry)`);
    return res.status(200).json({ success: true, leadId });
  } catch (error) {
    console.error("Error in /api/contact:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

/**
 * POST /api/request-demo
 * Handles the ERP demo request form. Creates a tagged CRM lead in Odoo.
 *
 * Required body fields: name, company, email
 * Optional body fields: phone, website, industry, size, modules, requirements
 */
app.post("/api/request-demo", async (req, res) => {
  const {
    name,
    company,
    email,
    phone,
    website,
    industry,
    size,
    modules,
    requirements,
  } = req.body;

  if (!name || !company || !email) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name, company, email" });
  }

  try {
    const partnerId = await findOrCreatePartner(name, email, phone);

    // Resolve industry to a CRM tag (create if it doesn't exist)
    let tagIds = [];
    if (industry) {
      const tagId = await findOrCreateTag(industry);
      if (tagId) {
        tagIds = [[6, false, [tagId]]];
      }
    }

    // Build the lead description from structured form fields
    const description = [
      `<p>Company Size: ${size || "Not provided"}</p>`,
      `<p>ERP Modules of Interest: ${modules || "None selected"}</p>`,
      `<p>Specific Requirements: ${requirements || "None specified"}</p>`,
    ].join("");

    const leadResult = await callOdoo("crm.lead", "create", {
      vals_list: [
        {
          name: `ERP Demo Request: ${company}`,
          partner_id: partnerId,
          contact_name: name,
          email_from: email,
          phone: phone || "",
          partner_name: company,
          website: website || "",
          tag_ids: tagIds,
          description,
        },
      ],
    });

    const leadId = Array.isArray(leadResult) ? leadResult[0] : leadResult;
    console.log(`Created CRM lead ID: ${leadId} (ERP demo request)`);
    return res.status(200).json({ success: true, leadId });
  } catch (error) {
    console.error("Error in /api/request-demo:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

/**
 * POST /api/book-appointment
 * Handles the consultation booking form. Creates a 45-minute calendar.event in Odoo,
 * adding both the prospective client and the main internal user as attendees.
 *
 * Required body fields: name, email, dateTime (ISO 8601 string)
 * Optional body fields: company, phone, message
 */
app.post("/api/book-appointment", async (req, res) => {
  const { name, company, email, phone, message, dateTime } = req.body;

  if (!name || !email || !dateTime) {
    return res.status(400).json({
      error: "Missing required fields: name, email, dateTime",
    });
  }

  try {
    const partnerId = await findOrCreatePartner(name, email, phone);
    const internalPartnerId = await getMainInternalPartner();

    const startDate = new Date(dateTime);
    const stopDate = new Date(startDate.getTime() + 45 * 60_000); // 45-minute session

    // Odoo expects UTC datetime strings in "YYYY-MM-DD HH:MM:SS" format
    const toOdooDate = (d) =>
      d.toISOString().replace("T", " ").substring(0, 19);

    const description = [
      `<p>Company: ${company || "Not provided"}</p>`,
      `<p>Message: ${message || "No additional message"}</p>`,
      `<p>Source: Website Booking</p>`,
    ].join("");

    const attendees = internalPartnerId
      ? [
          [4, partnerId],
          [4, internalPartnerId],
        ]
      : [[4, partnerId]];

    const eventResult = await callOdoo("calendar.event", "create", {
      vals_list: [
        {
          name: `Consultation: ${name}`,
          start: toOdooDate(startDate),
          stop: toOdooDate(stopDate),
          allday: false,
          appointment_type_id: 1,
          partner_ids: attendees,
          description,
        },
      ],
    });

    const eventId = Array.isArray(eventResult) ? eventResult[0] : eventResult;
    console.log(`Created calendar event ID: ${eventId} (consultation)`);
    return res.status(200).json({ success: true, eventId });
  } catch (error) {
    console.error("Error in /api/book-appointment:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Odoo CRM Proxy Server running on port ${PORT}`);
  console.log(`Targeting Odoo at: ${ODOO_BASE_URL}`);
});
