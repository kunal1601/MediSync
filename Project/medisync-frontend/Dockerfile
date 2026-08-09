# ---------- Stage 1: Build React application ----------
FROM node:22 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including platform-specific optional dependencies
RUN npm install --include=optional

# Copy application source
COPY . .

# Build React application
RUN npm run build


# ---------- Stage 2: Serve React using Nginx ----------
FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
