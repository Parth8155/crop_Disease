# 🌾 Crop Disease Detection - Frontend

An intelligent web application for detecting crop diseases using AI-powered image analysis. Built with React 19, TypeScript, and Tailwind CSS, featuring drag-and-drop image upload, mobile optimization, and comprehensive disease information.

## ✨ Features

### 🔍 Core Functionality
- **AI-Powered Disease Detection**: Upload crop images to get instant disease diagnosis
- **18 Disease Classes**: Supports detection of common crop diseases including anthracnose, bacterial blight, leaf spot, mosaic virus, and more
- **Treatment Recommendations**: Detailed treatment and prevention strategies for each detected disease
- **Confidence Scoring**: AI confidence levels to help assess diagnosis reliability

### 📱 User Experience
- **Drag & Drop Interface**: Intuitive image upload with visual feedback
- **Mobile Optimized**: Automatic image compression for mobile devices and low memory optimization
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Analysis**: Fast image processing with loading states and progress indicators

### 🎯 Advanced Features
- **Multiple Upload Methods**: Camera capture, file browser, and drag-and-drop
- **Image Preprocessing**: Automatic resizing and optimization before analysis
- **Error Handling**: Comprehensive error messages and fallback mechanisms
- **Cross-Origin Support**: Configured for seamless API communication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd cropProject

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build           # Build for production
npm run build:dev       # Build for development environment
npm run preview         # Preview production build locally
npm run lint            # Run ESLint for code quality checks
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HomeView.tsx    # Landing page with image upload
│   ├── AnalyzeView.tsx # Image analysis interface
│   ├── ResultsView.tsx # Disease detection results
│   └── AboutView.tsx   # Project information
├── services/           # API and external service integrations
│   └── api.ts          # Crop disease detection API client
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── pages/              # Main page components
│   └── page.tsx        # Primary application controller
├── assets/             # Static assets and images
└── App.tsx             # Root application component
```

## 🔧 Technology Stack

### Core Framework
- **React 19**: Latest React with concurrent features
- **TypeScript 5.8**: Type-safe development
- **Vite 7**: Fast build tool and development server

### UI & Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Responsive Design**: Mobile-first approach

### Development Tools
- **ESLint**: Code linting and quality checks
- **TypeScript ESLint**: TypeScript-specific linting rules
- **PostCSS**: CSS processing with Tailwind

### Optimization Features
- **Image Compression**: Canvas API for mobile optimization
- **Code Splitting**: Automatic bundle optimization
- **Tree Shaking**: Remove unused code
- **Minification**: Production build optimization

## 🌐 API Integration

### Backend Configuration
The frontend communicates with a FastAPI backend deployed on Azure:

```typescript
// Default API endpoint
const API_BASE_URL = 'https://crop-backend-api-b8byddeccga5cug5.centralindia-01.azurewebsites.net';

// Environment variable override
VITE_API_URL=your-backend-url
```

### Supported Endpoints
- `POST /predict` - Image analysis and disease prediction
- `GET /diseases` - List of supported diseases
- `GET /health` - Backend health check
- `GET /disease/{name}` - Detailed disease information

## 📱 Mobile Optimization

### Memory Management
```typescript
// Automatic image compression for mobile devices
const compressImageIfNeeded = (file: File): Promise<File> => {
  // Compresses images >1MB to prevent mobile memory issues
  // Uses Canvas API for efficient processing
}
```

### Performance Features
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Automatic compression and resizing
- **Memory Cleanup**: Proper cleanup of image processing resources
- **Touch Gestures**: Optimized for mobile interactions

## 🎨 Component Architecture

### HomeView Component
- Drag-and-drop image upload
- Camera integration for mobile devices
- Visual feedback and validation
- Mobile-optimized file handling

### AnalyzeView Component
- Image preprocessing and display
- Loading states and progress indicators
- Error handling and retry mechanisms

### ResultsView Component
- Disease diagnosis display
- Confidence scoring visualization
- Treatment recommendations
- Prevention strategies

### AboutView Component
- Project information and usage guide
- Supported disease information
- Contact and support details

## 🔒 Security & Privacy

- **Client-Side Processing**: Images processed securely
- **HTTPS Communication**: Encrypted API communication
- **No Data Storage**: Images not stored permanently
- **CORS Protection**: Configured cross-origin policies

## 🚀 Deployment

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create a `.env` file for custom configuration:
```env
VITE_API_URL=https://your-backend-api.com
VITE_ENVIRONMENT=production
```

### Azure Static Web Apps
The project is configured for deployment on Azure Static Web Apps with:
- Automatic CI/CD from GitHub
- Custom routing configuration
- Production environment variables

## 🛠️ Development Guidelines

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Prettier Integration**: Consistent code formatting
- **Component Testing**: Unit tests for critical components

### Best Practices
- **Functional Components**: Using React hooks
- **Custom Hooks**: Reusable logic extraction
- **Error Boundaries**: Graceful error handling
- **Accessibility**: ARIA labels and keyboard navigation

## 📊 Performance Metrics

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Bundle Size
- **Initial Bundle**: ~150KB gzipped
- **Code Splitting**: Dynamic imports for routes
- **Tree Shaking**: Removes unused dependencies

## 🐛 Troubleshooting

### Common Issues

**Image Upload Not Working**
```bash
# Check API connectivity
curl -X GET https://your-api-url/health

# Verify CORS configuration
# Check browser console for CORS errors
```

**Mobile Performance Issues**
- Enable image compression in settings
- Check network connectivity
- Clear browser cache

**Build Failures**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run lint
```

## 📈 Future Enhancements

### Planned Features
- **Batch Processing**: Multiple image analysis
- **Historical Data**: Disease detection history
- **Offline Mode**: PWA capabilities for offline use
- **Multi-Language**: Internationalization support

### Technical Improvements
- **Service Worker**: Background processing
- **WebAssembly**: Client-side ML inference
- **Real-time Updates**: WebSocket integration
- **Advanced Analytics**: Usage metrics and insights

## 🤝 Contributing

### Development Setup
```bash
# Fork the repository
# Clone your fork
git clone https://github.com/your-username/crop-disease-detection.git

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git commit -m "Add your feature"

# Push and create pull request
git push origin feature/your-feature-name
```

### Coding Standards
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic
- Write unit tests for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Developed as part of a hackathon project focused on agricultural technology and AI-powered solutions for crop disease detection.

## 📞 Support

For issues, questions, or feature requests:
- Create an issue on GitHub
- Contact the development team
- Check the troubleshooting guide above

---

**Built with ❤️ for farmers and agricultural professionals worldwide** 🌱
