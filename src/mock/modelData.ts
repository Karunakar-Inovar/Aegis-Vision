import { Model, ModelType, ModelStatus, TrainingData, ModelConfiguration } from '@/types/types'

// Training Data Mock
export const mockTrainingData: TrainingData[] = [
  {
    totalImages: 5420,
    annotatedImages: 5420,
    classes: ['Surface Scratch', 'Dent', 'Color Variation', 'Edge Damage', 'Crack'],
    lastTrainingDate: new Date('2024-01-10T15:30:00Z'),
    trainingDuration: 240 // 4 hours
  },
  {
    totalImages: 3280,
    annotatedImages: 3280,
    classes: ['Pass', 'Fail', 'Warning'],
    lastTrainingDate: new Date('2024-01-08T09:15:00Z'),
    trainingDuration: 180 // 3 hours
  },
  {
    totalImages: 7650,
    annotatedImages: 7650,
    classes: ['Good Surface', 'Poor Surface', 'Contamination', 'Texture Defect'],
    lastTrainingDate: new Date('2024-01-12T11:45:00Z'),
    trainingDuration: 320 // 5.33 hours
  },
  {
    totalImages: 2890,
    annotatedImages: 2890,
    classes: ['Correct Edge', 'Damaged Edge', 'Rough Edge'],
    lastTrainingDate: new Date('2024-01-05T14:20:00Z'),
    trainingDuration: 150 // 2.5 hours
  }
]

// Model Configuration Mock
export const mockModelConfigs: ModelConfiguration[] = [
  {
    epochs: 100,
    batchSize: 32,
    learningRate: 0.001,
    augmentation: true,
    validationSplit: 0.2
  },
  {
    epochs: 80,
    batchSize: 16,
    learningRate: 0.0005,
    augmentation: true,
    validationSplit: 0.15
  },
  {
    epochs: 120,
    batchSize: 64,
    learningRate: 0.002,
    augmentation: false,
    validationSplit: 0.25
  },
  {
    epochs: 60,
    batchSize: 24,
    learningRate: 0.0008,
    augmentation: true,
    validationSplit: 0.2
  }
]

// Models Mock Data
export const mockModels: Model[] = [
  {
    id: 'model-001',
    name: 'DefectNet-V2',
    version: '2.1.0',
    type: 'detection' as ModelType,
    status: 'ready' as ModelStatus,
    accuracy: 98.2,
    trainingData: mockTrainingData[0],
    configuration: mockModelConfigs[0],
    filePath: '/models/defectnet_v2.onnx',
    fileSize: 45600000, // ~45.6MB
    createdAt: new Date('2024-01-10T15:30:00Z'),
    updatedAt: new Date('2024-01-15T10:20:00Z')
  },
  {
    id: 'model-002',
    name: 'QualityCheck-Pro',
    version: '1.3.2',
    type: 'classification' as ModelType,
    status: 'ready' as ModelStatus,
    accuracy: 96.8,
    trainingData: mockTrainingData[1],
    configuration: mockModelConfigs[1],
    filePath: '/models/qualitycheck_pro.onnx',
    fileSize: 32400000, // ~32.4MB
    createdAt: new Date('2024-01-08T09:15:00Z'),
    updatedAt: new Date('2024-01-12T14:30:00Z')
  },
  {
    id: 'model-003',
    name: 'SurfaceInspect-AI',
    version: '3.0.1',
    type: 'segmentation' as ModelType,
    status: 'training' as ModelStatus,
    accuracy: 97.5,
    trainingData: mockTrainingData[2],
    configuration: mockModelConfigs[2],
    filePath: '/models/surface_inspect_ai.onnx',
    fileSize: 78200000, // ~78.2MB
    createdAt: new Date('2024-01-12T11:45:00Z'),
    updatedAt: new Date('2024-01-15T08:15:00Z')
  },
  {
    id: 'model-004',
    name: 'EdgeDetect-Plus',
    version: '1.0.8',
    type: 'detection' as ModelType,
    status: 'error' as ModelStatus,
    accuracy: 95.3,
    trainingData: mockTrainingData[3],
    configuration: mockModelConfigs[3],
    filePath: '/models/edge_detect_plus.onnx',
    fileSize: 28700000, // ~28.7MB
    createdAt: new Date('2024-01-05T14:20:00Z'),
    updatedAt: new Date('2024-01-14T16:45:00Z')
  },
  {
    id: 'model-005',
    name: 'GeneralInspect-Lite',
    version: '2.2.0',
    type: 'classification' as ModelType,
    status: 'deploying' as ModelStatus,
    accuracy: 94.1,
    trainingData: {
      totalImages: 4200,
      annotatedImages: 4200,
      classes: ['Good', 'Defective'],
      lastTrainingDate: new Date('2024-01-14T10:00:00Z'),
      trainingDuration: 120 // 2 hours
    },
    configuration: {
      epochs: 50,
      batchSize: 48,
      learningRate: 0.0012,
      augmentation: true,
      validationSplit: 0.18
    },
    filePath: '/models/general_inspect_lite.onnx',
    fileSize: 19500000, // ~19.5MB
    createdAt: new Date('2024-01-14T10:00:00Z'),
    updatedAt: new Date('2024-01-15T12:30:00Z')
  }
]

