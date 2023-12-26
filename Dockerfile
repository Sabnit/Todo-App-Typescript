# Use an appropriate base image (e.g., Node.js)
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency to the working directory
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your application runs on
EXPOSE 3000

# Specify the command to start the application
CMD npm run dev -- --host