FROM node:14-alpine

WORKDIR /usr/src/app/
EXPOSE 5000

RUN npm install -g serverless
COPY package*.json ./
RUN npm install

COPY . /usr/src/app/