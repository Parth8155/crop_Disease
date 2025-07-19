export interface AnalysisResult {
  disease: string;
  severity: string;
  crop?: string;
  description: string;
  confidence: string;
  isHealthy: boolean;
  treatment: string[];
  prevention: string[];
}

export interface Disease {
  name: string;
  severity: string;
  crop: string;
  description: string;
}

export const mockDiseases: Disease[] = [
  { name: 'Cassava Mosaic Disease', severity: 'High', crop: 'Cassava', description: 'Yellow mosaic patterns on leaves' },
  { name: 'Maize Streak Virus', severity: 'Medium', crop: 'Maize', description: 'Pale streaks along leaf veins' },
  { name: 'Early Blight', severity: 'Medium', crop: 'Tomato', description: 'Dark spots on leaves and stems' },
  { name: 'Healthy', severity: 'None', crop: 'Cashew', description: 'No disease detected' }
];

export const simulateAnalysisData = () => {
  const result = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
  const confidence = (82 + Math.random() * 15).toFixed(1);
  
  return {
    ...result,
    confidence: confidence,
    isHealthy: result.name === 'Healthy'
  };
};
