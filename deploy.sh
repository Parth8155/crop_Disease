#!/bin/bash

# Frontend deployment script for Crop Disease Detection App

echo "🌱 Deploying Crop Disease Detection Frontend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build for production
echo "🏗️ Building for production..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build files are in the 'dist' directory"
    echo "🚀 You can now deploy the 'dist' folder to your hosting service"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Frontend deployment preparation complete!"
