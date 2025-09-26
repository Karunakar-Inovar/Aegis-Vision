import { Alert, AlertType, AlertSeverity, AlertSource, AlertStatus } from '@/types/types'

// Incident Types (extending Alert for more detailed incident management)
export interface Incident extends Alert {
  assignedTo?: string
  category: 'quality' | 'safety' | 'equipment' | 'process' | 'environmental'
  priority: 'low' | 'medium' | 'high' | 'critical'
  location: string
  affectedProducts?: string[]
  estimatedImpact: string
  rootCause?: string
  correctiveActions?: string[]
  preventiveActions?: string[]
  attachments?: string[]
  relatedIncidents?: string[]
  costImpact?: number
}

// Mock Incidents Data
export const mockIncidents: Incident[] = [
  {
    id: 'inc-001',
    type: 'defect_detected' as AlertType,
    severity: 'high' as AlertSeverity,
    title: 'Multiple Surface Defects Detected',
    message: 'Batch BATCH-2024-A-015 showing high defect rate (12%)',
    source: 'inspection' as AlertSource,
    sourceId: 'ins-001',
    status: 'active' as AlertStatus,
    assignedTo: 'sarah.chen@company.com',
    category: 'quality',
    priority: 'high',
    location: 'Production Line 1',
    affectedProducts: ['Aluminum Panel - Series A', 'Aluminum Panel - Series B'],
    estimatedImpact: '~$15,000 in potential rework costs',
    rootCause: 'Tool wear on cutting machine #3',
    correctiveActions: [
      'Replace cutting tool on machine #3',
      'Inspect all products from last 4 hours',
      'Adjust quality thresholds for early detection'
    ],
    preventiveActions: [
      'Implement predictive maintenance schedule',
      'Add tool wear monitoring sensors'
    ],
    attachments: ['defect_analysis_report.pdf', 'batch_inspection_images.zip'],
    costImpact: 15000,
    createdAt: new Date('2024-01-15T09:15:00Z'),
    updatedAt: new Date('2024-01-15T14:20:00Z')
  },
  {
    id: 'inc-002',
    type: 'system_error' as AlertType,
    severity: 'critical' as AlertSeverity,
    title: 'Camera Network Failure',
    message: 'Primary camera network down, backup systems activated',
    source: 'system' as AlertSource,
    sourceId: 'network-primary',
    status: 'acknowledged' as AlertStatus,
    acknowledgedBy: 'mike.johnson@company.com',
    acknowledgedAt: new Date('2024-01-15T11:30:00Z'),
    assignedTo: 'it-support@company.com',
    category: 'equipment',
    priority: 'critical',
    location: 'Server Room A',
    affectedProducts: ['All production lines'],
    estimatedImpact: 'Production slowdown, 40% capacity reduction',
    rootCause: 'Network switch hardware failure',
    correctiveActions: [
      'Replace faulty network switch',
      'Restore primary network connectivity',
      'Verify all camera connections'
    ],
    preventiveActions: [
      'Install redundant network switches',
      'Implement network monitoring alerts'
    ],
    attachments: ['network_diagnostics.log', 'switch_error_report.txt'],
    costImpact: 25000,
    createdAt: new Date('2024-01-15T11:25:00Z'),
    updatedAt: new Date('2024-01-15T11:30:00Z')
  },
  {
    id: 'inc-003',
    type: 'quality_threshold' as AlertType,
    severity: 'medium' as AlertSeverity,
    title: 'Quality Score Below Threshold',
    message: 'Line 2 quality score dropped to 89.2% (threshold: 95%)',
    source: 'inspection' as AlertSource,
    sourceId: 'ins-002',
    status: 'resolved' as AlertStatus,
    resolvedAt: new Date('2024-01-15T13:45:00Z'),
    assignedTo: 'alex.rodriguez@company.com',
    category: 'quality',
    priority: 'medium',
    location: 'Production Line 2',
    affectedProducts: ['Steel Component - Type B', 'Steel Component - Type C'],
    estimatedImpact: 'Increased inspection time, 15% throughput reduction',
    rootCause: 'Calibration drift in inspection camera',
    correctiveActions: [
      'Recalibrate inspection camera CAM-LINE-02',
      'Update quality thresholds based on new calibration',
      'Re-inspect last 2 hours of production'
    ],
    preventiveActions: [
      'Schedule weekly camera calibration checks',
      'Implement automatic calibration verification'
    ],
    attachments: ['calibration_report.pdf'],
    costImpact: 3500,
    createdAt: new Date('2024-01-15T12:20:00Z'),
    updatedAt: new Date('2024-01-15T13:45:00Z')
  },
  {
    id: 'inc-004',
    type: 'maintenance_required' as AlertType,
    severity: 'low' as AlertSeverity,
    title: 'Scheduled Maintenance Due',
    message: 'Camera CAM-QC-01 due for quarterly maintenance',
    source: 'system' as AlertSource,
    sourceId: 'maintenance-scheduler',
    status: 'active' as AlertStatus,
    assignedTo: 'maintenance@company.com',
    category: 'equipment',
    priority: 'low',
    location: 'Quality Control Station',
    affectedProducts: [],
    estimatedImpact: '2-hour downtime during maintenance window',
    correctiveActions: [
      'Schedule maintenance during off-hours',
      'Prepare backup inspection procedures'
    ],
    preventiveActions: [
      'Update maintenance schedule in system',
      'Order replacement parts in advance'
    ],
    attachments: ['maintenance_checklist.pdf'],
    costImpact: 500,
    createdAt: new Date('2024-01-15T08:00:00Z'),
    updatedAt: new Date('2024-01-15T08:00:00Z')
  },
  {
    id: 'inc-005',
    type: 'defect_detected' as AlertType,
    severity: 'medium' as AlertSeverity,
    title: 'Packaging Integrity Issues',
    message: 'Increased packaging defect rate detected on Line 5',
    source: 'inspection' as AlertSource,
    sourceId: 'ins-004',
    status: 'acknowledged' as AlertStatus,
    acknowledgedBy: 'lisa.wang@company.com',
    acknowledgedAt: new Date('2024-01-14T16:20:00Z'),
    assignedTo: 'packaging-team@company.com',
    category: 'process',
    priority: 'medium',
    location: 'Packaging Line 5',
    affectedProducts: ['Package Assembly - Standard', 'Package Assembly - Premium'],
    estimatedImpact: '8% increase in packaging waste',
    rootCause: 'Adhesive temperature variation',
    correctiveActions: [
      'Adjust adhesive heating system temperature',
      'Inspect and replace temperature sensors',
      'Review packaging process parameters'
    ],
    preventiveActions: [
      'Install redundant temperature monitoring',
      'Implement process control charts'
    ],
    attachments: ['packaging_analysis.xlsx', 'temperature_logs.csv'],
    relatedIncidents: ['inc-012', 'inc-018'],
    costImpact: 2800,
    createdAt: new Date('2024-01-14T15:45:00Z'),
    updatedAt: new Date('2024-01-14T16:20:00Z')
  },
  {
    id: 'inc-006',
    type: 'system_error' as AlertType,
    severity: 'high' as AlertSeverity,
    title: 'AI Model Performance Degradation',
    message: 'DefectNet-V2 accuracy dropped to 91.2% (expected: >95%)',
    source: 'model' as AlertSource,
    sourceId: 'model-001',
    status: 'active' as AlertStatus,
    assignedTo: 'ai-team@company.com',
    category: 'equipment',
    priority: 'high',
    location: 'AI Processing Center',
    affectedProducts: ['All inspected products'],
    estimatedImpact: 'Increased false positives, manual review required',
    rootCause: 'Model drift due to new product variations',
    correctiveActions: [
      'Retrain model with recent data',
      'Adjust confidence thresholds temporarily',
      'Implement manual review process'
    ],
    preventiveActions: [
      'Set up model performance monitoring',
      'Schedule regular model retraining',
      'Implement data drift detection'
    ],
    attachments: ['model_performance_report.pdf', 'training_data_analysis.xlsx'],
    costImpact: 8000,
    createdAt: new Date('2024-01-14T10:30:00Z'),
    updatedAt: new Date('2024-01-15T09:15:00Z')
  }
]

