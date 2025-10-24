# Multi-stage build for React frontend and Node.js backend

# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ ./

# Build the frontend
RUN npm run build

# Stage 2: Setup the Node.js backend
FROM node:18-alpine AS backend

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies (production only)
RUN npm install --only=production

# Copy backend source code
COPY backend/ ./

# Copy built frontend from the previous stage
COPY --from=frontend-build /app/frontend/dist ./dist

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
