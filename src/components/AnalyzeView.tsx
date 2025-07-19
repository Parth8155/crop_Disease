import React from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { type AnalysisResult } from '../types';

interface AnalyzeViewProps {
    selectedImage: string | null;
    isAnalyzing: boolean;
    results: AnalysisResult | null;
    onAnalyze: () => void;
    onBack: () => void;
}

const AnalyzeView: React.FC<AnalyzeViewProps> = ({
    selectedImage,
    isAnalyzing,
    results,
    onAnalyze,
    onBack
}) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="flex items-center justify-between p-4 md:px-8 lg:px-12">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Go back"
                    >
                        <ArrowLeft size={20} className="md:w-6 md:h-6" />
                    </button>
                    <h2 className="font-semibold text-gray-900 text-lg md:text-xl">Analyze Image</h2>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="More options"
                    >
                        <MoreVertical size={20} className="md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-8 lg:p-12">
                {selectedImage && (
                    <div className="space-y-6 lg:space-y-8 max-w-4xl mx-auto">
                        <div className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                            <img
                                src={selectedImage}
                                alt="Crop to analyze"
                                className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <div className="bg-black/50 backdrop-blur-sm text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-2 rounded-full">
                                    Ready to scan
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                            {/* Image Info */}
                            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-base md:text-lg">Image Details</h3>
                                <div className="text-sm md:text-base text-gray-600 space-y-1 md:space-y-2">
                                    <div>Format: JPEG</div>
                                    <div>Quality: High resolution</div>
                                    <div>Status: Ready for analysis</div>
                                </div>
                            </div>

                            {/* Analysis Controls */}
                            <div className="flex flex-col justify-center">
                                {!isAnalyzing && !results && (
                                    <button
                                        onClick={onAnalyze}
                                        className="w-full bg-black text-white py-4 md:py-6 px-6 md:px-8 rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2 md:space-x-3"
                                    >
                                        <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                                        </div>
                                        <span className="font-semibold text-base md:text-lg">Start Analysis</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {isAnalyzing && (
                            <div className="bg-white rounded-xl p-6 md:p-8 lg:p-12 shadow-sm border border-gray-100">
                                <div className="text-center max-w-md mx-auto">
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6">
                                        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-lg md:text-xl">Analyzing your crop...</h3>
                                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Our AI is examining the image for diseases</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                                        <div className="bg-black h-2 md:h-3 rounded-full animate-pulse w-[70%]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyzeView;
