# Use an official Node.js runtime as a parent image
FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# CMD [ "npm", "run", "dev" ]
CMD [ "npm", "run", "preview" ]
