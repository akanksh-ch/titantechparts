#!/bin/bash

# set -e  # Exit on error (Disabled to allow manual handling of missing folders)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== TitanTechParts Deployment Script (Updated) ===${NC}"

# 1. Detect container runtime (Docker or Podman)
CONTAINER_CMD=""
COMPOSE_CMD=""

if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker detected${NC}"
    CONTAINER_CMD="docker"
    
    # Check for docker-compose or docker compose
    if command -v docker-compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
    elif docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
    else
        echo -e "${RED}✗ docker-compose not found${NC}"
        exit 1
    fi
elif command -v podman &> /dev/null; then
    echo -e "${GREEN}✓ Podman detected${NC}"
    CONTAINER_CMD="podman"
    
    if command -v podman-compose &> /dev/null; then
        COMPOSE_CMD="podman-compose"
    else
        echo -e "${RED}✗ podman-compose not found${NC}"
        echo -e "${YELLOW}Install with: pip install podman-compose${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ Neither Docker nor Podman found${NC}"
    echo -e "${YELLOW}Please install Docker or Podman first${NC}"
    exit 1
fi

echo -e "${GREEN}Using: $COMPOSE_CMD${NC}"

# 2. Check for sibling directories
FRONTEND_DIR="../frontend"
BACKEND_DIR="../backend"

# 3. Start Backend Services
echo -e "\n${GREEN}=== Starting Backend Services ===${NC}"
if [ -d "$BACKEND_DIR" ]; then
    echo "Found backend directory at $BACKEND_DIR"
    cd "$BACKEND_DIR"
    echo "Building and starting backend containers..."
    $COMPOSE_CMD down 2>/dev/null || true
    $COMPOSE_CMD up -d --build
    cd - > /dev/null
else
    echo -e "${RED}✗ Backend directory not found at ../backend${NC}"
    echo -e "${YELLOW}Please ensure the backend branch is cloned as a sibling directory.${NC}"
fi

# 4. Start Frontend Services
echo -e "\n${GREEN}=== Starting Frontend Services ===${NC}"
if [ -d "$FRONTEND_DIR" ]; then
    echo "Found frontend directory at $FRONTEND_DIR"
    cd "$FRONTEND_DIR"
    echo "Building and starting frontend containers..."
    $COMPOSE_CMD down 2>/dev/null || true
    $COMPOSE_CMD up -d --build
    cd - > /dev/null
else
    echo -e "${RED}✗ Frontend directory not found at ../frontend${NC}"
    echo -e "${YELLOW}Please ensure the frontend branch is cloned as a sibling directory.${NC}"
fi

# 5. Show status
echo -e "\n${GREEN}=== Container Status ===${NC}"
if [ "$CONTAINER_CMD" = "docker" ]; then
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
    podman ps
fi

echo -e "\n${GREEN}=== Deployment Complete! ===${NC}"
echo -e "${YELLOW}Backend API should be running at http://localhost:8000${NC}"
echo -e "${YELLOW}Frontend should be running at http://localhost:5173${NC}"
