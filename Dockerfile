FROM node:18.19.0-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY /env ./dist/env