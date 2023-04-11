# Dockerfile for React client

# Build react client
FROM node:18.15.0-alpine

# Create App Directory
RUN mkdir -p /backend
WORKDIR /backend

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 8080

CMD ["npm", "start"]