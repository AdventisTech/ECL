# Use Node.js LTS (Debian-based)
FROM node:20-bullseye

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install ODBC headers and Microsoft ODBC Driver 18
RUN apt-get update && apt-get install -y \
    unixodbc-dev \
    curl \
    gnupg \
    apt-transport-https \
    ca-certificates \
    && curl -sSL https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl -sSL https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql18 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the Angular app
COPY . .
RUN npm run build

# Expose port (Render will automatically map this)
EXPOSE 10000

# Start the Express server
CMD ["node", "app.js"]