// Incident Statistics
export const mockIncidentStats = {
  total: mockIncidents.length,
  active: mockIncidents.filter(inc => inc.status === 'active').length,
  acknowledged: mockIncidents.filter(inc => inc.status === 'acknowledged').length,
  resolved: mockIncidents.filter(inc => inc.status === 'resolved').length,
  critical: mockIncidents.filter(inc => inc.severity === 'critical').length,
  high: mockIncidents.filter(inc => inc.severity === 'high').length,
  medium: mockIncidents.filter(inc => inc.severity === 'medium').length,
  low: mockIncidents.filter(inc => inc.severity === 'low').length,
  totalCostImpact: mockIncidents.reduce((sum, inc) => sum + (inc.costImpact || 0), 0),
  averageResolutionTime: '4.2 hours', // Mock average
  incidentsByCategory: {
    quality: mockIncidents.filter(inc => inc.category === 'quality').length,
    safety: mockIncidents.filter(inc => inc.category === 'safety').length,
    equipment: mockIncidents.filter(inc => inc.category === 'equipment').length,
    process: mockIncidents.filter(inc => inc.category === 'process').length,
    environmental: mockIncidents.filter(inc => inc.category === 'environmental').length
  }
}

// Incident Trends (last 30 days)
export const mockIncidentTrends = [
  { date: '2024-01-01', count: 3, resolved: 2 },
  { date: '2024-01-02', count: 1, resolved: 3 },
  { date: '2024-01-03', count: 4, resolved: 1 },
  { date: '2024-01-04', count: 2, resolved: 4 },
  { date: '2024-01-05', count: 5, resolved: 3 },
  { date: '2024-01-06', count: 1, resolved: 2 },
  { date: '2024-01-07', count: 3, resolved: 4 },
  { date: '2024-01-08', count: 2, resolved: 1 },
  { date: '2024-01-09', count: 4, resolved: 5 },
  { date: '2024-01-10', count: 3, resolved: 2 },
  { date: '2024-01-11', count: 1, resolved: 3 },
  { date: '2024-01-12', count: 2, resolved: 1 },
  { date: '2024-01-13', count: 6, resolved: 4 },
  { date: '2024-01-14', count: 3, resolved: 2 },
  { date: '2024-01-15', count: 4, resolved: 1 }
]

