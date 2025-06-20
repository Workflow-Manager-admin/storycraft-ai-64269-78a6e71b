#!/bin/bash
cd /home/kavia/workspace/code-generation/storycraft-ai-64269-78a6e71b/storycraft_ai_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

