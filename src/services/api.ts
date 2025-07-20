// API configuration and services for crop disease detection

// Use environment variable for API URL, fallback to production URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://crop-backend-api-b8byddeccga5cug5.centralindia-01.azurewebsites.net';

export interface PredictionResponse {
  disease: string;
  confidence: number;
  severity: string;
  treatment: string[];
  prevention: string[];
  description: string;
  affected_area?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class CropDiseaseAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    // Debug logging to help identify URL issues
    console.log('🔗 API Base URL:', this.baseUrl);
    console.log('🌐 Environment VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('🏠 Current Origin:', window.location.origin);
  }

  /**
   * Test CORS configuration
   */
  async testCORS(): Promise<ApiResponse<any>> {
    try {
      console.log('🧪 Testing CORS configuration...');
      const response = await fetch(`${this.baseUrl}/cors-debug`);
      const data = await response.json();
      console.log('🔍 CORS Debug Response:', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ CORS Test Failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'CORS test failed' 
      };
    }
  }

  /**
   * Check if the API is healthy and ready
   */
  async healthCheck(): Promise<ApiResponse<any>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: 'API health check failed' };
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, error: 'Request timeout - Backend may be starting up' };
      }
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  /**
   * Predict disease from uploaded image
   */
  async predictDisease(imageFile: File): Promise<ApiResponse<PredictionResponse>> {
    try {
      // Validate file type
      if (!imageFile.type.startsWith('image/')) {
        return { success: false, error: 'Please upload a valid image file' };
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (imageFile.size > maxSize) {
        return { success: false, error: 'Image file is too large. Maximum size is 10MB.' };
      }

      // Create FormData
      const formData = new FormData();
      formData.append('file', imageFile);

      // Debug logging
      const predictUrl = `${this.baseUrl}/predict`;
      console.log('🎯 Making prediction request to:', predictUrl);

      // Make API request with timeout and proper headers
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(predictUrl, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers: {
          // Don't set Content-Type for FormData, let browser set it with boundary
        }
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { 
          success: false, 
          error: data.detail || 'Prediction failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error during prediction' 
      };
    }
  }

  /**
   * Get list of supported diseases
   */
  async getSupportedDiseases(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/diseases`);
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: 'Failed to fetch supported diseases' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  /**
   * Get detailed information about a specific disease
   */
  async getDiseaseInfo(diseaseName: string): Promise<ApiResponse<any>> {
    try {
      const encodedName = encodeURIComponent(diseaseName);
      const response = await fetch(`${this.baseUrl}/disease/${encodedName}`);
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.detail || 'Disease not found' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  }

  /**
   * Convert File to base64 string (for preview)
   */
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  /**
   * Validate image file
   */
  validateImageFile(file: File): { isValid: boolean; error?: string } {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return { isValid: false, error: 'Please select a valid image file' };
    }

    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { 
        isValid: false, 
        error: 'Image file is too large. Maximum size is 10MB.' 
      };
    }

    // Check supported formats
    const supportedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/bmp',
      'image/tiff',
      'image/webp'
    ];

    if (!supportedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'Unsupported image format. Please use JPG, PNG, BMP, TIFF, or WebP.' 
      };
    }

    return { isValid: true };
  }
}

// Create and export API instance
export const cropDiseaseAPI = new CropDiseaseAPI();

// Utility functions
export const formatConfidence = (confidence: number): string => {
  return `${(confidence * 100).toFixed(1)}%`;
};

export const getSeverityColor = (severity: string): string => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'low':
      return 'text-blue-600 bg-blue-100';
    case 'none':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
