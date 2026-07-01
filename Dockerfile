# syntax=docker/dockerfile:1

# ── Build stage ───────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build the Vite app
COPY . .
RUN npm run build

# ── Production stage ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Install a tiny static file server
RUN npm install -g serve

# Copy only the built static assets from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port aaPanel will reverse-proxy to
EXPOSE 9500

# Serve the SPA on 0.0.0.0:9500
# -s = single-page application mode (serves index.html for unknown routes)
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:9500"]
