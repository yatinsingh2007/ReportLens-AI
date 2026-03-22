#!/bin/bash
set -e

APP_DIR="$HOME/app"
CLIENT_DIR="$APP_DIR/client"
SERVER_DIR="$APP_DIR/server"

BACKEND_CONTAINER="ocr-backend"
BACKEND_IMAGE="reportlens-backend"

echo "🚀 Starting deployment..."

# Ensure repo exists
if [ ! -d "$APP_DIR" ]; then
  git clone https://github.com/yatinsingh2007/ReportLens-AI.git $APP_DIR
fi

cd $APP_DIR

echo "🔄 Syncing code..."
git fetch origin
git reset --hard origin/main

# =========================
# BACKEND (Docker)
# =========================

echo "🔨 Building backend..."
docker build -t $BACKEND_IMAGE $SERVER_DIR

docker stop $BACKEND_CONTAINER || true
docker rm $BACKEND_CONTAINER || true

echo "🚀 Starting backend..."
docker run -d \
  --name $BACKEND_CONTAINER \
  --restart always \
  -p BACKEND_PORT:"$PORT" \
  -e DATABASE_URL="$DATABASE_URL" \
  -e GEMINI_API_KEY="$GEMINI_API_KEY" \
  -e GEMINI_URL="$GEMINI_URL" \
  -e JWT_SECRET="$JWT_SECRET" \
  $BACKEND_IMAGE

# =========================
# FRONTEND (Node, no Docker)
# =========================

echo "📦 Setting up frontend..."

cd $CLIENT_DIR

# Install only if needed
if [ ! -d "node_modules" ]; then
  npm ci
fi

echo "🔨 Building frontend..."
npm run build

echo "🚀 Starting frontend..."

# Kill existing process
pkill -f "next start" || true

# Start Next.js
nohup npm run start -- -p 3001 > frontend.log 2>&1 &

sleep 3

# Verify frontend
if ! curl -f http://localhost:3001 > /dev/null; then
  echo "❌ Frontend failed"
  exit 1
fi

# =========================
# HEALTH CHECK
# =========================

echo "⏳ Checking backend..."
sleep 3

curl -f http://localhost:3000/health || (echo "❌ Backend failed" && exit 1)

echo "✅ Deployment successful!"