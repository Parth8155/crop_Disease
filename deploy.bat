@echo off
REM Frontend deployment script for Windows

echo 🌱 Deploying Crop Disease Detection Frontend...

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Run linting
echo 🧹 Running linter...
call npm run lint

REM Build for production
echo 🏗️ Building for production...
call npm run build

REM Check if build was successful
if exist "dist" (
    echo ✅ Build completed successfully!
    echo 📁 Build files are in the 'dist' directory
    echo 🚀 You can now deploy the 'dist' folder to your hosting service
) else (
    echo ❌ Build failed!
    exit /b 1
)

echo 🎉 Frontend deployment preparation complete!
pause