// Training Jobs Mock Data
export const mockTrainingJobs = [
  {
    id: 'job-001',
    datasetId: 'ds-001',
    datasetName: 'Aluminum Panel Inspection - Q4 2023',
    modelArchitecture: 'EfficientDet-D2',
    status: 'training' as const,
    startedAt: new Date('2024-01-15T08:30:00Z'),
    progress: 68,
    learningRate: 0.001,
    epochs: 100,
    currentEpoch: 68,
    estimatedTimeRemaining: '2h 15m',
    accuracy: 94.2,
    loss: 0.142
  },
  {
    id: 'job-002',
    datasetId: 'ds-002',
    datasetName: 'Steel Component Defects - Mixed',
    modelArchitecture: 'YOLOv8-Medium',
    status: 'completed' as const,
    startedAt: new Date('2024-01-14T14:20:00Z'),
    progress: 100,
    learningRate: 0.0005,
    epochs: 80,
    currentEpoch: 80,
    accuracy: 96.8,
    loss: 0.087
  },
  {
    id: 'job-003',
    datasetId: 'ds-003',
    datasetName: 'Surface Quality Dataset - Premium',
    modelArchitecture: 'ResNet-50',
    status: 'pending' as const,
    startedAt: new Date('2024-01-15T16:00:00Z'),
    progress: 0,
    learningRate: 0.002,
    epochs: 120,
    currentEpoch: 0
  },
  {
    id: 'job-004',
    datasetId: 'ds-001',
    datasetName: 'Aluminum Panel Inspection - Q3 2023',
    modelArchitecture: 'EfficientDet-D1',
    status: 'failed' as const,
    startedAt: new Date('2024-01-14T10:15:00Z'),
    progress: 23,
    learningRate: 0.0008,
    epochs: 60,
    currentEpoch: 14,
    accuracy: 78.5,
    loss: 0.456
  },
  {
    id: 'job-005',
    datasetId: 'ds-004',
    datasetName: 'Edge Detection Training Set',
    modelArchitecture: 'MobileNet-V3',
    status: 'paused' as const,
    startedAt: new Date('2024-01-15T06:45:00Z'),
    progress: 45,
    learningRate: 0.0012,
    epochs: 90,
    currentEpoch: 41,
    estimatedTimeRemaining: '3h 30m',
    accuracy: 89.3,
    loss: 0.234
  }
]

