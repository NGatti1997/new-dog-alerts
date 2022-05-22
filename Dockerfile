FROM node:18.1-buster-slim

#create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]