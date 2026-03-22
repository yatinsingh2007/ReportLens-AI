#!/bin/bash

set -e

APP_NAME="ocr-app"
IMAGE_NAME="reportlens-ocr"
PORT=${PORT:-3000}
APP_DIR="$HOME/app"
CLIENT_DIR="$APP_DIR/client"
SERVER_DIR="$APP_DIR/server"
FRONTEND_BUILD_DIR="$CLIENT_DIR/dist"

echo "Starting deployment..."

# 1. Ensure repo exists
if [ ! -d "$APP_DIR" ]; then
  echo "Cloning repository..."
  git clone https://github.com/yatinsingh2007/ReportLens-AI.git $APP_DIR
fi

cd $APP_DIR

# 2. Pull latest code
echo "Pulling latest code..."
git pull origin main

# =========================
# BACKEND (Docker)
# =========================

echo "Building backend Docker image..."
docker build -t $IMAGE_NAME $SERVER_DIR

# Stop container if running
if docker ps -q --filter "name=$APP_NAME" | grep -q .; then
  echo "Stopping running container..."
  docker stop $APP_NAME
fi

# Remove container if exists
if docker ps -aq --filter "name=$APP_NAME" | grep -q .; then
  echo "Removing old container..."
  docker rm $APP_NAME
fi

echo "Starting backend container..."
docker run -d \
  --name $APP_NAME \
  --restart always \
  -p $PORT:$PORT \
  -e DATABASE_URL="$DATABASE_URL" \
  -e GEMINI_API_KEY="$GEMINI_API_KEY" \
  -e GEMINI_URL="$GEMINI_URL" \
  -e JWT_SECRET="$JWT_SECRET" \
  -e PORT="$PORT" \
  $IMAGE_NAME

# =========================
# FRONTEND (Static Build)
# =========================

echo "Building frontend..."

cd $CLIENT_DIR

# Install deps (idempotent)
npm install

# Build frontend
npm run build

echo "Deploying frontend..."

# Serve with simple static server (or replace with nginx later)
# Install serve if not installed
if ! command -v serve &> /dev/null; then
  npm install -g serve
fi

# Kill existing frontend if running
pkill -f "serve -s dist" || true

# Start frontend
nohup serve -s dist -l 5000 > frontend.log 2>&1 &

# =========================
# 🔍 HEALTH CHECK
# =========================

echo "Waiting for backend..."
sleep 5

echo "Checking backend health..."
if curl -f http://localhost:$PORT/health; then
  echo "Backend OK"
else
  echo "Backend failed!"
  docker logs $APP_NAME
  exit 1
fi

echo "🎉 Deployment successful!"