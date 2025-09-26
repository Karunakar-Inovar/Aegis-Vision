import { Inspection, InspectionStatus, InspectionConfiguration, InspectionResult, DetectedDefect, ROIArea, ROIType, Coordinates } from '@/types/types'

// ROI Areas Mock Data
export const mockROIAreas: ROIArea[] = [
  {
    id: 'roi-001',
    name: 'Surface Quality Check',
    type: 'quality' as ROIType,
    coordinates: { x: 100, y: 50, width: 300, height: 200 } as Coordinates,
    color: '#3B82F6',
    isActive: true,
    threshold: 85
  },
  {
    id: 'roi-002',
    name: 'Edge Inspection',
    type: 'defect' as ROIType,
    coordinates: { x: 450, y: 100, width: 200, height: 150 } as Coordinates,
    color: '#EF4444',
    isActive: true,
    threshold: 90
  },
  {
    id: 'roi-003',
    name: 'Dimension Measurement',
    type: 'measurement' as ROIType,
    coordinates: { x: 200, y: 300, width: 400, height: 100 } as Coordinates,
    color: '#10B981',
    isActive: true,
    threshold: 95
  }
]

// Inspection Configuration Mock Data
export const mockInspectionConfig: InspectionConfiguration = {
  threshold: 85,
  roiAreas: mockROIAreas,
  alertSettings: {
    enabled: true,
    emailNotifications: true,
    webhookUrl: 'https://api.company.com/webhooks/inspection',
    thresholds: {
      defectCount: 5,
      qualityScore: 80,
      systemError: true
    }
  },
  schedule: {
    enabled: true,
    interval: 30, // 30 minutes
    startTime: '06:00',
    endTime: '22:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  }
}

// Inspections Mock Data
export const mockInspections: Inspection[] = [
  {
    id: 'ins-001',
    name: 'Aluminum Panel Quality Check',
    description: 'Comprehensive quality inspection for aluminum panels',
    cameraId: 'cam-001',
    modelId: 'model-001',
    status: 'active' as InspectionStatus,
    configuration: mockInspectionConfig,
    lastRun: new Date('2024-01-15T14:25:00Z'),
    totalRuns: 1247,
    successRate: 96.8,
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T14:25:00Z')
  },
  {
    id: 'ins-002',
    name: 'Steel Component Defect Detection',
    description: 'Automated defect detection for steel components',
    cameraId: 'cam-002',
    modelId: 'model-002',
    status: 'running' as InspectionStatus,
    configuration: {
      ...mockInspectionConfig,
      threshold: 90,
      roiAreas: mockROIAreas.slice(0, 2)
    },
    lastRun: new Date('2024-01-15T14:30:00Z'),
    totalRuns: 892,
    successRate: 94.2,
    createdAt: new Date('2024-01-02T09:00:00Z'),
    updatedAt: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'ins-003',
    name: 'Surface Finish Inspection',
    description: 'Surface quality and finish inspection',
    cameraId: 'cam-004',
    modelId: 'model-003',
    status: 'active' as InspectionStatus,
    configuration: {
      ...mockInspectionConfig,
      threshold: 88,
      roiAreas: [mockROIAreas[0], mockROIAreas[2]]
    },
    lastRun: new Date('2024-01-15T14:20:00Z'),
    totalRuns: 2156,
    successRate: 98.1,
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-15T14:20:00Z')
  },
  {
    id: 'ins-004',
    name: 'Packaging Integrity Check',
    description: 'Final packaging quality inspection',
    cameraId: 'cam-005',
    modelId: 'model-001',
    status: 'inactive' as InspectionStatus,
    configuration: {
      ...mockInspectionConfig,
      threshold: 80,
      schedule: { ...mockInspectionConfig.schedule!, enabled: false }
    },
    lastRun: new Date('2024-01-14T18:45:00Z'),
    totalRuns: 456,
    successRate: 91.7,
    createdAt: new Date('2024-01-05T14:00:00Z'),
    updatedAt: new Date('2024-01-14T18:45:00Z')
  },
  {
    id: 'ins-005',
    name: 'Assembly Line Quality Control',
    description: 'Real-time quality control for assembly line',
    cameraId: 'cam-007',
    modelId: 'model-004',
    status: 'error' as InspectionStatus,
    configuration: mockInspectionConfig,
    lastRun: new Date('2024-01-15T12:15:00Z'),
    totalRuns: 734,
    successRate: 89.3,
    createdAt: new Date('2024-01-03T11:00:00Z'),
    updatedAt: new Date('2024-01-15T12:15:00Z')
  }
]

// Inspection Queue Data
export const mockInspectionQueue = [
  {
    id: 'queue-001',
    inspectionId: 'ins-001',
    productName: 'Aluminum Panel - Series A',
    status: 'in-progress' as const,
    sourceCamera: 'CAM-LINE-01',
    eta: '2 min',
    priority: 'critical' as const,
    queuedAt: new Date('2024-01-15T14:28:00Z'),
    estimatedDuration: '5 min',
    operator: 'Sarah Chen'
  },
  {
    id: 'queue-002',
    inspectionId: 'ins-002',
    productName: 'Steel Component - Type B',
    status: 'pending' as const,
    sourceCamera: 'CAM-LINE-02',
    eta: '8 min',
    priority: 'high' as const,
    queuedAt: new Date('2024-01-15T14:30:00Z'),
    estimatedDuration: '4 min'
  },
  {
    id: 'queue-003',
    inspectionId: 'ins-003',
    productName: 'Surface Panel - Premium',
    status: 'pending' as const,
    sourceCamera: 'CAM-QC-01',
    eta: '12 min',
    priority: 'medium' as const,
    queuedAt: new Date('2024-01-15T14:32:00Z'),
    estimatedDuration: '6 min'
  },
  {
    id: 'queue-004',
    inspectionId: 'ins-001',
    productName: 'Aluminum Panel - Series B',
    status: 'paused' as const,
    sourceCamera: 'CAM-LINE-01',
    eta: '15 min',
    priority: 'low' as const,
    queuedAt: new Date('2024-01-15T14:25:00Z'),
    estimatedDuration: '5 min',
    operator: 'Mike Johnson'
  }
]

// Inspection History Data
export const mockInspectionHistory = [
  {
    id: 'hist-001',
    inspectionId: 'ins-001',
    productName: 'Aluminum Panel - Series A',
    result: 'passed' as const,
    dateTime: new Date('2024-01-15T14:25:00Z'),
    operator: 'Sarah Chen',
    duration: '4m 23s',
    defectsFound: 0,
    confidence: 98.5,
    cameraId: 'cam-001',
    batchId: 'BATCH-2024-A-012',
    overallScore: 98.5
  },
  {
    id: 'hist-002',
    inspectionId: 'ins-002',
    productName: 'Steel Component - Type B',
    result: 'failed' as const,
    dateTime: new Date('2024-01-15T14:20:00Z'),
    operator: 'Mike Johnson',
    duration: '6m 12s',
    defectsFound: 3,
    confidence: 94.2,
    cameraId: 'cam-002',
    batchId: 'BATCH-2024-B-008',
    overallScore: 72.3,
    notes: 'Multiple surface scratches detected on edges'
  },
  {
    id: 'hist-003',
    inspectionId: 'ins-003',
    productName: 'Surface Panel - Premium',
    result: 'passed' as const,
    dateTime: new Date('2024-01-15T14:15:00Z'),
    operator: 'Sarah Chen',
    duration: '3m 45s',
    defectsFound: 0,
    confidence: 99.1,
    cameraId: 'cam-004',
    batchId: 'BATCH-2024-P-005',
    overallScore: 99.1
  },
  {
    id: 'hist-004',
    inspectionId: 'ins-001',
    productName: 'Aluminum Panel - Series A',
    result: 'warning' as const,
    dateTime: new Date('2024-01-15T14:10:00Z'),
    operator: 'Alex Rodriguez',
    duration: '5m 01s',
    defectsFound: 1,
    confidence: 87.6,
    cameraId: 'cam-001',
    batchId: 'BATCH-2024-A-011',
    overallScore: 85.2,
    notes: 'Minor color variation detected, within acceptable range'
  },
  {
    id: 'hist-005',
    inspectionId: 'ins-004',
    productName: 'Package Assembly - Standard',
    result: 'passed' as const,
    dateTime: new Date('2024-01-15T14:05:00Z'),
    operator: 'Lisa Wang',
    duration: '2m 18s',
    defectsFound: 0,
    confidence: 96.8,
    cameraId: 'cam-005',
    batchId: 'BATCH-2024-S-020',
    overallScore: 96.8
  }
]

// Detected Defects Mock Data
export const mockDetectedDefects: DetectedDefect[] = [
  {
    id: 'defect-001',
    type: 'Surface Scratch',
    confidence: 94.2,
    coordinates: { x: 150, y: 75, width: 50, height: 25 },
    severity: 'medium',
    description: 'Linear scratch on surface, 2.3mm length'
  },
  {
    id: 'defect-002',
    type: 'Edge Damage',
    confidence: 89.7,
    coordinates: { x: 480, y: 120, width: 30, height: 40 },
    severity: 'high',
    description: 'Chipped edge, 1.2mm depth'
  },
  {
    id: 'defect-003',
    type: 'Color Variation',
    confidence: 76.3,
    coordinates: { x: 300, y: 200, width: 80, height: 60 },
    severity: 'low',
    description: 'Slight color inconsistency in coating'
  }
]

// Inspection Results Mock Data
export const mockInspectionResults: InspectionResult[] = [
  {
    id: 'result-001',
    inspectionId: 'ins-001',
    imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    timestamp: new Date('2024-01-15T14:25:00Z'),
    overallScore: 98.5,
    defectsFound: 0,
    processingTime: 2.3,
    status: 'passed'
  },
  {
    id: 'result-002',
    inspectionId: 'ins-002',
    imageData: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    timestamp: new Date('2024-01-15T14:20:00Z'),
    overallScore: 72.3,
    defectsFound: 3,
    processingTime: 3.1,
    status: 'failed'
  }
]

// Inspection Statistics
export const mockInspectionStats = {
  totalInspections: mockInspections.length,
  activeInspections: mockInspections.filter(ins => ins.status === 'active').length,
  runningInspections: mockInspections.filter(ins => ins.status === 'running').length,
  errorInspections: mockInspections.filter(ins => ins.status === 'error').length,
  averageSuccessRate: mockInspections.reduce((acc, ins) => acc + ins.successRate, 0) / mockInspections.length,
  totalRuns: mockInspections.reduce((acc, ins) => acc + ins.totalRuns, 0),
  queueLength: mockInspectionQueue.length,
  averageProcessingTime: 2.7 // seconds
}
