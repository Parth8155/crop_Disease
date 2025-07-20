import React, { useState, useRef } from 'react';
import HomeView from '../components/HomeView';
import AnalyzeView from '../components/AnalyzeView';
import ResultsView from '../components/ResultsView';
import AboutView from '../components/AboutView';
import { type AnalysisResult } from '../types/index';
import { cropDiseaseAPI, type PredictionResponse } from '../services/api';

const CropDiseaseDetector = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [currentView, setCurrentView] = useState<string>('home');
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file
        const validation = cropDiseaseAPI.validateImageFile(file);
        if (!validation.isValid) {
            setError(validation.error || 'Invalid file');
            return;
        }

        try {
            // Convert to base64 for preview
            const base64 = await cropDiseaseAPI.fileToBase64(file);

            setSelectedFile(file);
            setSelectedImage(base64);
            setResults(null);
            setError(null);
            setCurrentView('analyze');
        } catch (error) {
            setError('Failed to process image');
            console.error('Image processing error:', error);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) {
            setError('No image selected');
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            // Make API request
            const response = await cropDiseaseAPI.predictDisease(selectedFile);

            if (response.success && response.data) {
                // Convert API response to internal format
                const apiResult: PredictionResponse = response.data;

                const result: AnalysisResult = {
                    disease: apiResult.disease,
                    confidence: (apiResult.confidence * 100).toFixed(1) + '%',
                    severity: apiResult.severity,
                    treatment: apiResult.treatment,
                    prevention: apiResult.prevention,
                    description: apiResult.description,
                    isHealthy: apiResult.disease.toLowerCase().includes('healthy')
                };

                setResults(result);
                setCurrentView('results');
            } else {
                setError(response.error || 'Analysis failed');
            }
        } catch (error) {
            setError('Network error. Please check your connection and try again.');
            console.error('Analysis error:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleNewScan = () => {
        setSelectedImage(null);
        setSelectedFile(null);
        setResults(null);
        setError(null);
        setCurrentView('home');
    };

    const handleSaveResult = () => {
        // Enhanced save functionality with comprehensive data
        if (results && selectedFile) {
            try {
                const analysisData = {
                    timestamp: new Date().toISOString(),
                    image: {
                        name: selectedFile.name,
                        size: selectedFile.size,
                        type: selectedFile.type,
                        lastModified: selectedFile.lastModified
                    },
                    analysis: {
                        disease: results.disease,
                        confidence: results.confidence,
                        severity: results.severity,
                        isHealthy: results.isHealthy
                    },
                    treatment: {
                        recommendations: results.treatment,
                        prevention: results.prevention,
                        description: results.description
                    },
                    application: {
                        name: "CropScan - AI Disease Detection",
                        version: "1.0.0",
                        url: window.location.origin
                    }
                };

                const dataStr = JSON.stringify(analysisData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                
                // Generate filename with disease name and timestamp
                const diseaseSlug = results.disease.toLowerCase().replace(/[^a-z0-9]/g, '-');
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                link.download = `crop-analysis-${diseaseSlug}-${timestamp}.json`;
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                // Show success message (temporary)
                const originalText = document.querySelector('[onclick*="onSaveResult"]')?.textContent;
                const saveButton = document.querySelector('[onclick*="onSaveResult"]') as HTMLButtonElement;
                if (saveButton) {
                    saveButton.textContent = 'Saved! ✓';
                    setTimeout(() => {
                        saveButton.textContent = originalText || 'Save Result';
                    }, 2000);
                }
                
                console.log('Analysis results saved to JSON file:', `crop-analysis-${diseaseSlug}-${timestamp}.json`);
            } catch (error) {
                console.error('Error saving results:', error);
                setError('Failed to save results. Please try again.');
            }
        } else {
            console.warn('No results or image file available to save');
            setError('No analysis results to save');
        }
    };

    const handleViewChange = (view: string) => {
        setError(null); // Clear error when changing views
        setCurrentView(view);
    };

    // Clear error when view changes
    React.useEffect(() => {
        setError(null);
    }, [currentView]);

    return (
        <div className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto bg-white min-h-screen md:shadow-lg">
            {/* Error Display */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4 mt-4">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {currentView === 'home' && (
                <HomeView
                    onImageUpload={handleImageUpload}
                    onViewChange={handleViewChange}
                    fileInputRef={fileInputRef}
                />
            )}
            {currentView === 'analyze' && (
                <AnalyzeView
                    selectedImage={selectedImage}
                    isAnalyzing={isAnalyzing}
                    results={results}
                    onAnalyze={handleAnalyze}
                    onBack={() => setCurrentView('home')}
                />
            )}
            {currentView === 'results' && (
                <ResultsView
                    selectedImage={selectedImage}
                    results={results}
                    onBack={() => setCurrentView('analyze')}
                    onNewScan={handleNewScan}
                    onSaveResult={handleSaveResult}
                />
            )}
            {currentView === 'about' && (
                <AboutView
                    onBack={() => setCurrentView('home')}
                />
            )}
        </div>
    );
};

export default CropDiseaseDetector;