#!/bin/bash
cd /tmp/kavia/workspace/code-generation/classic-snake-game-46a6d05e/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

