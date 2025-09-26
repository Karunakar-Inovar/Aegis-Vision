import { LiveTileData } from '@/types/types'

// Alert Item Mock Data (compatible with existing AlertItem component)
export const mockAlertItems = [
  {
    id: 1,
    camera: 'Production Line 1 - Main',
    message: 'Surface defect detected on aluminum panel',
    timestamp: '2024-01-15T14:20:00Z',
    severity: 'high'
  },
  {
    id: 2,
    camera: 'Quality Control Station',
    message: 'Quality score below threshold (89.2%)',
    timestamp: '2024-01-15T14:15:00Z',
    severity: 'medium'
  },
  {
    id: 3,
    camera: 'Production Line 2 - Main',
    message: 'Inspection completed successfully',
    timestamp: '2024-01-15T14:10:00Z',
    severity: 'low'
  },
  {
    id: 4,
    camera: 'Packaging Station - Overview',
    message: 'Camera calibration required',
    timestamp: '2024-01-15T14:05:00Z',
    severity: 'medium'
  },
  {
    id: 5,
    camera: 'Assembly Line - Detail View',
    message: 'Processing time exceeded normal range',
    timestamp: '2024-01-15T14:00:00Z',
    severity: 'medium'
  },
  {
    id: 6,
    camera: 'Final Inspection Point',
    message: 'Network connectivity issue resolved',
    timestamp: '2024-01-15T13:55:00Z',
    severity: 'low'
  },
  {
    id: 7,
    camera: 'Production Line 3 - Main',
    message: 'Maintenance mode activated',
    timestamp: '2024-01-15T13:50:00Z',
    severity: 'low'
  },
  {
    id: 8,
    camera: 'Warehouse Entry Point',
    message: 'Camera offline - check connection',
    timestamp: '2024-01-15T12:45:00Z',
    severity: 'high'
  }
]

// LiveTile Mock Data (compatible with existing LiveTile component)
export const mockLiveTiles: LiveTileData[] = [
  {
    id: 'tile-total-inspections',
    title: 'Total Inspections Today',
    value: 1247,
    status: 'success',
    trend: 'up',
    trendValue: 12,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'tile-active-cameras',
    title: 'Active Cameras',
    value: 6,
    unit: 'of 8',
    status: 'warning',
    trend: 'down',
    trendValue: 1,
    lastUpdated: new Date('2024-01-15T14:29:00Z')
  },
  {
    id: 'tile-quality-score',
    title: 'Average Quality Score',
    value: 96.8,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 2.3,
    lastUpdated: new Date('2024-01-15T14:28:00Z')
  },
  {
    id: 'tile-defects-found',
    title: 'Defects Found Today',
    value: 23,
    status: 'warning',
    trend: 'down',
    trendValue: 5,
    lastUpdated: new Date('2024-01-15T14:27:00Z')
  },
  {
    id: 'tile-processing-time',
    title: 'Avg Processing Time',
    value: 2.4,
    unit: 'sec',
    status: 'success',
    trend: 'stable',
    trendValue: 0.1,
    lastUpdated: new Date('2024-01-15T14:26:00Z')
  },
  {
    id: 'tile-throughput',
    title: 'Current Throughput',
    value: 342,
    unit: 'items/hr',
    status: 'success',
    trend: 'up',
    trendValue: 18,
    lastUpdated: new Date('2024-01-15T14:25:00Z')
  },
  {
    id: 'tile-system-uptime',
    title: 'System Uptime',
    value: 99.7,
    unit: '%',
    status: 'success',
    trend: 'stable',
    trendValue: 0,
    lastUpdated: new Date('2024-01-15T14:24:00Z')
  },
  {
    id: 'tile-active-alerts',
    title: 'Active Alerts',
    value: 3,
    status: 'error',
    trend: 'up',
    trendValue: 2,
    lastUpdated: new Date('2024-01-15T14:23:00Z')
  },
  {
    id: 'tile-models-deployed',
    title: 'Models Deployed',
    value: 4,
    unit: 'active',
    status: 'success',
    trend: 'stable',
    trendValue: 0,
    lastUpdated: new Date('2024-01-15T14:22:00Z')
  },
  {
    id: 'tile-storage-used',
    title: 'Storage Used',
    value: 68.2,
    unit: '%',
    status: 'info',
    trend: 'up',
    trendValue: 3.1,
    lastUpdated: new Date('2024-01-15T14:21:00Z')
  },
  {
    id: 'tile-network-bandwidth',
    title: 'Network Bandwidth',
    value: 45.2,
    unit: 'Mbps',
    status: 'success',
    trend: 'stable',
    trendValue: 1.2,
    lastUpdated: new Date('2024-01-15T14:20:00Z')
  },
  {
    id: 'tile-cpu-usage',
    title: 'CPU Usage',
    value: 68.5,
    unit: '%',
    status: 'warning',
    trend: 'up',
    trendValue: 8.3,
    lastUpdated: new Date('2024-01-15T14:19:00Z')
  }
]

