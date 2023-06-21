FROM node:20.0-alpine

WORKDIR /home/Reidecio

COPY package*.json .
COPY package-lock.json .

RUN npm install
RUN npm install -g nodemon

COPY . .


CMD npx nodemon app.js