// Model Performance Data
export const mockModelPerformance = mockModels.map(model => ({
  modelId: model.id,
  name: model.name,
  version: model.version,
  accuracy: model.accuracy,
  precision: Math.random() * 5 + 95, // 95-100%
  recall: Math.random() * 5 + 94, // 94-99%
  f1Score: Math.random() * 4 + 95, // 95-99%
  inferenceTime: Math.random() * 100 + 50, // 50-150ms
  totalInferences: Math.floor(Math.random() * 10000 + 5000),
  successfulInferences: Math.floor(Math.random() * 9500 + 4800),
  errorRate: Math.random() * 2 + 0.5, // 0.5-2.5%
  lastEvaluation: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within last 7 days
}))

// Model Deployment Status
export const mockModelDeployments = mockModels.filter(model => model.status === 'ready').map(model => ({
  modelId: model.id,
  name: model.name,
  version: model.version,
  deploymentStatus: 'active' as const,
  endpoint: `https://api.aegis-vision.com/models/${model.id}/predict`,
  instanceCount: Math.floor(Math.random() * 3 + 1), // 1-3 instances
  cpuUsage: Math.random() * 30 + 20, // 20-50%
  memoryUsage: Math.random() * 40 + 30, // 30-70%
  requestsPerMinute: Math.floor(Math.random() * 100 + 20),
  averageResponseTime: Math.random() * 50 + 25, // 25-75ms
  lastDeployed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
}))

// Model Metrics History
export const mockModelMetricsHistory = [
  { timestamp: new Date('2024-01-08T00:00:00Z'), accuracy: 97.2, precision: 96.8, recall: 97.5 },
  { timestamp: new Date('2024-01-09T00:00:00Z'), accuracy: 97.8, precision: 97.2, recall: 98.1 },
  { timestamp: new Date('2024-01-10T00:00:00Z'), accuracy: 96.9, precision: 96.5, recall: 97.3 },
  { timestamp: new Date('2024-01-11T00:00:00Z'), accuracy: 98.1, precision: 97.8, recall: 98.4 },
  { timestamp: new Date('2024-01-12T00:00:00Z'), accuracy: 97.6, precision: 97.3, recall: 97.9 },
  { timestamp: new Date('2024-01-13T00:00:00Z'), accuracy: 98.0, precision: 97.7, recall: 98.3 },
  { timestamp: new Date('2024-01-14T00:00:00Z'), accuracy: 97.4, precision: 97.1, recall: 97.7 },
  { timestamp: new Date('2024-01-15T00:00:00Z'), accuracy: 98.2, precision: 97.9, recall: 98.5 }
]

// Available Datasets for Training
export const mockDatasets = [
  {
    id: 'ds-001',
    name: 'Aluminum Panel Inspection - Q4 2023',
    description: 'Comprehensive dataset of aluminum panel defects',
    imageCount: 5420,
    size: '2.3 GB',
    classes: ['Surface Scratch', 'Dent', 'Color Variation', 'Edge Damage', 'Crack'],
    createdAt: new Date('2023-12-01T00:00:00Z')
  },
  {
    id: 'ds-002',
    name: 'Steel Component Defects - Mixed',
    description: 'Mixed steel component defect detection dataset',
    imageCount: 3280,
    size: '1.8 GB',
    classes: ['Pass', 'Fail', 'Warning'],
    createdAt: new Date('2023-11-15T00:00:00Z')
  },
  {
    id: 'ds-003',
    name: 'Surface Quality Dataset - Premium',
    description: 'High-resolution surface quality inspection images',
    imageCount: 7650,
    size: '4.2 GB',
    classes: ['Good Surface', 'Poor Surface', 'Contamination', 'Texture Defect'],
    createdAt: new Date('2024-01-05T00:00:00Z')
  },
  {
    id: 'ds-004',
    name: 'Edge Detection Training Set',
    description: 'Specialized dataset for edge defect detection',
    imageCount: 2890,
    size: '1.1 GB',
    classes: ['Correct Edge', 'Damaged Edge', 'Rough Edge'],
    createdAt: new Date('2023-10-20T00:00:00Z')
  }
]
