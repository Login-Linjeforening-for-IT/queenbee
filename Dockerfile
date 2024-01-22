FROM node:21-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
COPY . .
ENV PORT=4200
EXPOSE $PORT
CMD npm start