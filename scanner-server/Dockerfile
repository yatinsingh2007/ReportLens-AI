FROM node:18

WORKDIR /src

ENV PORT=${PORT}

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]