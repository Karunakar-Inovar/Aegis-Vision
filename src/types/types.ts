// Shared types for Aegis Vision AI Manufacturing Platform

// Base types
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// Camera types
export interface Camera extends BaseEntity {
  name: string
  location: string
  status: CameraStatus
  resolution: Resolution
  frameRate: number
  isActive: boolean
  streamUrl?: string
  lastHeartbeat?: Date
}

export type CameraStatus = 'online' | 'offline' | 'error' | 'maintenance'

export interface Resolution {
  width: number
  height: number
}

// Inspection types
export interface Inspection extends BaseEntity {
  name: string
  description?: string
  cameraId: string
  modelId: string
  status: InspectionStatus
  configuration: InspectionConfiguration
  lastRun?: Date
  totalRuns: number
  successRate: number
}

export type InspectionStatus = 'active' | 'inactive' | 'running' | 'error'

export interface InspectionConfiguration {
  threshold: number
  roiAreas: ROIArea[]
  alertSettings: AlertSettings
  schedule?: InspectionSchedule
}

export interface InspectionSchedule {
  enabled: boolean
  interval: number // in minutes
  startTime?: string
  endTime?: string
  days: string[] // ['monday', 'tuesday', etc.]
}

// ROI (Region of Interest) types
export interface ROIArea {
  id: string
  name: string
  type: ROIType
  coordinates: Coordinates
  color: string
  isActive: boolean
  threshold?: number
}

export type ROIType = 'defect' | 'quality' | 'measurement' | 'inspection'

export interface Coordinates {
  x: number
  y: number
  width: number
  height: number
}

// Model types
export interface Model extends BaseEntity {
  name: string
  version: string
  type: ModelType
  status: ModelStatus
  accuracy: number
  trainingData: TrainingData
  configuration: ModelConfiguration
  filePath?: string
  fileSize?: number
}

export type ModelType = 'classification' | 'detection' | 'segmentation'
export type ModelStatus = 'training' | 'ready' | 'error' | 'deploying'

export interface TrainingData {
  totalImages: number
  annotatedImages: number
  classes: string[]
  lastTrainingDate?: Date
  trainingDuration?: number // in minutes
}

export interface ModelConfiguration {
  epochs: number
  batchSize: number
  learningRate: number
  augmentation: boolean
  validationSplit: number
}

// Annotation types
export interface Annotation extends BaseEntity {
  imageId: string
  userId: string
  type: AnnotationType
  coordinates: Coordinates
  label: string
  confidence?: number
  verified: boolean
  notes?: string
}

export type AnnotationType = 'bounding_box' | 'polygon' | 'point' | 'line'

export interface AnnotationProject extends BaseEntity {
  name: string
  description?: string
  status: ProjectStatus
  totalImages: number
  annotatedImages: number
  classes: AnnotationClass[]
  assignedUsers: string[]
}

export type ProjectStatus = 'active' | 'completed' | 'paused' | 'archived'

export interface AnnotationClass {
  id: string
  name: string
  color: string
  description?: string
}

// Alert types
export interface Alert extends BaseEntity {
  type: AlertType
  severity: AlertSeverity
  title: string
  message: string
  source: AlertSource
  sourceId: string
  status: AlertStatus
  acknowledgedBy?: string
  acknowledgedAt?: Date
  resolvedAt?: Date
}

export type AlertType = 'defect_detected' | 'quality_threshold' | 'system_error' | 'maintenance_required'
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical'
export type AlertSource = 'camera' | 'inspection' | 'model' | 'system'
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'dismissed'

export interface AlertSettings {
  enabled: boolean
  emailNotifications: boolean
  webhookUrl?: string
  thresholds: {
    defectCount: number
    qualityScore: number
    systemError: boolean
  }
}

// Analytics types
export interface DashboardMetrics {
  totalInspections: number
  activeInspections: number
  totalDefectsToday: number
  qualityScore: number
  systemUptime: number
  recentAlerts: Alert[]
  productionMetrics: ProductionMetrics
}

export interface ProductionMetrics {
  totalItems: number
  passedItems: number
  failedItems: number
  throughput: number // items per hour
  efficiency: number // percentage
}

export interface QualityMetrics {
  overallScore: number
  trendData: MetricDataPoint[]
  defectsByType: DefectTypeMetric[]
  timeRange: string
}

export interface MetricDataPoint {
  timestamp: Date
  value: number
  label?: string
}

export interface DefectTypeMetric {
  type: string
  count: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
}

// User types
export interface User extends BaseEntity {
  username: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  permissions: Permission[]
  isActive: boolean
  lastLogin?: Date
}

export type UserRole = 'admin' | 'operator' | 'viewer' | 'annotator'

export interface Permission {
  resource: string
  actions: string[] // ['read', 'write', 'delete']
}

// System types
export interface SystemStatus {
  status: 'healthy' | 'warning' | 'error'
  uptime: number
  version: string
  services: ServiceStatus[]
  resources: ResourceUsage
}

export interface ServiceStatus {
  name: string
  status: 'running' | 'stopped' | 'error'
  lastCheck: Date
  responseTime?: number
}

export interface ResourceUsage {
  cpu: number // percentage
  memory: number // percentage
  disk: number // percentage
  network: NetworkUsage
}

export interface NetworkUsage {
  bytesIn: number
  bytesOut: number
  packetsIn: number
  packetsOut: number
}

// UI Component types
export interface LiveTileData {
  id: string
  title: string
  value: string | number
  unit?: string
  status: 'success' | 'warning' | 'error' | 'info'
  trend?: 'up' | 'down' | 'stable'
  trendValue?: number
  lastUpdated: Date
}

export interface ThresholdConfig {
  min: number
  max: number
  current: number
  step: number
  unit?: string
  color?: string
}

export interface RuleCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains'
  value: string | number
}

export interface Rule {
  id: string
  name: string
  description?: string
  conditions: RuleCondition[]
  actions: RuleAction[]
  isActive: boolean
}

export interface RuleAction {
  type: 'alert' | 'email' | 'webhook' | 'stop_inspection'
  parameters: Record<string, any>
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'textarea'
  required?: boolean
  options?: { label: string; value: string }[]
  validation?: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'pattern'
  value?: string | number
  message: string
}

// API types
export interface ApiError {
  code: string
  message: string
  details?: any
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, any>
}

// Event types for real-time updates
export interface WebSocketEvent {
  type: string
  data: any
  timestamp: Date
}

export interface CameraEvent extends WebSocketEvent {
  type: 'camera_status_changed' | 'camera_feed_updated'
  data: {
    cameraId: string
    status?: CameraStatus
    frameData?: string
  }
}

export interface InspectionEvent extends WebSocketEvent {
  type: 'inspection_started' | 'inspection_completed' | 'defect_detected'
  data: {
    inspectionId: string
    result?: InspectionResult
    defects?: DetectedDefect[]
  }
}

export interface InspectionResult {
  id: string
  inspectionId: string
  imageData: string
  timestamp: Date
  overallScore: number
  defectsFound: number
  processingTime: number
  status: 'passed' | 'failed'
}

export interface DetectedDefect {
  id: string
  type: string
  confidence: number
  coordinates: Coordinates
  severity: 'low' | 'medium' | 'high'
  description?: string
}
