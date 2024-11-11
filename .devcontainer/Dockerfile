FROM node:18

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

ARG USERNAME=vscode

# Create a user called vscode with UID 1000
RUN useradd -ms /bin/bash vscode && \
    usermod -aG sudo vscode && \
    echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/vscode && \
    chmod 0440 /etc/sudoers.d/vscode

# Set `SHELL` so it'll be available for VS Code
ENV SHELL /bin/bash

# Set up working directory
WORKDIR /workspace