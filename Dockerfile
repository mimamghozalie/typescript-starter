# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build


# Expose the port the app will listen on
EXPOSE 3000

# Start the app when the container starts
CMD ["node", "dist/main.js"]