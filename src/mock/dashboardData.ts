import { DashboardMetrics, ProductionMetrics, Alert, LiveTileData } from '@/types/types'

// Dashboard Live Tile Data
export const mockDashboardTiles: LiveTileData[] = [
  {
    id: 'total-inspections',
    title: 'Total Inspections',
    value: 1247,
    status: 'success',
    trend: 'up',
    trendValue: 12,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'active-inspections',
    title: 'Active Inspections',
    value: 8,
    status: 'info',
    trend: 'stable',
    trendValue: 0,
    lastUpdated: new Date('2024-01-15T14:29:00Z')
  },
  {
    id: 'quality-score',
    title: 'Quality Score',
    value: 96.8,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 2.3,
    lastUpdated: new Date('2024-01-15T14:28:00Z')
  },
  {
    id: 'defects-today',
    title: 'Defects Today',
    value: 23,
    status: 'warning',
    trend: 'down',
    trendValue: 5,
    lastUpdated: new Date('2024-01-15T14:27:00Z')
  },
  {
    id: 'system-uptime',
    title: 'System Uptime',
    value: 99.7,
    unit: '%',
    status: 'success',
    trend: 'stable',
    trendValue: 0.1,
    lastUpdated: new Date('2024-01-15T14:26:00Z')
  },
  {
    id: 'throughput',
    title: 'Throughput',
    value: 342,
    unit: 'items/hr',
    status: 'success',
    trend: 'up',
    trendValue: 18,
    lastUpdated: new Date('2024-01-15T14:25:00Z')
  },
  {
    id: 'efficiency',
    title: 'Efficiency',
    value: 94.2,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 3.1,
    lastUpdated: new Date('2024-01-15T14:24:00Z')
  },
  {
    id: 'alerts',
    title: 'Active Alerts',
    value: 3,
    status: 'warning',
    trend: 'down',
    trendValue: 2,
    lastUpdated: new Date('2024-01-15T14:23:00Z')
  }
]

// Production Metrics
export const mockProductionMetrics: ProductionMetrics = {
  totalItems: 3420,
  passedItems: 3312,
  failedItems: 108,
  throughput: 342,
  efficiency: 94.2
}

// Recent Alerts
export const mockRecentAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'defect_detected',
    severity: 'high',
    title: 'Defect Detected',
    message: 'Surface scratch detected on aluminum panel',
    source: 'camera',
    sourceId: 'CAM-LINE-01',
    status: 'active',
    createdAt: new Date('2024-01-15T14:20:00Z'),
    updatedAt: new Date('2024-01-15T14:20:00Z')
  },
  {
    id: 'alert-002',
    type: 'quality_threshold',
    severity: 'medium',
    title: 'Quality Threshold Warning',
    message: 'Quality score dropped below 95% threshold',
    source: 'inspection',
    sourceId: 'INS-2024-098',
    status: 'acknowledged',
    acknowledgedBy: 'sarah.chen@company.com',
    acknowledgedAt: new Date('2024-01-15T14:15:00Z'),
    createdAt: new Date('2024-01-15T14:10:00Z'),
    updatedAt: new Date('2024-01-15T14:15:00Z')
  },
  {
    id: 'alert-003',
    type: 'maintenance_required',
    severity: 'low',
    title: 'Maintenance Scheduled',
    message: 'Camera CAM-LINE-03 scheduled for maintenance',
    source: 'system',
    sourceId: 'system',
    status: 'resolved',
    resolvedAt: new Date('2024-01-15T14:00:00Z'),
    createdAt: new Date('2024-01-15T13:45:00Z'),
    updatedAt: new Date('2024-01-15T14:00:00Z')
  }
]

// Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalInspections: 1247,
  activeInspections: 8,
  totalDefectsToday: 23,
  qualityScore: 96.8,
  systemUptime: 99.7,
  recentAlerts: mockRecentAlerts,
  productionMetrics: mockProductionMetrics
}

// Quality Metrics Chart Data
export const mockQualityTrendData = [
  { timestamp: new Date('2024-01-15T08:00:00Z'), value: 94.2, label: '8:00' },
  { timestamp: new Date('2024-01-15T09:00:00Z'), value: 95.1, label: '9:00' },
  { timestamp: new Date('2024-01-15T10:00:00Z'), value: 96.3, label: '10:00' },
  { timestamp: new Date('2024-01-15T11:00:00Z'), value: 97.2, label: '11:00' },
  { timestamp: new Date('2024-01-15T12:00:00Z'), value: 96.8, label: '12:00' },
  { timestamp: new Date('2024-01-15T13:00:00Z'), value: 95.9, label: '13:00' },
  { timestamp: new Date('2024-01-15T14:00:00Z'), value: 96.8, label: '14:00' }
]

// Defect Distribution Data
export const mockDefectDistribution = [
  { type: 'Surface Scratches', count: 12, percentage: 52.2, trend: 'down' as const },
  { type: 'Dents', count: 5, percentage: 21.7, trend: 'up' as const },
  { type: 'Color Variation', count: 4, percentage: 17.4, trend: 'stable' as const },
  { type: 'Edge Damage', count: 2, percentage: 8.7, trend: 'down' as const }
]

// Throughput Chart Data
export const mockThroughputData = [
  { timestamp: new Date('2024-01-15T08:00:00Z'), value: 320, label: '8:00' },
  { timestamp: new Date('2024-01-15T09:00:00Z'), value: 335, label: '9:00' },
  { timestamp: new Date('2024-01-15T10:00:00Z'), value: 342, label: '10:00' },
  { timestamp: new Date('2024-01-15T11:00:00Z'), value: 358, label: '11:00' },
  { timestamp: new Date('2024-01-15T12:00:00Z'), value: 340, label: '12:00' },
  { timestamp: new Date('2024-01-15T13:00:00Z'), value: 345, label: '13:00' },
  { timestamp: new Date('2024-01-15T14:00:00Z'), value: 342, label: '14:00' }
]
