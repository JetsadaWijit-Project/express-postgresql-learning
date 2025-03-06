# Use an official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy the entire source folder (including package.json)
COPY . .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
