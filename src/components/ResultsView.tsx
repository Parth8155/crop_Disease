import React from 'react';
import { ArrowLeft, MoreVertical, CheckCircle2, AlertTriangle } from 'lucide-react';
import { type AnalysisResult } from '../types';

interface ResultsViewProps {
    selectedImage: string | null;
    results: AnalysisResult | null;
    onBack: () => void;
    onNewScan: () => void;
    onSaveResult: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
    selectedImage,
    results,
    onBack,
    onNewScan,
    onSaveResult
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
                    <h2 className="font-semibold text-gray-900 text-lg md:text-xl">Scan Results</h2>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="More options"
                    >
                        <MoreVertical size={20} className="md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-8 lg:p-12">
                {results && (
                    <div className="space-y-6 lg:space-y-8 max-w-4xl mx-auto">
                        <div className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                            <img
                                src={selectedImage || ''}
                                alt="Analyzed crop"
                                className="w-full h-64 md:h-80 lg:h-96 object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <div className={`backdrop-blur-sm text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-2 rounded-full ${results.isHealthy ? 'bg-green-500/80' : 'bg-red-500/80'
                                    }`}>
                                    Analyzed
                                </div>
                            </div>
                        </div>

                        {/* Main Result */}
                        <div className={`rounded-xl p-4 md:p-6 border-2 ${results.isHealthy
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                            }`}>
                            <div className="flex items-start space-x-3 md:space-x-4">
                                <div className={`p-2 md:p-3 rounded-full ${results.isHealthy ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                    {results.isHealthy ? (
                                        <CheckCircle2 size={24} className="text-green-600 md:w-8 md:h-8" />
                                    ) : (
                                        <AlertTriangle size={24} className="text-red-600 md:w-8 md:h-8" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold text-lg md:text-xl lg:text-2xl ${results.isHealthy ? 'text-green-900' : 'text-red-900'
                                        }`}>
                                        {results.isHealthy ? 'Healthy Crop Detected' : results.disease}
                                    </h3>
                                    <p className={`text-sm md:text-base mb-2 md:mb-3 ${results.isHealthy ? 'text-green-700' : 'text-red-700'
                                        }`}>
                                        {results.description}
                                    </p>
                                    <div className="flex items-center space-x-4 text-sm md:text-base flex-wrap">
                                        <span className="font-medium">{results.crop}</span>
                                        <span className="opacity-75">•</span>
                                        <span>{results.confidence}% confidence</span>
                                        {!results.isHealthy && (
                                            <>
                                                <span className="opacity-75">•</span>
                                                <span className={`font-medium ${results.severity === 'High' ? 'text-red-600' : 'text-orange-600'
                                                    }`}>
                                                    {results.severity} Risk
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>                        {/* Treatment Section */}
                        {!results.isHealthy && (
                            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 flex items-center text-base md:text-lg">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                                    Treatment Plan
                                </h3>
                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-orange-50 rounded-lg">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs md:text-sm font-bold text-orange-700">1</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-orange-900 text-sm md:text-base">Immediate Action</div>
                                            <div className="text-sm md:text-base text-orange-700">Remove and destroy affected leaves immediately</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-blue-50 rounded-lg">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs md:text-sm font-bold text-blue-700">2</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-blue-900 text-sm md:text-base">Treatment</div>
                                            <div className="text-sm md:text-base text-blue-700">Apply copper-based fungicide every 7-10 days</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-purple-50 rounded-lg">
                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs md:text-sm font-bold text-purple-700">3</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-purple-900 text-sm md:text-base">Follow-up</div>
                                            <div className="text-sm md:text-base text-purple-700">Monitor surrounding plants for 2-3 weeks</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Next Steps */}
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-base md:text-lg">Recommended Actions</h3>
                            <div className="space-y-2 md:space-y-3">
                                <button className="w-full text-left p-3 md:p-4 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between">
                                    <span className="text-sm md:text-base">Consult agricultural expert</span>
                                    <span className="text-xs md:text-sm text-gray-500">→</span>
                                </button>
                                <button className="w-full text-left p-3 md:p-4 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between">
                                    <span className="text-sm md:text-base">Save to treatment history</span>
                                    <span className="text-xs md:text-sm text-gray-500">→</span>
                                </button>
                                <button className="w-full text-left p-3 md:p-4 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between">
                                    <span className="text-sm md:text-base">Set follow-up reminder</span>
                                    <span className="text-xs md:text-sm text-gray-500">→</span>
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 pb-6 lg:pb-8">
                            <button
                                onClick={onNewScan}
                                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm md:text-base"
                            >
                                Scan Another
                            </button>
                            <button
                                onClick={onSaveResult}
                                className="flex-1 bg-black text-white py-3 md:py-4 px-4 md:px-6 rounded-xl hover:bg-gray-900 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm md:text-base"
                            >
                                Save Result
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsView;
