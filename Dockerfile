# Use a lightweight Node.js image
FROM node:20-alpine AS build

WORKDIR /app

# Copy only package files first
COPY package.json package-lock.json ./

# Install dependencies with safe options
RUN npm install --legacy-peer-deps

# Copy the entire project
COPY . .

# Build the Vite app
# RUN npm run build

# Use Nginx to serve the build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