// Recent Activity Feed
export const mockRecentActivity = [
  {
    id: 'activity-001',
    incidentId: 'inc-001',
    action: 'status_updated',
    description: 'Incident status updated to "In Progress"',
    user: 'sarah.chen@company.com',
    timestamp: new Date('2024-01-15T14:20:00Z')
  },
  {
    id: 'activity-002',
    incidentId: 'inc-003',
    action: 'resolved',
    description: 'Incident resolved - camera recalibrated successfully',
    user: 'alex.rodriguez@company.com',
    timestamp: new Date('2024-01-15T13:45:00Z')
  },
  {
    id: 'activity-003',
    incidentId: 'inc-002',
    action: 'acknowledged',
    description: 'Incident acknowledged - IT team investigating',
    user: 'mike.johnson@company.com',
    timestamp: new Date('2024-01-15T11:30:00Z')
  },
  {
    id: 'activity-004',
    incidentId: 'inc-006',
    action: 'comment_added',
    description: 'Added comment: "Model retraining scheduled for tonight"',
    user: 'ai-team@company.com',
    timestamp: new Date('2024-01-15T09:15:00Z')
  },
  {
    id: 'activity-005',
    incidentId: 'inc-004',
    action: 'created',
    description: 'New maintenance incident created',
    user: 'system',
    timestamp: new Date('2024-01-15T08:00:00Z')
  }
]
