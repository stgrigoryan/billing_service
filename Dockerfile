# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli.json ./

# Install dependencies
RUN npm ci --omit-dev && npm run build

# Copy the rest of the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start"]