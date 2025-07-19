# Crop Disease Detection App - Component Structure

This project has been reorganized into multiple components for better maintainability and reusability.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HomeView.tsx    # Main dashboard/home screen
│   ├── AnalyzeView.tsx # Image analysis screen
│   ├── ResultsView.tsx # Results display screen
│   └── AboutView.tsx   # Information/how-it-works screen
├── pages/              # Main page components
│   └── page.tsx        # Main app component (orchestrates views)
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and mock data
├── App.tsx             # Root component
├── main.tsx            # App entry point
└── index.css           # Global styles with Tailwind CSS
```

## Components

### HomeView
- Main dashboard with stats and navigation
- File upload functionality
- Recent scans history
- Supported crops display

### AnalyzeView  
- Image preview and analysis
- Loading states during analysis
- Image details display

### ResultsView
- Disease detection results
- Treatment recommendations
- Follow-up actions
- Save/share functionality

### AboutView
- How the app works
- AI technology information
- Important disclaimers

## Types
- `AnalysisResult`: Interface for disease detection results
- `Disease`: Interface for disease data structure
- Mock data for simulation

## Features
- **TypeScript**: Full type safety
- **Tailwind CSS**: Modern utility-first styling
- **Lucide Icons**: Clean, consistent iconography
- **React Hooks**: Modern React patterns
- **Component Separation**: Maintainable code structure

## Development
```bash
npm install
npm run dev
```

## Building
```bash
npm run build
```

The app is now much more maintainable with clear separation of concerns and reusable components.
