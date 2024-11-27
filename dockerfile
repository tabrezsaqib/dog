# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project, including the src folder
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the React application
FROM nginx:stable-alpine

# Copy the built React files from the build stage to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
