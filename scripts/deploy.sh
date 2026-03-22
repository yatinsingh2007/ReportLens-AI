#!/bin/bash
export PATH=$PATH:/usr/bin:/usr/local/bin
set -e

APP_NAME="ocr-app"
IMAGE_NAME="reportlens-ocr"
PORT=${PORT:-3000}
APP_DIR="$HOME/app"
CLIENT_DIR="$APP_DIR/client"
SERVER_DIR="$APP_DIR/server"

echo "Starting deployment..."

# Ensure repo exists
if [ ! -d "$APP_DIR" ]; then
  echo "Cloning repository..."
  git clone https://github.com/yatinsingh2007/ReportLens-AI.git $APP_DIR
fi

cd $APP_DIR

# FORCE SYNC (critical)
echo "Syncing latest code..."
git fetch origin
git reset --hard origin/main

# =========================
# BACKEND (Docker)
# =========================

echo "🔨 Building backend image..."
docker build -t $IMAGE_NAME $SERVER_DIR

if docker ps -q --filter "name=$APP_NAME" | grep -q .; then
  echo "Stopping container..."
  docker stop $APP_NAME
fi

if docker ps -aq --filter "name=$APP_NAME" | grep -q .; then
  echo "🧹 Removing container..."
  docker rm $APP_NAME
fi

echo "🚀 Starting backend..."
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
# FRONTEND (Build + nginx)
# =========================

echo "📦 Building frontend..."

cd $CLIENT_DIR

npm install
npm run build

echo "Moving build to nginx..."

sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/

# Restart nginx to pick up new files
sudo systemctl restart nginx

# =========================
# HEALTH CHECK
# =========================

echo "⏳ Waiting for backend..."
sleep 5

echo "🔍 Checking backend..."
if curl -f http://localhost:$PORT/health; then
  echo "Deployment successful!"
else
  echo "Backend failed!"
  docker logs $APP_NAME
  exit 1
fi