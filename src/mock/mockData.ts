/**
 * Central Mock Data Export File
 * 
 * This file provides a single point of access to all mock data used throughout
 * the Aegis Vision AI Manufacturing Platform for development and testing.
 */

// Dashboard Data Exports
export {
  mockDashboardTiles,
  mockProductionMetrics,
  mockRecentAlerts,
  mockDashboardMetrics,
  mockQualityTrendData,
  mockDefectDistribution,
  mockThroughputData
} from './dashboardData'

// Analytics Data Exports
export {
  mockAnalyticsOverview,
  mockQualityMetrics,
  mockSystemStatus,
  mockPerformanceData,
  mockErrorRateData,
  mockExportData
} from './analyticsData'

// Camera Data Exports
export {
  mockCameras,
  mockCameraStats,
  mockCameraPerformance,
  mockCameraConfigs,
  mockNetworkStatus,
  mockCameraEvents
} from './camerasData'

// Inspection Data Exports
export {
  mockROIAreas,
  mockInspectionConfig,
  mockInspections,
  mockInspectionQueue,
  mockInspectionHistory,
  mockDetectedDefects,
  mockInspectionResults,
  mockInspectionStats
} from './inspectionData'

// Model Data Exports
export {
  mockTrainingData,
  mockModelConfigs,
  mockModels,
  mockTrainingJobs,
  mockModelPerformance,
  mockModelDeployments,
  mockModelMetricsHistory,
  mockDatasets
} from './modelData'

// Incidents Data Exports
export {
  mockIncidents,
  mockIncidentStats,
  mockIncidentTrends,
  mockRecentActivity,
  type Incident
} from './incidentsData'

// Component Data Exports
export {
  mockAlertItems,
  mockLiveTiles,
  mockPerformanceTiles,
  mockCameraTiles,
  mockRealTimeUpdates,
  mockTileConfigs
} from './componentData'