import React, { useState, useEffect } from 'react'
import { AlertDrawer } from '@/components/AlertDrawer/AlertDrawer'
import { 
  TrendingUp, 
  TrendingDown, 
  Camera, 
  AlertTriangle, 
  Activity,
  BarChart3,
  Clock,
  CheckCircle,
  WifiIcon,
  ServerIcon,
  BatteryFullIcon,
  CircleIcon,
  MaximizeIcon,
  AlertCircleIcon,
  RefreshCwIcon,
  PlayIcon,
  PauseIcon,
  Settings,
  Eye,
  MoreVertical,
  Signal,
  HardDrive,
  Cpu,
  MemoryStick,
  Network
} from 'lucide-react'
import { mockData } from '@/mock/mockData'
import type { Alert } from '@/types/types'

export const Dashboard: React.FC = () => {
  const [alertDrawerOpen, setAlertDrawerOpen] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      // In a real app, this would update from WebSocket or polling
      console.log('Updating dashboard data...')
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleAlertClick = (alert: Alert) => {
    console.log('Alert clicked:', alert)
    // Navigate to alert details or handle alert action
  }

  const handleAcknowledgeAlert = (alertId: string) => {
    console.log('Acknowledge alert:', alertId)
    // API call to acknowledge alert
  }

  const handleDismissAlert = (alertId: string) => {
    console.log('Dismiss alert:', alertId)
    // API call to dismiss alert
  }

  const timeRangeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ]

  // Mock camera feed data
  const cameras = [
    {
      id: 1,
      name: 'Assembly Line East',
      status: 'active',
      roiStatus: 'normal',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Quality Control Station',
      status: 'active',
      roiStatus: 'warning',
      imageUrl: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Packaging Line',
      status: 'active',
      roiStatus: 'alert',
      imageUrl: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      name: 'Warehouse Monitor',
      status: 'active',
      roiStatus: 'normal',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      name: 'Loading Dock',
      status: 'active',
      roiStatus: 'normal',
      imageUrl: 'https://images.unsplash.com/photo-1597149565096-4b5dbd9c3262?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      name: 'Storage Area',
      status: 'active',
      roiStatus: 'normal',
      imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 7,
      name: 'Main Entrance',
      status: 'active',
      roiStatus: 'warning',
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 8,
      name: 'Perimeter Check',
      status: 'active',
      roiStatus: 'normal',
      imageUrl: 'https://images.unsplash.com/photo-1523346830303-4673c7f3a086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ]

  // Mock system status data
  const systemStatus = {
    network: {
      status: 'good',
      latency: '24ms',
    },
    server: {
      status: 'good',
      load: '42%',
    },
    storage: {
      status: 'warning',
      used: '78%',
    },
    cameras: {
      status: 'good',
      online: '8/8',
    },
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold mr-8">Vision AI Manufacturing Control</h1>
            <span className="text-sm text-gray-400 mr-4">
              Live View • {currentTime.toLocaleString()}
            </span>
          </div>
          <div className="flex space-x-6">
            {/* Network Status */}
            <div className="flex items-center">
              <WifiIcon
                className={`h-5 w-5 mr-2 ${systemStatus.network.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}
              />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Network</span>
                <span className="text-sm">{systemStatus.network.latency}</span>
              </div>
            </div>
            {/* Server Status */}
            <div className="flex items-center">
              <ServerIcon
                className={`h-5 w-5 mr-2 ${systemStatus.server.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}
              />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Server</span>
                <span className="text-sm">{systemStatus.server.load}</span>
              </div>
            </div>
            {/* Storage Status */}
            <div className="flex items-center">
              <BatteryFullIcon
                className={`h-5 w-5 mr-2 ${systemStatus.storage.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}
              />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Storage</span>
                <span className="text-sm">{systemStatus.storage.used}</span>
              </div>
            </div>
            {/* Camera Status */}
            <div className="flex items-center">
              <AlertTriangle
                className={`h-5 w-5 mr-2 ${systemStatus.cameras.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}
              />
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Cameras</span>
                <span className="text-sm">{systemStatus.cameras.online}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex-grow flex">
        <main className="flex-grow p-4">
          {/* Key Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Quality Score */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Quality Score</div>
                  <div className="text-2xl font-bold">{mockData.dashboardMetrics.qualityScore}%</div>
                </div>
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                <span className="text-green-400">+2.1%</span> from yesterday
              </div>
            </div>

            {/* Total Defects */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Defects Today</div>
                  <div className="text-2xl font-bold">{mockData.dashboardMetrics.totalDefectsToday}</div>
                </div>
                <div className="p-2 rounded-lg bg-red-500/20">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-green-400" />
                <span className="text-green-400">-15%</span> from yesterday
              </div>
            </div>

            {/* Throughput */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Throughput</div>
                  <div className="text-2xl font-bold">{mockData.dashboardMetrics.productionMetrics.throughput}</div>
                  <div className="text-xs text-gray-400">items/hr</div>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                <span className="text-green-400">+8%</span> from yesterday
              </div>
            </div>

            {/* System Uptime */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-400 mb-1">System Uptime</div>
                  <div className="text-2xl font-bold">{mockData.dashboardMetrics.systemUptime}%</div>
                </div>
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Clock className="h-5 w-5 text-green-400" />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                14 days, 6 hours uptime
              </div>
            </div>
          </div>

          {/* Camera Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cameras.map((camera) => (
              <div key={camera.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                <div className="relative aspect-video">
                  {/* Camera Feed */}
                  <img
                    src={camera.imageUrl}
                    alt={`Feed from ${camera.name}`}
                    className="w-full h-full object-cover"
                  />
                  {/* ROI Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {camera.roiStatus !== 'normal' && (
                      <div
                        className={`absolute border-2 rounded-md w-1/3 h-1/4 top-1/3 left-1/3 ${
                          camera.roiStatus === 'warning' ? 'border-yellow-500 bg-yellow-500/20' :
                          camera.roiStatus === 'alert' ? 'border-red-500 bg-red-500/20' :
                          'border-green-500 bg-green-500/20'
                        }`}
                      ></div>
                    )}
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute top-2 left-2 flex items-center">
                    <CircleIcon
                      className={`h-3 w-3 mr-1 ${camera.status === 'active' ? 'text-green-500' : 'text-red-500'} fill-current`}
                    />
                    <span className="text-xs font-medium bg-black/50 px-1.5 py-0.5 rounded">
                      LIVE
                    </span>
                  </div>
                  {/* ROI Status Indicator */}
                  {camera.roiStatus !== 'normal' && (
                    <div
                      className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded ${
                        camera.roiStatus === 'warning' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                      }`}
                    >
                      {camera.roiStatus.toUpperCase()}
                    </div>
                  )}
                  {/* Controls */}
                  <div className="absolute bottom-2 right-2 flex space-x-1">
                    <button className="bg-black/50 p-1 rounded hover:bg-black/70">
                      <MaximizeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-2 border-t border-gray-700">
                  <h3 className="font-medium text-sm">{camera.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Production Analytics and System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Production Status */}
            <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Production Status</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Updated 2 min ago</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {mockData.dashboardMetrics.productionMetrics.passedItems.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Items Passed</div>
                    <div className="flex items-center justify-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-xs text-green-400">+5.2%</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">
                      {mockData.dashboardMetrics.productionMetrics.failedItems.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Items Failed</div>
                    <div className="flex items-center justify-center mt-1">
                      <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-xs text-green-400">-2.1%</span>
                    </div>
                  </div>
                </div>

                {/* Quality Score Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Quality Score</span>
                    <span className="text-sm font-semibold text-green-400">
                      {mockData.dashboardMetrics.qualityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${mockData.dashboardMetrics.qualityScore}%` }}
                    />
                  </div>
                </div>

                {/* Efficiency */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Production Efficiency</span>
                    <span className="text-sm font-semibold text-blue-400">
                      {mockData.dashboardMetrics.productionMetrics.efficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${mockData.dashboardMetrics.productionMetrics.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="border-b border-gray-700 p-4">
                <h2 className="text-lg font-semibold">System Health</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {/* CPU Usage */}
                  <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Cpu className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="font-medium">CPU Usage</div>
                        <div className="text-sm text-gray-400">Processing load</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-blue-400">42%</div>
                  </div>

                  {/* Memory Usage */}
                  <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MemoryStick className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="font-medium">Memory</div>
                        <div className="text-sm text-gray-400">RAM usage</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-yellow-400">67%</div>
                  </div>

                  {/* Storage */}
                  <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <HardDrive className="w-5 h-5 text-orange-400" />
                      <div>
                        <div className="font-medium">Storage</div>
                        <div className="text-sm text-gray-400">Disk usage</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-orange-400">78%</div>
                  </div>

                  {/* Network */}
                  <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Network className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="font-medium">Network</div>
                        <div className="text-sm text-gray-400">Bandwidth</div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-green-400">24ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity and Quality Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Alerts */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="border-b border-gray-700 p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Alerts</h2>
                <button 
                  onClick={() => setAlertDrawerOpen(true)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  View all
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {mockData.alerts.slice(0, 5).map((alert) => (
                    <div 
                      key={alert.id}
                      className="flex items-start space-x-3 p-3 hover:bg-gray-750 rounded-lg cursor-pointer"
                      onClick={() => handleAlertClick(alert)}
                    >
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        alert.severity === 'critical' ? 'bg-red-600' :
                        alert.severity === 'high' ? 'bg-red-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {alert.title}
                        </p>
                        <p className="text-sm text-gray-400 truncate">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(alert.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === 'active' ? 'bg-red-500/20 text-red-400' :
                        alert.status === 'acknowledged' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {alert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Trends */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="border-b border-gray-700 p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Quality Trends</h2>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {mockData.qualityMetrics.defectsByType.map((defect) => (
                    <div key={defect.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-sm font-medium">{defect.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-300">{defect.count}</span>
                        <span className="text-xs text-gray-500">({defect.percentage}%)</span>
                        {defect.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-500" />}
                        {defect.trend === 'down' && <TrendingDown className="w-3 h-3 text-green-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Alert Drawer */}
        <AlertDrawer
          isOpen={alertDrawerOpen}
          onClose={() => setAlertDrawerOpen(false)}
          alerts={mockData.alerts}
          onAlertClick={handleAlertClick}
          onAcknowledge={handleAcknowledgeAlert}
          onDismiss={handleDismissAlert}
        />

        {/* Alert Toggle Button */}
        <button
          onClick={() => setAlertDrawerOpen(!alertDrawerOpen)}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
          aria-label="Toggle alerts"
        >
          <AlertCircleIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {mockData.alerts.filter(a => a.status === 'active').length}
          </span>
        </button>
      </div>
    </div>
  )
}
