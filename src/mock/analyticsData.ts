import { QualityMetrics, MetricDataPoint, DefectTypeMetric, SystemStatus, ServiceStatus, ResourceUsage, NetworkUsage } from '@/types/types'

// Analytics Overview Metrics
export const mockAnalyticsOverview = {
  totalInspections: 15420,
  totalDefects: 892,
  averageQualityScore: 96.3,
  systemUptime: 99.2,
  totalProcessedItems: 45680,
  defectRate: 1.95,
  averageProcessingTime: 2.4, // seconds
  throughputToday: 3420
}

// Quality Metrics
export const mockQualityMetrics: QualityMetrics = {
  overallScore: 96.3,
  trendData: [
    { timestamp: new Date('2024-01-08T00:00:00Z'), value: 95.2, label: 'Jan 8' },
    { timestamp: new Date('2024-01-09T00:00:00Z'), value: 96.1, label: 'Jan 9' },
    { timestamp: new Date('2024-01-10T00:00:00Z'), value: 94.8, label: 'Jan 10' },
    { timestamp: new Date('2024-01-11T00:00:00Z'), value: 97.3, label: 'Jan 11' },
    { timestamp: new Date('2024-01-12T00:00:00Z'), value: 96.7, label: 'Jan 12' },
    { timestamp: new Date('2024-01-13T00:00:00Z'), value: 95.9, label: 'Jan 13' },
    { timestamp: new Date('2024-01-14T00:00:00Z'), value: 96.8, label: 'Jan 14' },
    { timestamp: new Date('2024-01-15T00:00:00Z'), value: 96.3, label: 'Jan 15' }
  ],
  defectsByType: [
    { type: 'Surface Scratches', count: 245, percentage: 27.5, trend: 'down' },
    { type: 'Dents & Deformations', count: 198, percentage: 22.2, trend: 'up' },
    { type: 'Color Variations', count: 156, percentage: 17.5, trend: 'stable' },
    { type: 'Edge Damage', count: 134, percentage: 15.0, trend: 'down' },
    { type: 'Cracks', count: 89, percentage: 10.0, trend: 'stable' },
    { type: 'Contamination', count: 70, percentage: 7.8, trend: 'up' }
  ],
  timeRange: '7d'
}

// System Health Metrics
export const mockSystemStatus: SystemStatus = {
  status: 'healthy',
  uptime: 99.2,
  version: '2.4.1',
  services: [
    {
      name: 'Camera Service',
      status: 'running',
      lastCheck: new Date('2024-01-15T14:30:00Z'),
      responseTime: 45
    },
    {
      name: 'AI Inference Engine',
      status: 'running',
      lastCheck: new Date('2024-01-15T14:30:00Z'),
      responseTime: 120
    },
    {
      name: 'Database Service',
      status: 'running',
      lastCheck: new Date('2024-01-15T14:30:00Z'),
      responseTime: 23
    },
    {
      name: 'Alert Service',
      status: 'running',
      lastCheck: new Date('2024-01-15T14:30:00Z'),
      responseTime: 67
    },
    {
      name: 'Storage Service',
      status: 'running',
      lastCheck: new Date('2024-01-15T14:30:00Z'),
      responseTime: 34
    }
  ],
  resources: {
    cpu: 68.5,
    memory: 72.3,
    disk: 45.8,
    network: {
      bytesIn: 1024000000,
      bytesOut: 512000000,
      packetsIn: 450000,
      packetsOut: 320000
    }
  }
}

