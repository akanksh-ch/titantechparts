#!/bin/bash

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== TitanTechParts Deployment Script ===${NC}"

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

# 2. Get the repository URL from git config
REPO_URL=$(git config --get remote.origin.url)
if [ -z "$REPO_URL" ]; then
    echo -e "${RED}✗ Could not determine repository URL${NC}"
    exit 1
fi

echo -e "${GREEN}Repository: $REPO_URL${NC}"

# 3. Pull/Clone frontend branch
echo -e "\n${GREEN}=== Fetching Frontend ===${NC}"
if [ -d "frontend/.git" ]; then
    echo "Frontend directory exists, pulling latest..."
    cd frontend
    git fetch origin frontend
    git reset --hard origin/frontend
    cd ..
else
    echo "Cloning frontend branch..."
    git clone -b frontend "$REPO_URL" frontend
fi
echo -e "${GREEN}✓ Frontend updated${NC}"

# 4. Pull/Clone backend branch
echo -e "\n${GREEN}=== Fetching Backend ===${NC}"
if [ -d "backend/.git" ]; then
    echo "Backend directory exists, pulling latest..."
    cd backend
    git fetch origin backend
    git reset --hard origin/backend
    cd ..
else
    echo "Cloning backend branch..."
    git clone -b backend "$REPO_URL" backend
fi
echo -e "${GREEN}✓ Backend updated${NC}"

# 5. Stop existing containers (if any)
echo -e "\n${GREEN}=== Stopping existing containers ===${NC}"
$COMPOSE_CMD down 2>/dev/null || true

# 6. Start services with docker-compose
echo -e "\n${GREEN}=== Starting services ===${NC}"
$COMPOSE_CMD up -d

# 7. Show status
echo -e "\n${GREEN}=== Container Status ===${NC}"
$COMPOSE_CMD ps

echo -e "\n${GREEN}=== Deployment Complete! ===${NC}"
echo -e "${YELLOW}Frontend and backend services are now running in detached mode${NC}"
echo -e "${YELLOW}Use '$COMPOSE_CMD logs -f' to view logs${NC}"
echo -e "${YELLOW}Use '$COMPOSE_CMD down' to stop services${NC}"
