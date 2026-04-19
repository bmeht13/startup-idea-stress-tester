#!/bin/bash

# Startup Idea Stress Tester - Push to GitHub Script
# This script guides you through pushing your code to GitHub

set -e

echo "=========================================="
echo "Push Code to GitHub - Step by Step"
echo "=========================================="
echo ""

# Step 1: Verify local repo is clean
echo "✓ Step 1: Verifying local repository..."
git status

if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: Working directory has uncommitted changes"
    echo "Run: git add . && git commit -m 'your message'"
    exit 1
fi

echo "✓ Local repository is clean"
echo ""

# Step 2: Get repo URL
echo "📝 Step 2: Enter your GitHub repository URL"
echo "   (Format: https://github.com/YOUR_USERNAME/startup-idea-stress-tester.git)"
read -p "Enter your GitHub repo URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Repository URL is required"
    exit 1
fi

echo ""

# Step 3: Add remote
echo "🔗 Step 3: Adding GitHub as remote..."
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
git remote -v
echo "✓ Remote added"
echo ""

# Step 4: Push to GitHub
echo "📤 Step 4: Pushing code to GitHub..."
echo "   (This may take a moment...)"
git branch -M main
git push -u origin main

echo ""
echo "=========================================="
echo "✅ SUCCESS! Code pushed to GitHub"
echo "=========================================="
echo ""
echo "Your repository is now on GitHub:"
echo "   $REPO_URL"
echo ""
echo "View your code:"
echo "   Open the URL in your browser"
echo ""
echo "Clone on another machine:"
echo "   git clone $REPO_URL"
echo ""
echo "Continue development:"
echo "   git checkout -b feature/your-feature"
echo "   (make changes)"
echo "   git commit -m 'feat: description'"
echo "   git push -u origin feature/your-feature"
echo ""
