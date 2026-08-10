# ---------- Stage 1: Build React application ----------
FROM node:22-bookworm AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies including optional dependencies
RUN npm install --include=optional

# Install the matching Linux x64 native dependencies
RUN OXIDE_VERSION=$(node -p "require('./node_modules/@tailwindcss/oxide/package.json').version") && \
    ROLLDOWN_VERSION=$(node -p "require('./node_modules/rolldown/package.json').version") && \
    LIGHTNINGCSS_VERSION=$(node -p "require('./node_modules/lightningcss/package.json').version") && \
    npm install --no-save \
      "@tailwindcss/oxide-linux-x64-gnu@$OXIDE_VERSION" \
      "@rolldown/binding-linux-x64-gnu@$ROLLDOWN_VERSION" \
      "lightningcss-linux-x64-gnu@$LIGHTNINGCSS_VERSION"

# Copy application source
COPY . .

# Build React application
RUN npm run build


# ---------- Stage 2: Nginx ----------
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy React build
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