// Performance Analytics Data
export const mockPerformanceData = {
  // Processing Time Trend (last 24 hours)
  processingTimeTrend: [
    { timestamp: new Date('2024-01-14T15:00:00Z'), value: 2.1, label: '15:00' },
    { timestamp: new Date('2024-01-14T16:00:00Z'), value: 2.3, label: '16:00' },
    { timestamp: new Date('2024-01-14T17:00:00Z'), value: 2.0, label: '17:00' },
    { timestamp: new Date('2024-01-14T18:00:00Z'), value: 2.2, label: '18:00' },
    { timestamp: new Date('2024-01-14T19:00:00Z'), value: 2.4, label: '19:00' },
    { timestamp: new Date('2024-01-14T20:00:00Z'), value: 2.1, label: '20:00' },
    { timestamp: new Date('2024-01-14T21:00:00Z'), value: 2.3, label: '21:00' },
    { timestamp: new Date('2024-01-14T22:00:00Z'), value: 2.5, label: '22:00' },
    { timestamp: new Date('2024-01-14T23:00:00Z'), value: 2.2, label: '23:00' },
    { timestamp: new Date('2024-01-15T00:00:00Z'), value: 2.1, label: '00:00' },
    { timestamp: new Date('2024-01-15T01:00:00Z'), value: 2.0, label: '01:00' },
    { timestamp: new Date('2024-01-15T02:00:00Z'), value: 2.3, label: '02:00' },
    { timestamp: new Date('2024-01-15T03:00:00Z'), value: 2.4, label: '03:00' },
    { timestamp: new Date('2024-01-15T04:00:00Z'), value: 2.2, label: '04:00' },
    { timestamp: new Date('2024-01-15T05:00:00Z'), value: 2.1, label: '05:00' },
    { timestamp: new Date('2024-01-15T06:00:00Z'), value: 2.3, label: '06:00' },
    { timestamp: new Date('2024-01-15T07:00:00Z'), value: 2.5, label: '07:00' },
    { timestamp: new Date('2024-01-15T08:00:00Z'), value: 2.4, label: '08:00' },
    { timestamp: new Date('2024-01-15T09:00:00Z'), value: 2.2, label: '09:00' },
    { timestamp: new Date('2024-01-15T10:00:00Z'), value: 2.1, label: '10:00' },
    { timestamp: new Date('2024-01-15T11:00:00Z'), value: 2.3, label: '11:00' },
    { timestamp: new Date('2024-01-15T12:00:00Z'), value: 2.4, label: '12:00' },
    { timestamp: new Date('2024-01-15T13:00:00Z'), value: 2.2, label: '13:00' },
    { timestamp: new Date('2024-01-15T14:00:00Z'), value: 2.4, label: '14:00' }
  ],

  // Throughput Trend (items per hour)
  throughputTrend: [
    { timestamp: new Date('2024-01-14T15:00:00Z'), value: 320, label: '15:00' },
    { timestamp: new Date('2024-01-14T16:00:00Z'), value: 315, label: '16:00' },
    { timestamp: new Date('2024-01-14T17:00:00Z'), value: 340, label: '17:00' },
    { timestamp: new Date('2024-01-14T18:00:00Z'), value: 325, label: '18:00' },
    { timestamp: new Date('2024-01-14T19:00:00Z'), value: 310, label: '19:00' },
    { timestamp: new Date('2024-01-14T20:00:00Z'), value: 335, label: '20:00' },
    { timestamp: new Date('2024-01-14T21:00:00Z'), value: 345, label: '21:00' },
    { timestamp: new Date('2024-01-14T22:00:00Z'), value: 330, label: '22:00' },
    { timestamp: new Date('2024-01-14T23:00:00Z'), value: 320, label: '23:00' },
    { timestamp: new Date('2024-01-15T00:00:00Z'), value: 315, label: '00:00' },
    { timestamp: new Date('2024-01-15T01:00:00Z'), value: 340, label: '01:00' },
    { timestamp: new Date('2024-01-15T02:00:00Z'), value: 325, label: '02:00' },
    { timestamp: new Date('2024-01-15T03:00:00Z'), value: 310, label: '03:00' },
    { timestamp: new Date('2024-01-15T04:00:00Z'), value: 335, label: '04:00' },
    { timestamp: new Date('2024-01-15T05:00:00Z'), value: 345, label: '05:00' },
    { timestamp: new Date('2024-01-15T06:00:00Z'), value: 330, label: '06:00' },
    { timestamp: new Date('2024-01-15T07:00:00Z'), value: 320, label: '07:00' },
    { timestamp: new Date('2024-01-15T08:00:00Z'), value: 342, label: '08:00' },
    { timestamp: new Date('2024-01-15T09:00:00Z'), value: 358, label: '09:00' },
    { timestamp: new Date('2024-01-15T10:00:00Z'), value: 365, label: '10:00' },
    { timestamp: new Date('2024-01-15T11:00:00Z'), value: 352, label: '11:00' },
    { timestamp: new Date('2024-01-15T12:00:00Z'), value: 340, label: '12:00' },
    { timestamp: new Date('2024-01-15T13:00:00Z'), value: 348, label: '13:00' },
    { timestamp: new Date('2024-01-15T14:00:00Z'), value: 342, label: '14:00' }
  ],

  // Accuracy by Model
  modelAccuracy: [
    { name: 'DefectNet-V2', accuracy: 98.2, type: 'detection' },
    { name: 'QualityCheck-Pro', accuracy: 96.8, type: 'classification' },
    { name: 'SurfaceInspect-AI', accuracy: 97.5, type: 'segmentation' },
    { name: 'EdgeDetect-Plus', accuracy: 95.3, type: 'detection' }
  ],

  // Camera Performance
  cameraPerformance: [
    { cameraId: 'CAM-LINE-01', name: 'Production Line 1', uptime: 99.8, avgResponseTime: 45, totalInspections: 2840 },
    { cameraId: 'CAM-LINE-02', name: 'Production Line 2', uptime: 98.5, avgResponseTime: 52, totalInspections: 2650 },
    { cameraId: 'CAM-LINE-03', name: 'Production Line 3', uptime: 99.2, avgResponseTime: 48, totalInspections: 2780 },
    { cameraId: 'CAM-QC-01', name: 'Quality Control Station', uptime: 99.9, avgResponseTime: 41, totalInspections: 1420 },
    { cameraId: 'CAM-PACK-01', name: 'Packaging Station', uptime: 97.8, avgResponseTime: 58, totalInspections: 1680 }
  ]
}

