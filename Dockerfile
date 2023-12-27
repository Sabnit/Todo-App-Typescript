# Using Node-alpine as base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency to the working directory
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .


EXPOSE 3000

# Command to start the application
CMD npm run dev -- --host