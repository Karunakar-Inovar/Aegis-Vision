import { Camera, CameraStatus, Resolution } from '@/types/types'

// Camera Mock Data
export const mockCameras: Camera[] = [
  {
    id: 'cam-001',
    name: 'Production Line 1 - Main',
    location: 'Manufacturing Floor - Line 1',
    status: 'online' as CameraStatus,
    resolution: { width: 1920, height: 1080 } as Resolution,
    frameRate: 30,
    isActive: true,
    streamUrl: 'rtsp://192.168.1.101:554/stream1',
    lastHeartbeat: new Date('2024-01-15T14:30:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'cam-002',
    name: 'Production Line 2 - Main',
    location: 'Manufacturing Floor - Line 2',
    status: 'online' as CameraStatus,
    resolution: { width: 1920, height: 1080 } as Resolution,
    frameRate: 30,
    isActive: true,
    streamUrl: 'rtsp://192.168.1.102:554/stream1',
    lastHeartbeat: new Date('2024-01-15T14:29:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T14:29:00Z')
  },
  {
    id: 'cam-003',
    name: 'Production Line 3 - Main',
    location: 'Manufacturing Floor - Line 3',
    status: 'maintenance' as CameraStatus,
    resolution: { width: 1920, height: 1080 } as Resolution,
    frameRate: 30,
    isActive: false,
    streamUrl: 'rtsp://192.168.1.103:554/stream1',
    lastHeartbeat: new Date('2024-01-15T10:15:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T10:15:00Z')
  },
  {
    id: 'cam-004',
    name: 'Quality Control Station',
    location: 'Quality Control Department',
    status: 'online' as CameraStatus,
    resolution: { width: 2560, height: 1440 } as Resolution,
    frameRate: 60,
    isActive: true,
    streamUrl: 'rtsp://192.168.1.104:554/stream1',
    lastHeartbeat: new Date('2024-01-15T14:30:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'cam-005',
    name: 'Packaging Station - Overview',
    location: 'Packaging Department',
    status: 'online' as CameraStatus,
    resolution: { width: 1920, height: 1080 } as Resolution,
    frameRate: 25,
    isActive: true,
    streamUrl: 'rtsp://192.168.1.105:554/stream1',
    lastHeartbeat: new Date('2024-01-15T14:28:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T14:28:00Z')
  },
  {
    id: 'cam-006',
    name: 'Warehouse Entry Point',
    location: 'Warehouse - Entry',
    status: 'offline' as CameraStatus,
    resolution: { width: 1280, height: 720 } as Resolution,
    frameRate: 15,
    isActive: false,
    streamUrl: 'rtsp://192.168.1.106:554/stream1',
    lastHeartbeat: new Date('2024-01-15T12:45:00Z'),
    createdAt: new Date('2024-01-01T08:00:00Z'),
    updatedAt: new Date('2024-01-15T12:45:00Z')
  },
  {
    id: 'cam-007',
    name: 'Assembly Line - Detail View',
    location: 'Assembly Department',
    status: 'online' as CameraStatus,
    resolution: { width: 3840, height: 2160 } as Resolution,
    frameRate: 30,
    isActive: true,
    streamUrl: 'rtsp://192.168.1.107:554/stream1',
    lastHeartbeat: new Date('2024-01-15T14:30:00Z'),
    createdAt: new Date('2024-01-02T09:00:00Z'),
    updatedAt: new Date('2024-01-15T14:30:00Z')
  },
  {
    id: 'cam-008',
    name: 'Final Inspection Point',
    location: 'Shipping Department',
    status: 'error' as CameraStatus,
    resolution: { width: 1920, height: 1080 } as Resolution,
    frameRate: 30,
    isActive: false,
    streamUrl: 'rtsp://192.168.1.108:554/stream1',
    lastHeartbeat: new Date('2024-01-15T13:20:00Z'),
    createdAt: new Date('2024-01-02T09:00:00Z'),
    updatedAt: new Date('2024-01-15T13:20:00Z')
  }
]

// Camera Statistics
export const mockCameraStats = {
  total: mockCameras.length,
  online: mockCameras.filter(cam => cam.status === 'online').length,
  offline: mockCameras.filter(cam => cam.status === 'offline').length,
  maintenance: mockCameras.filter(cam => cam.status === 'maintenance').length,
  error: mockCameras.filter(cam => cam.status === 'error').length,
  totalBandwidth: '45.2 Mbps',
  averageUptime: '98.7%'
}

// Camera Performance Data
export const mockCameraPerformance = mockCameras.map(camera => ({
  cameraId: camera.id,
  name: camera.name,
  uptime: camera.status === 'online' ? Math.random() * 2 + 98 : camera.status === 'offline' ? 0 : Math.random() * 10 + 85,
  avgResponseTime: Math.floor(Math.random() * 50 + 20),
  totalInspections: Math.floor(Math.random() * 2000 + 1000),
  defectsDetected: Math.floor(Math.random() * 50 + 5),
  lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
  bandwidth: `${(Math.random() * 8 + 2).toFixed(1)} Mbps`
}))

// Camera Configuration Templates
export const mockCameraConfigs = [
  {
    id: 'config-high-res',
    name: 'High Resolution Quality Control',
    description: 'Optimized for detailed defect detection',
    resolution: { width: 3840, height: 2160 },
    frameRate: 30,
    compression: 'H.265',
    bitrate: '8 Mbps'
  },
  {
    id: 'config-standard',
    name: 'Standard Production Line',
    description: 'Balanced quality and performance',
    resolution: { width: 1920, height: 1080 },
    frameRate: 30,
    compression: 'H.264',
    bitrate: '4 Mbps'
  },
  {
    id: 'config-low-bandwidth',
    name: 'Low Bandwidth Monitoring',
    description: 'Optimized for limited network capacity',
    resolution: { width: 1280, height: 720 },
    frameRate: 15,
    compression: 'H.264',
    bitrate: '2 Mbps'
  }
]

// Camera Network Status
export const mockNetworkStatus = {
  totalBandwidthUsed: 45.2,
  totalBandwidthAvailable: 100,
  packetsLost: 0.02,
  averageLatency: 12,
  networkHealth: 'excellent' as 'excellent' | 'good' | 'fair' | 'poor',
  connectedCameras: mockCameras.filter(cam => cam.status === 'online').length
}

// Recent Camera Events
export const mockCameraEvents = [
  {
    id: 'event-001',
    cameraId: 'cam-003',
    type: 'maintenance_started',
    message: 'Scheduled maintenance started',
    timestamp: new Date('2024-01-15T10:15:00Z'),
    severity: 'info' as const
  },
  {
    id: 'event-002',
    cameraId: 'cam-008',
    type: 'connection_error',
    message: 'Network connection lost',
    timestamp: new Date('2024-01-15T13:20:00Z'),
    severity: 'high' as const
  },
  {
    id: 'event-003',
    cameraId: 'cam-006',
    type: 'offline',
    message: 'Camera went offline unexpectedly',
    timestamp: new Date('2024-01-15T12:45:00Z'),
    severity: 'medium' as const
  },
  {
    id: 'event-004',
    cameraId: 'cam-001',
    type: 'quality_alert',
    message: 'Image quality degradation detected',
    timestamp: new Date('2024-01-15T09:30:00Z'),
    severity: 'medium' as const
  },
  {
    id: 'event-005',
    cameraId: 'cam-007',
    type: 'configuration_updated',
    message: 'Camera configuration updated successfully',
    timestamp: new Date('2024-01-15T08:15:00Z'),
    severity: 'info' as const
  }
]
