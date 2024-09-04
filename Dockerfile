FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run build
COPY . .
ENV PORT=4200
EXPOSE $PORT
CMD npm run prod