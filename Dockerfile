FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=4200
EXPOSE $PORT
CMD npm run prodn