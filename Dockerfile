# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy backend files
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the entire project (including frontend)
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Move back to backend directory
WORKDIR /app

# Expose backend port (change if needed)
EXPOSE 5000

# Start backend
CMD ["node", "server.js"]
