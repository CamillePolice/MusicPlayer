FROM mcr.microsoft.com/devcontainers/javascript-node

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

RUN chown -R node:node ~/

RUN npm install -g npm@latest @vue/cli pnpm

# Install Vue CLI
RUN npm install -g @vue/cli