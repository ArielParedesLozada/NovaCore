FROM node:20-alpine AS builder

RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000

CMD ["node", "./dist/index.js"]