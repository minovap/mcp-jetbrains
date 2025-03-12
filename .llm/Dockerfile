FROM node:22.14.0-bookworm

# Note: Run apt commands with proper permissions using sudo
USER root

RUN apt-get update && apt-get install -y \
    git \
    ripgrep \
    fd-find \
    tmux \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js tools globally
RUN npm install -g eslint prettier nodemon