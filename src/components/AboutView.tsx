import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';

interface AboutViewProps {
    onBack: () => void;
}

const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
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
                    <h2 className="font-semibold text-gray-900 text-lg md:text-xl">How it works</h2>
                    <div className="w-10 md:w-12"></div>
                </div>
            </div>

            <div className="p-4 md:p-8 lg:p-12 space-y-6 lg:space-y-8">
                {/* Process Steps */}
                <div className="bg-white rounded-xl p-6 md:p-8 lg:p-10 shadow-sm border border-gray-100 max-w-4xl mx-auto">
                    <h3 className="font-semibold text-gray-900 mb-4 md:mb-6 text-lg md:text-xl lg:text-2xl">Simple 3-Step Process</h3>

                    <div className="space-y-6 md:space-y-8 lg:space-y-10">
                        <div className="flex flex-col md:flex-row md:space-x-4 lg:space-x-6 space-y-4 md:space-y-0">
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-black text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg lg:text-xl mx-auto md:mx-0">
                                1
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="font-semibold text-gray-900 mb-1 md:mb-2 text-base md:text-lg lg:text-xl">Capture Image</h4>
                                <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-2 md:mb-3">
                                    Take a clear photo of your crop showing any visible symptoms or concerns
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    <span className="text-xs md:text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Good lighting</span>
                                    <span className="text-xs md:text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Close-up view</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-4 lg:space-x-6 space-y-4 md:space-y-0">
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-black text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg lg:text-xl mx-auto md:mx-0">
                                2
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="font-semibold text-gray-900 mb-1 md:mb-2 text-base md:text-lg lg:text-xl">AI Analysis</h4>
                                <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-2 md:mb-3">
                                    Our trained model analyzes the image against 24,000+ crop disease samples
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    <span className="text-xs md:text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">Instant results</span>
                                    <span className="text-xs md:text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">94% accuracy</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:space-x-4 lg:space-x-6 space-y-4 md:space-y-0">
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-black text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg lg:text-xl mx-auto md:mx-0">
                                3
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="font-semibold text-gray-900 mb-1 md:mb-2 text-base md:text-lg lg:text-xl">Get Treatment Plan</h4>
                                <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-2 md:mb-3">
                                    Receive detailed diagnosis with step-by-step treatment recommendations
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    <span className="text-xs md:text-sm bg-red-100 text-red-700 px-2 py-1 rounded">Expert guidance</span>
                                    <span className="text-xs md:text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Prevention tips</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technology */}
                <div className="bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
                    <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-center text-base md:text-lg lg:text-xl">Powered by AI</h3>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="text-center p-3 md:p-4 lg:p-6 bg-gray-50 rounded-lg">
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">24,881</div>
                            <div className="text-xs md:text-sm lg:text-base text-gray-600">Training Images</div>
                        </div>
                        <div className="text-center p-3 md:p-4 lg:p-6 bg-gray-50 rounded-lg">
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">22</div>
                            <div className="text-xs md:text-sm lg:text-base text-gray-600">Disease Classes</div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
                    <div className="flex items-start space-x-3 md:space-x-4">
                        <Info size={20} className="text-amber-600 mt-0.5 flex-shrink-0 md:w-6 md:h-6" />
                        <div>
                            <h3 className="font-semibold text-amber-900 mb-1 md:mb-2 text-base md:text-lg">Important Note</h3>
                            <p className="text-sm md:text-base lg:text-lg text-amber-800">
                                This tool provides preliminary diagnosis based on visual symptoms.
                                For severe infections or uncertain cases, always consult with local
                                agricultural extension officers or plant disease specialists.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutView;