// Performance Metrics for Live Tiles
export const mockPerformanceTiles: LiveTileData[] = [
  {
    id: 'perf-accuracy',
    title: 'Model Accuracy',
    value: 98.2,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 0.5,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'perf-precision',
    title: 'Model Precision',
    value: 97.8,
    unit: '%',
    status: 'success',
    trend: 'stable',
    trendValue: 0.1,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'perf-recall',
    title: 'Model Recall',
    value: 98.5,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 0.3,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'perf-f1-score',
    title: 'F1 Score',
    value: 98.1,
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 0.4,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'perf-inference-time',
    title: 'Avg Inference Time',
    value: 87,
    unit: 'ms',
    status: 'success',
    trend: 'down',
    trendValue: 12,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'perf-error-rate',
    title: 'Error Rate',
    value: 1.2,
    unit: '%',
    status: 'success',
    trend: 'down',
    trendValue: 0.3,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  }
]

// Camera Status Tiles
export const mockCameraTiles: LiveTileData[] = [
  {
    id: 'cam-online',
    title: 'Cameras Online',
    value: 6,
    unit: 'of 8',
    status: 'warning',
    trend: 'down',
    trendValue: 1,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'cam-bandwidth',
    title: 'Total Bandwidth',
    value: 45.2,
    unit: 'Mbps',
    status: 'success',
    trend: 'stable',
    trendValue: 1.2,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'cam-frames-processed',
    title: 'Frames Processed',
    value: 28420,
    unit: 'today',
    status: 'success',
    trend: 'up',
    trendValue: 1250,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'cam-avg-response',
    title: 'Avg Response Time',
    value: 47,
    unit: 'ms',
    status: 'success',
    trend: 'stable',
    trendValue: 3,
    lastUpdated: new Date('2024-01-15T14:30:00Z')
  }
]

// Real-time Status Updates (simulated)
export const mockRealTimeUpdates = [
  {
    tileId: 'tile-total-inspections',
    newValue: 1248,
    timestamp: new Date()
  },
  {
    tileId: 'tile-quality-score',
    newValue: 96.9,
    timestamp: new Date()
  },
  {
    tileId: 'tile-throughput',
    newValue: 345,
    timestamp: new Date()
  }
]

// Tile Configuration Options
export const mockTileConfigs = [
  {
    id: 'config-refresh-rate',
    name: 'Auto Refresh Rate',
    options: ['5s', '10s', '30s', '1m', '5m'],
    default: '30s'
  },
  {
    id: 'config-display-mode',
    name: 'Display Mode',
    options: ['Compact', 'Detailed', 'Chart View'],
    default: 'Compact'
  },
  {
    id: 'config-alert-threshold',
    name: 'Alert Threshold',
    options: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  }
]
