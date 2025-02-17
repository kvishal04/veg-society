# Use the official Node.js 20 Alpine image
FROM node:20-alpine

# Install dependencies and create a non-root user
RUN adduser -S appuser \
    && apk add --no-cache bash build-base python3 su-exec

# Set the working directory
WORKDIR /app

# Copy package and config files and folders
COPY package.json package-lock.json postcss.config.mjs tailwind.config.ts tsconfig.json next.config.ts ./
COPY src/ ./src/
COPY public/ ./public/

# Ensure directories exist before changing ownership
RUN mkdir -p /app/src /app/public \
    && chown -R appuser /app \
    && npm install \
    && chown -R appuser /app/node_modules

# Switch to non-root user
USER appuser

# Build the application
RUN npm run build

# Expose ports
EXPOSE 8055

# Start the application
CMD ["npm", "run", "start", "--", "--port", "8055"]
