# RAPTRON Digital Solutions - Website Deployment Guide

This document outlines the step-by-step procedure for deploying the RAPTRON website onto a Hostinger VPS managed by aaPanel.

## Prerequisites
- A Hostinger VPS running **aaPanel**.
- A registered domain name (e.g., `raptron.com`) pointed to your VPS IP address.
- Node.js installed locally to build the project.

---

## Step 1: Build the Project Locally

Before uploading the files to your VPS, you need to compile the React application into static files.

1. Open a terminal in the root directory of this project.
2. Install the dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Run the production build command:
   ```bash
   npm run build
   ```
This will generate a `dist/` folder containing the optimized, production-ready static files.

---

## Step 2: Set Up the Website in aaPanel

1. Log in to your **aaPanel** dashboard.
2. Navigate to the **Website** tab on the left sidebar.
3. Click the **Add site** button.
4. Fill in the details:
   - **Domain name**: Enter your domain (e.g., `raptron.com` and `www.raptron.com`).
   - **Database**: Leave as "No" (this is a static frontend).
   - **PHP version**: Pure static.
5. Click **Submit** to create the site.

---

## Step 3: Upload the Files

1. In aaPanel, go to the **Files** tab.
2. Navigate to your website's root directory (usually `/www/wwwroot/raptron.com`).
3. Upload the *contents* of your local `dist/` folder directly into this directory.
   *(Alternatively, you can upload the entire `dist` folder and configure Nginx to point to it, as shown in the Nginx configuration below).*

---

## Step 4: Configure SSL (HTTPS)

1. Go back to the **Website** tab in aaPanel.
2. Click on the domain name or the **Conf** button next to your site.
3. Select the **SSL** menu.
4. Choose **Let's Encrypt** and select your domains.
5. Click **Apply** to generate and install the free SSL certificate.
6. Enable **Force HTTPS** in the top right corner of the SSL panel.

---

## Step 5: Configure Custom Nginx Settings (SPA & API Proxy)

Because this is a Single Page Application (SPA) utilizing TanStack Router, and because it securely connects to an Odoo backend, you must add custom Nginx rules. 

1. In the Website Configuration window (from Step 4), click on **Config** (or "Config file").
2. Update the configuration to include the SPA fallback and the Odoo API proxy. 

Locate the `server` block and ensure the `root` points to your files, then paste the following `location` blocks inside:

```nginx
    # ── Static SPA root ─────────────────────────────────────────────────────
    # Make sure this path matches where you uploaded the files!
    # If you uploaded the *contents* of dist, it will be just /www/wwwroot/raptron.com
    root /www/wwwroot/raptron.com/dist;
    index index.html;

    # All frontend routes fall back to index.html (React client-side routing)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # ── Odoo API Proxy ───────────────────────────────────────────────────────
    # The browser calls /odoo-api/* (same origin — no CORS issues).
    # Nginx forwards the request to Odoo and INJECTS the Authorization header.
    # The API key lives HERE on the server — it is NEVER in the JS bundle.
    location /odoo-api/ {
        # Strip the /odoo-api prefix and forward to Odoo's JSON REST API v2
        proxy_pass https://hq.syscomatic.com/json/2/;

        # Inject the Odoo Bearer token (replace with your actual API key)
        proxy_set_header Authorization "Bearer YOUR_ODOO_API_KEY_HERE";

        # Standard proxy headers
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Disable caching for API calls
        proxy_cache_bypass $http_pragma;
        proxy_cache_revalidate on;
        expires off;
    }
```

3. Replace `YOUR_ODOO_API_KEY_HERE` with your actual Odoo CRM API key.
4. Click **Save**. aaPanel will automatically test the syntax and reload Nginx.

## Step 6: Verify Deployment

1. Visit `https://raptron.com` in your browser.
2. Verify that the pages load properly.
3. Refresh on a sub-page (e.g., `https://raptron.com/contact`) to ensure the SPA fallback `try_files` rule is working correctly.
4. Test a form submission to verify the `/odoo-api/` Nginx proxy is securely routing requests to Odoo without CORS errors.