// Error Rate Analytics
export const mockErrorRateData = [
  { timestamp: new Date('2024-01-08T00:00:00Z'), value: 2.1, label: 'Jan 8' },
  { timestamp: new Date('2024-01-09T00:00:00Z'), value: 1.8, label: 'Jan 9' },
  { timestamp: new Date('2024-01-10T00:00:00Z'), value: 2.3, label: 'Jan 10' },
  { timestamp: new Date('2024-01-11T00:00:00Z'), value: 1.5, label: 'Jan 11' },
  { timestamp: new Date('2024-01-12T00:00:00Z'), value: 1.9, label: 'Jan 12' },
  { timestamp: new Date('2024-01-13T00:00:00Z'), value: 2.2, label: 'Jan 13' },
  { timestamp: new Date('2024-01-14T00:00:00Z'), value: 1.7, label: 'Jan 14' },
  { timestamp: new Date('2024-01-15T00:00:00Z'), value: 1.95, label: 'Jan 15' }
]

// Export Summary
export const mockExportData = {
  availableReports: [
    { id: 'quality-summary', name: 'Quality Summary Report', description: 'Overall quality metrics and trends', format: ['PDF', 'CSV'] },
    { id: 'defect-analysis', name: 'Defect Analysis Report', description: 'Detailed defect breakdown and statistics', format: ['PDF', 'Excel'] },
    { id: 'performance-metrics', name: 'Performance Metrics', description: 'System and processing performance data', format: ['CSV', 'JSON'] },
    { id: 'inspection-history', name: 'Inspection History', description: 'Complete inspection records and results', format: ['CSV', 'Excel'] }
  ]
}
