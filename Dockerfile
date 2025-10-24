# Single-stage build for React frontend and Node.js backend

FROM node:18-alpine

WORKDIR /app

# Copy and install backend dependencies
COPY backend/package*.json ./
RUN npm install --only=production

# Copy backend source code
COPY backend/ ./

# Build the frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Move built frontend to backend directory
RUN mv dist ../dist

# Return to backend directory
WORKDIR /app

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
