FROM node:20-slim

RUN apt-get update && apt-get install -y \
    graphicsmagick \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]
