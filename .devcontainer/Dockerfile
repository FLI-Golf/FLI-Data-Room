FROM mcr.microsoft.com/devcontainers/typescript-node:22

# Install Docker CLI + Compose plugin for running PocketBase via docker-compose
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        docker.io \
        docker-compose-plugin \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
