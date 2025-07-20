# Crop Disease Detection - Frontend Deployment Guide

## 🚀 Deployment Configuration

### Backend Integration
The frontend is configured to work with your deployed backend at:
```
https://crop-backend-api-b8byddeccga5cug5.australiacentral-01.azurewebsites.net
```

### Environment Variables
- **Development**: Uses `http://localhost:8000` (when running `npm run dev`)
- **Production**: Uses your Azure backend URL

### Quick Deployment Steps

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Build for Production
```bash
# For production build (uses Azure backend)
npm run build

# For development build (uses localhost backend)
npm run build:dev
```

#### 3. Deploy the `dist` folder
After building, deploy the `dist` folder to your hosting service:

- **Vercel**: Connect your repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder
- **Azure Static Web Apps**: Use Azure CLI or GitHub Actions
- **GitHub Pages**: Upload `dist` contents to your gh-pages branch

#### 4. Platform-Specific Instructions

##### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

##### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Or connect your GitHub repo for auto-deploys

##### Azure Static Web Apps
```bash
# Install Azure CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy ./dist --api-location ./api
```

### 🔧 Configuration Files Created

- `.env` - Default environment (production)
- `.env.development` - Development environment
- `.env.production` - Production environment
- `deploy.sh` - Linux/Mac deployment script
- `deploy.bat` - Windows deployment script

### 🌐 Environment URLs

| Environment | Backend URL |
|-------------|-------------|
| Development | `http://localhost:8000` |
| Production  | `https://crop-backend-api-b8byddeccga5cug5.australiacentral-01.azurewebsites.net` |

### 📝 Important Notes

1. **CORS**: Your backend is configured to accept requests from your frontend domain
2. **HTTPS**: Production backend uses HTTPS, ensure your frontend is also served over HTTPS
3. **API Endpoints**: The frontend automatically handles API endpoint discovery
4. **Error Handling**: Enhanced error handling for network issues and timeouts

### 🐛 Troubleshooting

#### CORS Issues
If you get CORS errors, make sure your frontend domain is added to the backend's `CORS_ORIGINS` environment variable.

#### Network Timeout
The frontend has a 30-second timeout for predictions and 10-second timeout for health checks. Azure cold starts might take longer initially.

#### Build Issues
If build fails, check:
1. All dependencies are installed: `npm install`
2. No TypeScript errors: `npm run lint`
3. Environment variables are set correctly

### 🚀 Ready to Deploy!

Your frontend is now configured to work with your deployed backend. Use the deployment scripts or manual steps above to deploy to your preferred hosting platform.
