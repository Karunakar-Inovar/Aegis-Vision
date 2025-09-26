// Mock data for Aegis Vision AI Manufacturing Platform
// Use this for static screen data from Magic Patterns

import type {
  Camera,
  Inspection,
  Model,
  Alert,
  DashboardMetrics,
  LiveTileData,
  User,
  AnnotationProject,
  QualityMetrics,
  DefectTypeMetric,
  MetricDataPoint,
  ROIArea,
  InspectionResult,
  DetectedDefect,
} from '@/types/types'

// Mock Cameras
export const mockCameras: Camera[] = [
  {
    id: 'cam-001',
    name: 'Assembly Line Camera 1',
    location: 'Production Floor - Station A',
    status: 'online',
    resolution: { width: 1920, height: 1080 },
    frameRate: 30,
    isActive: true,
    streamUrl: 'rtmp://192.168.1.100/stream1',
    lastHeartbeat: new Date('2024-01-15T10:30:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: 'cam-002',
    name: 'Quality Control Camera',
    location: 'QC Department - Inspection Bay',
    status: 'online',
    resolution: { width: 2560, height: 1440 },
    frameRate: 60,
    isActive: true,
    streamUrl: 'rtmp://192.168.1.101/stream2',
    lastHeartbeat: new Date('2024-01-15T10:29:45Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T10:29:45Z'),
  },
  {
    id: 'cam-003',
    name: 'Packaging Line Monitor',
    location: 'Packaging Department',
    status: 'error',
    resolution: { width: 1920, height: 1080 },
    frameRate: 24,
    isActive: false,
    streamUrl: 'rtmp://192.168.1.102/stream3',
    lastHeartbeat: new Date('2024-01-15T09:15:30Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T09:15:30Z'),
  },
]

// Mock Inspections
export const mockInspections: Inspection[] = [
  {
    id: 'insp-001',
    name: 'Surface Defect Detection',
    description: 'Detects scratches, dents, and surface irregularities',
    cameraId: 'cam-001',
    modelId: 'model-001',
    status: 'active',
    configuration: {
      threshold: 0.85,
      roiAreas: [
        {
          id: 'roi-001',
          name: 'Primary Inspection Zone',
          type: 'defect',
          coordinates: { x: 100, y: 100, width: 800, height: 600 },
          color: '#ef4444',
          isActive: true,
          threshold: 0.8,
        },
      ],
      alertSettings: {
        enabled: true,
        emailNotifications: true,
        thresholds: {
          defectCount: 5,
          qualityScore: 0.7,
          systemError: true,
        },
      },
    },
    lastRun: new Date('2024-01-15T10:25:00Z'),
    totalRuns: 1247,
    successRate: 94.2,
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T10:25:00Z'),
  },
  {
    id: 'insp-002',
    name: 'Dimensional Accuracy Check',
    description: 'Measures component dimensions and tolerances',
    cameraId: 'cam-002',
    modelId: 'model-002',
    status: 'running',
    configuration: {
      threshold: 0.9,
      roiAreas: [
        {
          id: 'roi-002',
          name: 'Measurement Zone A',
          type: 'measurement',
          coordinates: { x: 200, y: 150, width: 600, height: 400 },
          color: '#3b82f6',
          isActive: true,
          threshold: 0.95,
        },
        {
          id: 'roi-003',
          name: 'Measurement Zone B',
          type: 'measurement',
          coordinates: { x: 850, y: 150, width: 600, height: 400 },
          color: '#3b82f6',
          isActive: true,
          threshold: 0.95,
        },
      ],
      alertSettings: {
        enabled: true,
        emailNotifications: false,
        thresholds: {
          defectCount: 3,
          qualityScore: 0.85,
          systemError: true,
        },
      },
    },
    lastRun: new Date('2024-01-15T10:30:00Z'),
    totalRuns: 892,
    successRate: 97.8,
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
  },
]

// Mock Models
export const mockModels: Model[] = [
  {
    id: 'model-001',
    name: 'DefectNet v2.1',
    version: '2.1.0',
    type: 'detection',
    status: 'ready',
    accuracy: 94.2,
    trainingData: {
      totalImages: 15420,
      annotatedImages: 15420,
      classes: ['scratch', 'dent', 'discoloration', 'crack'],
      lastTrainingDate: new Date('2024-01-10T14:30:00Z'),
      trainingDuration: 180,
    },
    configuration: {
      epochs: 100,
      batchSize: 32,
      learningRate: 0.001,
      augmentation: true,
      validationSplit: 0.2,
    },
    filePath: '/models/defectnet_v2.1.onnx',
    fileSize: 45678912,
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-10T14:30:00Z'),
  },
  {
    id: 'model-002',
    name: 'DimensionCheck Pro',
    version: '1.5.2',
    type: 'classification',
    status: 'ready',
    accuracy: 97.8,
    trainingData: {
      totalImages: 8760,
      annotatedImages: 8760,
      classes: ['within_tolerance', 'oversized', 'undersized'],
      lastTrainingDate: new Date('2024-01-08T09:15:00Z'),
      trainingDuration: 120,
    },
    configuration: {
      epochs: 75,
      batchSize: 16,
      learningRate: 0.0005,
      augmentation: false,
      validationSplit: 0.15,
    },
    filePath: '/models/dimensioncheck_v1.5.2.onnx',
    fileSize: 23456789,
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-08T09:15:00Z'),
  },
  {
    id: 'model-003',
    name: 'QualityAssist AI',
    version: '3.0.0-beta',
    type: 'segmentation',
    status: 'training',
    accuracy: 0,
    trainingData: {
      totalImages: 12000,
      annotatedImages: 9500,
      classes: ['background', 'product', 'defect_area'],
      trainingDuration: 0,
    },
    configuration: {
      epochs: 150,
      batchSize: 8,
      learningRate: 0.0001,
      augmentation: true,
      validationSplit: 0.25,
    },
    createdAt: new Date('2024-01-12T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
  },
]

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'defect_detected',
    severity: 'high',
    title: 'Multiple Defects Detected',
    message: 'Surface defect detection found 3 critical defects in the last 5 minutes',
    source: 'inspection',
    sourceId: 'insp-001',
    status: 'active',
    createdAt: new Date('2024-01-15T10:25:00Z'),
    updatedAt: new Date('2024-01-15T10:25:00Z'),
  },
  {
    id: 'alert-002',
    type: 'system_error',
    severity: 'medium',
    title: 'Camera Connection Lost',
    message: 'Packaging Line Monitor has lost connection and is not responding',
    source: 'camera',
    sourceId: 'cam-003',
    status: 'acknowledged',
    acknowledgedBy: 'operator-001',
    acknowledgedAt: new Date('2024-01-15T09:20:00Z'),
    createdAt: new Date('2024-01-15T09:15:30Z'),
    updatedAt: new Date('2024-01-15T09:20:00Z'),
  },
  {
    id: 'alert-003',
    type: 'quality_threshold',
    severity: 'low',
    title: 'Quality Score Below Target',
    message: 'Overall quality score dropped to 87% - below the 90% target',
    source: 'system',
    sourceId: 'system',
    status: 'resolved',
    resolvedAt: new Date('2024-01-15T08:45:00Z'),
    createdAt: new Date('2024-01-15T08:30:00Z'),
    updatedAt: new Date('2024-01-15T08:45:00Z'),
  },
]

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalInspections: 2,
  activeInspections: 1,
  totalDefectsToday: 12,
  qualityScore: 94.2,
  systemUptime: 99.7,
  recentAlerts: mockAlerts.slice(0, 3),
  productionMetrics: {
    totalItems: 1247,
    passedItems: 1175,
    failedItems: 72,
    throughput: 156,
    efficiency: 94.2,
  },
}

