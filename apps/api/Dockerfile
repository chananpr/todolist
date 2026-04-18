# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/contracts/package.json packages/contracts/
COPY apps/api/package.json apps/api/
RUN npm ci --workspace=apps/api --workspace=packages/contracts --include-workspace-root
COPY packages/contracts/ packages/contracts/
COPY apps/api/ apps/api/
RUN npm run build -w @taskforge/contracts
RUN npm run build -w apps/api

# Stage 2: production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/packages/contracts/package.json packages/contracts/
COPY --from=builder /app/packages/contracts/dist/ packages/contracts/dist/
COPY --from=builder /app/apps/api/package.json apps/api/
COPY --from=builder /app/apps/api/dist/ apps/api/dist/
RUN npm ci --workspace=apps/api --workspace=packages/contracts --include-workspace-root --omit=dev
EXPOSE 4000
CMD ["node", "apps/api/dist/server.js"]
