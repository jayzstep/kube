FROM node:alpine AS frontend-build

WORKDIR /usr/src/app

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

FROM node:alpine AS backend-build

WORKDIR /usr/src/app

COPY server/package*.json ./
RUN npm ci --only=production

FROM node:alpine

WORKDIR /usr/src/app

COPY --from=backend-build /usr/src/app/node_modules ./node_modules
COPY server/package*.json ./
COPY server/index.js ./

COPY --from=frontend-build /usr/src/app/dist ./build

EXPOSE 3000

CMD ["npm", "start"]
