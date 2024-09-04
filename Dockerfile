FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install necessary polyfills for Webpack 5
RUN npm install path-browserify os-browserify crypto-browserify

# Copy the rest of the application files
COPY . .

# Update Webpack configuration to include polyfills
RUN echo "module.exports = { resolve: { fallback: { \"path\": require.resolve('path-browserify'), \"os\": require.resolve('os-browserify/browser'), \"crypto\": require.resolve('crypto-browserify') } } };" > webpack.config.js

# Build the application
RUN npm run build

# Set environment variable and expose port
ENV PORT=4200
EXPOSE $PORT

# Run the application in production mode
CMD npm run prod
