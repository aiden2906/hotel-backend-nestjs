FROM node:12.18.2-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./src /app/src
CMD [ "npm", "start" ]