// Mock Live Tile Data
export const mockLiveTileData: LiveTileData[] = [
  {
    id: 'tile-001',
    title: 'Quality Score',
    value: 94.2,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 2.1,
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: 'tile-002',
    title: 'Defects Today',
    value: 12,
    status: 'warning',
    trend: 'up',
    trendValue: 3,
    lastUpdated: new Date('2024-01-15T10:25:00Z'),
  },
  {
    id: 'tile-003',
    title: 'Throughput',
    value: 156,
    unit: 'items/hr',
    status: 'success',
    trend: 'stable',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: 'tile-004',
    title: 'System Uptime',
    value: 99.7,
    unit: '%',
    status: 'success',
    trend: 'stable',
    lastUpdated: new Date('2024-01-15T10:30:00Z'),
  },
]

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-001',
    username: 'admin',
    email: 'admin@aegis-vision.com',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'admin',
    permissions: [
      { resource: 'cameras', actions: ['read', 'write', 'delete'] },
      { resource: 'inspections', actions: ['read', 'write', 'delete'] },
      { resource: 'models', actions: ['read', 'write', 'delete'] },
      { resource: 'users', actions: ['read', 'write', 'delete'] },
    ],
    isActive: true,
    lastLogin: new Date('2024-01-15T08:00:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T08:00:00Z'),
  },
  {
    id: 'user-002',
    username: 'operator1',
    email: 'operator1@aegis-vision.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'operator',
    permissions: [
      { resource: 'cameras', actions: ['read'] },
      { resource: 'inspections', actions: ['read', 'write'] },
      { resource: 'models', actions: ['read'] },
    ],
    isActive: true,
    lastLogin: new Date('2024-01-15T07:30:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T07:30:00Z'),
  },
]

