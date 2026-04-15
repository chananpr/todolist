#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/todolist
RELEASE_DIR="$APP_DIR/current"
REPO_URL="https://github.com/chananpr/todolist.git"
BRANCH="main"

mkdir -p "$APP_DIR"
if [ ! -d "$RELEASE_DIR/.git" ]; then
  git clone --branch "$BRANCH" "$REPO_URL" "$RELEASE_DIR"
else
  git -C "$RELEASE_DIR" fetch origin
  git -C "$RELEASE_DIR" checkout "$BRANCH"
  git -C "$RELEASE_DIR" pull --ff-only origin "$BRANCH"
fi

cd "$RELEASE_DIR"
npm ci
npm run build
sudo systemctl restart taskforge-api
sudo nginx -t
sudo systemctl reload nginx
