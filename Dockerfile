FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV PORT=4200

EXPOSE $PORT

# Make sure the script is executable
RUN chmod +x /usr/src/app/docker-entrypoint.sh

# Change ownership of dist files to ensure that sed can modify them
RUN chown -R node:node /usr/src/app/dist

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