// Mock Annotation Projects
export const mockAnnotationProjects: AnnotationProject[] = [
  {
    id: 'proj-001',
    name: 'Surface Defect Annotation',
    description: 'Annotating surface defects for training DefectNet v3.0',
    status: 'active',
    totalImages: 2500,
    annotatedImages: 1847,
    classes: [
      { id: 'class-001', name: 'Scratch', color: '#ef4444', description: 'Linear surface damage' },
      { id: 'class-002', name: 'Dent', color: '#f97316', description: 'Indented surface damage' },
      { id: 'class-003', name: 'Discoloration', color: '#eab308', description: 'Color variation from normal' },
      { id: 'class-004', name: 'Crack', color: '#dc2626', description: 'Linear fracture in material' },
    ],
    assignedUsers: ['user-002', 'user-003'],
    createdAt: new Date('2024-01-05T08:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
  },
]

// Mock Quality Metrics
export const mockQualityMetrics: QualityMetrics = {
  overallScore: 94.2,
  timeRange: '24h',
  trendData: [
    { timestamp: new Date('2024-01-15T00:00:00Z'), value: 92.1 },
    { timestamp: new Date('2024-01-15T04:00:00Z'), value: 93.5 },
    { timestamp: new Date('2024-01-15T08:00:00Z'), value: 94.8 },
    { timestamp: new Date('2024-01-15T12:00:00Z'), value: 93.2 },
    { timestamp: new Date('2024-01-15T16:00:00Z'), value: 95.1 },
    { timestamp: new Date('2024-01-15T20:00:00Z'), value: 94.2 },
  ],
  defectsByType: [
    { type: 'Scratch', count: 8, percentage: 66.7, trend: 'up' },
    { type: 'Dent', count: 3, percentage: 25.0, trend: 'down' },
    { type: 'Discoloration', count: 1, percentage: 8.3, trend: 'stable' },
  ],
}

// Mock ROI Areas
export const mockROIAreas: ROIArea[] = [
  {
    id: 'roi-001',
    name: 'Primary Inspection Zone',
    type: 'defect',
    coordinates: { x: 100, y: 100, width: 800, height: 600 },
    color: '#ef4444',
    isActive: true,
    threshold: 0.8,
  },
  {
    id: 'roi-002',
    name: 'Quality Control Area',
    type: 'quality',
    coordinates: { x: 200, y: 200, width: 600, height: 400 },
    color: '#22c55e',
    isActive: true,
    threshold: 0.9,
  },
  {
    id: 'roi-003',
    name: 'Dimension Check Zone',
    type: 'measurement',
    coordinates: { x: 300, y: 150, width: 700, height: 500 },
    color: '#3b82f6',
    isActive: false,
    threshold: 0.95,
  },
]

// Mock Inspection Results
export const mockInspectionResults: InspectionResult[] = [
  {
    id: 'result-001',
    inspectionId: 'insp-001',
    imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    overallScore: 0.92,
    defectsFound: 2,
    processingTime: 234,
    status: 'failed',
  },
  {
    id: 'result-002',
    inspectionId: 'insp-001',
    imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
    timestamp: new Date('2024-01-15T10:28:00Z'),
    overallScore: 0.96,
    defectsFound: 0,
    processingTime: 187,
    status: 'passed',
  },
]

// Mock Detected Defects
export const mockDetectedDefects: DetectedDefect[] = [
  {
    id: 'defect-001',
    type: 'Scratch',
    confidence: 0.94,
    coordinates: { x: 245, y: 178, width: 120, height: 35 },
    severity: 'medium',
    description: 'Linear scratch on surface, 12cm length',
  },
  {
    id: 'defect-002',
    type: 'Dent',
    confidence: 0.87,
    coordinates: { x: 456, y: 289, width: 85, height: 78 },
    severity: 'high',
    description: 'Deep dent affecting structural integrity',
  },
]

// Export all mock data as a single object for easy importing
export const mockData = {
  cameras: mockCameras,
  inspections: mockInspections,
  models: mockModels,
  alerts: mockAlerts,
  dashboardMetrics: mockDashboardMetrics,
  liveTileData: mockLiveTileData,
  users: mockUsers,
  annotationProjects: mockAnnotationProjects,
  qualityMetrics: mockQualityMetrics,
  roiAreas: mockROIAreas,
  inspectionResults: mockInspectionResults,
  detectedDefects: mockDetectedDefects,
}
