#!/bin/bash

# Read environment from ./env/.env
set -a
. ./env/.env
set +a

# Copy /env -> remote
scp -r ./env $USER@$REMOTE:$ROOT/env > /dev/null
echo "[✓] Copied /env -> remote"

# SSH -> remote
echo "[✓] SSH -> remote"
ssh -t $USER@$REMOTE ROOT=$ROOT 'bash -s' < ./bin/remote.sh
