# RAPTRON Digital Solutions

This is the main website and frontend application for RAPTRON Digital Solutions. It features a modern tech stack designed for speed, SEO, and robust CRM integration.

## Tech Stack
- **Frontend Framework**: React 19
- **Routing**: TanStack Router (File-based routing)
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Backend / Proxy**: Express (Node.js) to securely proxy requests to Odoo CRM.

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm or pnpm

### Installation
1. Clone the repository and navigate to the project folder:
   ```bash
   npm install
   ```

2. Set up your environment variables by copying `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the `ODOO_API_KEY` and `ODOO_BASE_URL` with your actual credentials.

### Running the Application

To run both the Vite frontend and the secure Express proxy server simultaneously, use:

```bash
npm run dev:full
```

This will spin up:
- The Express proxy server on `http://localhost:5000` (handles `/api` requests to Odoo).
- The Vite development server on `http://localhost:8080`.

Open `http://localhost:8080` in your browser.

## Available Scripts

- `npm run dev`: Starts the Vite dev server only.
- `npm run server`: Starts the Express proxy server only.
- `npm run dev:full`: Starts both the proxy server and the Vite dev server concurrently.
- `npm run build`: Builds the app for production (creates a `dist` folder).
- `npm run lint`: Runs ESLint to check for code formatting and quality issues.
- `npm run preview`: Previews the production build locally.

## Project Structure
- `/src`: Contains the React frontend code.
  - `/routes`: File-based routes for TanStack Router.
  - `/components`: Reusable UI components.
  - `/lib`: Helper functions and constants.
- `server.cjs`: The Express backend that securely proxies API requests to Odoo.

## Security Note
This application securely proxies requests to Odoo through `server.cjs`. **Never** expose the `ODOO_API_KEY` or `ODOO_BASE_URL` directly to the frontend. Ensure these variables are stored in your `.env.local` or production environment without the `VITE_` prefix so they are stripped from the frontend bundle.
