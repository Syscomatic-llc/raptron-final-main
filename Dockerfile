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
FROM nginx:alpine AS runner

# The official Nginx image has envsubst built-in and will process
# /etc/nginx/templates/*.template into /etc/nginx/conf.d/*.conf at startup.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the built static assets into Nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port aaPanel will reverse-proxy to
EXPOSE 9500

CMD ["nginx", "-g", "daemon off;"]
