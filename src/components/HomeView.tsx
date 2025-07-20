import React, { useState } from 'react';
import { Camera, Upload, Bell, User, Info, Bookmark } from 'lucide-react';

interface HomeViewProps {
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onViewChange: (view: string) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const HomeView: React.FC<HomeViewProps> = ({ onImageUpload, onViewChange, fileInputRef }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    // Prevent default drag behaviors on the window
    React.useEffect(() => {
        const preventDefaults = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const handleWindowDragOver = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            const dragEvent = e as DragEvent;
            if (dragEvent.dataTransfer) {
                dragEvent.dataTransfer.dropEffect = 'none'; // Show "not allowed" cursor by default
            }
        };

        const handleWindowDrop = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Window drop prevented');
        };

        // Add event listeners to prevent default browser behavior
        document.addEventListener('dragenter', preventDefaults, false);
        document.addEventListener('dragover', handleWindowDragOver, false);
        document.addEventListener('drop', handleWindowDrop, false);

        return () => {
            document.removeEventListener('dragenter', preventDefaults, false);
            document.removeEventListener('dragover', handleWindowDragOver, false);
            document.removeEventListener('drop', handleWindowDrop, false);
        };
    }, []);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Drag enter detected');
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Only set dragOver to false if we're leaving the drop zone itself
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            console.log('Drag leave detected - outside bounds');
            setIsDragOver(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Ensure we show the correct drop effect
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        console.log('Drop event triggered');
        console.log('Files dropped:', e.dataTransfer.files.length);

        const files = Array.from(e.dataTransfer.files);
        console.log('Files:', files.map(f => ({ name: f.name, type: f.type, size: f.size })));
        
        const imageFile = files.find(file => file.type.startsWith('image/'));

        if (imageFile && fileInputRef.current) {
            console.log('Valid image file found:', imageFile.name);
            
            try {
                // Create a new DataTransfer object and add the file
                const dt = new DataTransfer();
                dt.items.add(imageFile);
                
                // Set the files on the input element
                fileInputRef.current.files = dt.files;

                // Create a proper synthetic event that matches the expected signature
                const syntheticEvent = {
                    target: {
                        ...fileInputRef.current,
                        files: dt.files
                    },
                    currentTarget: {
                        ...fileInputRef.current,
                        files: dt.files
                    }
                } as React.ChangeEvent<HTMLInputElement>;

                console.log('Calling onImageUpload with synthetic event');
                // Call the upload handler
                onImageUpload(syntheticEvent);
            } catch (error) {
                console.error('Error processing dropped file:', error);
            }
        } else if (!imageFile) {
            console.log('No valid image file found in drop');
        } else {
            console.log('fileInputRef is null');
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="flex items-center justify-between p-4 md:px-8 lg:px-12">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm md:text-base">CS</span>
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">CropScan</h1>
                            <p className="text-xs md:text-sm text-gray-500">AI Disease Detection</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            title="Notifications"
                        >
                            <Bell size={20} className="text-gray-600" />
                        </button>
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            title="User profile"
                        >
                            <User size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8 lg:p-12 space-y-6 lg:space-y-8">
                {/* Quick Stats */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                    <div className="grid grid-cols-3 divide-x divide-gray-100">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">77K+</div>
                            <div className="text-xs md:text-sm text-gray-500">Images Trained</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">94%</div>
                            <div className="text-xs md:text-sm text-gray-500">Accuracy</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">18</div>
                            <div className="text-xs md:text-sm text-gray-500">Disease Types</div>
                        </div>
                    </div>
                </div>

                {/* Main Actions - Drag and Drop Area */}
                <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto">
                    {/* Drag and Drop Zone */}
                    <div
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={`relative w-full border-2 border-dashed rounded-xl p-8 md:p-12 transition-all duration-300 ${isDragOver
                            ? 'border-green-400 bg-green-50 scale-105'
                            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        <div className="text-center">
                            <div className={`mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragOver ? 'bg-green-100' : 'bg-gray-100'
                                }`}>
                                <Upload size={32} className={`md:w-10 md:h-10 ${isDragOver ? 'text-green-600' : 'text-gray-600'}`} />
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                                {isDragOver ? 'Drop your image here!' : 'Drag & Drop Your Crop Image'}
                            </h3>
                            <p className="text-sm md:text-base text-gray-500 mb-4">
                                {isDragOver
                                    ? 'Release to analyze your crop'
                                    : 'Drag an image here or click to browse'
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Camera size={18} />
                                    <span>Take Photo</span>
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Upload size={18} />
                                    <span>Browse Files</span>
                                </button>
                            </div>
                        </div>

                        {/* Visual feedback overlay */}
                        {isDragOver && (
                            <div className="absolute inset-0 bg-green-100 bg-opacity-50 border-2 border-green-400 border-dashed rounded-xl flex items-center justify-center">
                                <div className="text-green-600 font-semibold text-lg">Drop to upload!</div>
                            </div>
                        )}
                    </div>

                    {/* Supported formats info */}
                    <div className="text-center">
                        <p className="text-xs md:text-sm text-gray-500">
                            Supported formats: JPG, PNG, WEBP, BMP • Max size: 10MB
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={onImageUpload}
                        className="hidden"
                        aria-label="Upload crop image"
                    />
                </div>

                {/* Content Grid for Desktop */}
                <div className="grid lg:grid-cols-1 gap-6 lg:gap-8">
                    {/* Supported Crops */}
                    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 flex items-center text-base md:text-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Supported Crops
                        </h3>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {[
                                { name: 'Cassava', diseases: '6 diseases', icon: '🌱' },
                                { name: 'Maize', diseases: '5 diseases', icon: '🌽' },
                                { name: 'Tomato', diseases: '6 diseases', icon: '🍅' },
                                { name: 'Cashew', diseases: '5 diseases', icon: '🌰' }
                            ].map((crop) => (
                                <div key={crop.name} className="bg-gray-50 rounded-lg p-3 md:p-4 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-2 md:space-x-3">
                                        <span className="text-lg md:text-xl">{crop.icon}</span>
                                        <div>
                                            <div className="font-medium text-gray-900 text-sm md:text-base">{crop.name}</div>
                                            <div className="text-xs md:text-sm text-gray-500">{crop.diseases}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 max-w-2xl mx-auto">
                    <button
                        onClick={() => onViewChange('about')}
                        className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                        <Info size={18} className="md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">How it works</span>
                    </button>
                    <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                        <Bookmark size={18} className="md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">Tips</span>
                    </button>
                </div>
            </div>
        </div>
    );
}; export default HomeView;
