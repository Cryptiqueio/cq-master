# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy entire app directory
COPY . .

# ✅ Ensure the container listens on the correct port
EXPOSE 5000

# ✅ Run the application
CMD ["node", "index.js"]
