FROM node:21-alpine3.18
WORKDIR /app/server
COPY package*.json ./
RUN npm install
COPY ./ .
EXPOSE 5000
CMD ["node", "server"]