# Multi-stage build for NestJS on Node 20

# 1) Build stage
FROM node:20-slim AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy sources
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src
COPY .env.example ./

# Build
RUN npm run build

# 2) Production stage
FROM node:20-slim AS runner
WORKDIR /app

# Copy only needed files
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/main.js"]
