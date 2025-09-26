import React, { useState } from 'react'
import MainLayout from './MainLayout'
import CameraGrid from './CameraGrid'
import AlertDrawer from './AlertDrawer'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { AlertCircleIcon } from 'lucide-react'

const DashboardPage = () => {
  const { loading, isAuthenticated } = useAuthRedirect()
  const [activeTab, setActiveTab] = useState('live')
  const [isAlertDrawerOpen, setIsAlertDrawerOpen] = useState(false)

  const dashboardTabs = [
    {
      id: 'live',
      label: 'Live View',
    },
    {
      id: 'overview',
      label: 'Overview',
    },
    {
      id: 'alerts',
      label: 'Alerts',
    },
    {
      id: 'statistics',
      label: 'Statistics',
    },
  ]

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      camera: 'Camera 1',
      message: 'Motion detected in restricted area',
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      severity: 'high',
    },
    {
      id: 2,
      camera: 'Camera 3',
      message: 'Person detected in safety zone',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      severity: 'medium',
    },
    {
      id: 3,
      camera: 'Camera 5',
      message: 'Object left unattended',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      severity: 'low',
    },
    {
      id: 4,
      camera: 'Camera 2',
      message: 'Unauthorized access attempt',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      severity: 'high',
    },
  ])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const toggleAlertDrawer = () => {
    setIsAlertDrawerOpen(!isAlertDrawerOpen)
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (redirect will happen in useAuthRedirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <MainLayout
      activeModule="dashboard"
      tabs={dashboardTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      <div className="relative">
        {/* Dashboard Content */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Live Camera Feed</h1>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">
                  Add Camera
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">
                  Refresh Feeds
                </button>
              </div>
            </div>
            {/* Camera Grid */}
            <CameraGrid />
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">System Overview</h1>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">
                  Export Report
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">
                  Refresh
                </button>
              </div>
            </div>
            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-gray-400 text-sm mb-2">System Health</h3>
                <div className="text-2xl font-bold">Excellent</div>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-full rounded-full"
                    style={{
                      width: '92%',
                    }}
                  ></div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-gray-400 text-sm mb-2">Network Status</h3>
                <div className="text-2xl font-bold">Stable</div>
                <div className="text-sm text-gray-400 mt-1">24ms latency</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-gray-400 text-sm mb-2">Storage</h3>
                <div className="text-2xl font-bold">78% Used</div>
                <div className="text-sm text-gray-400 mt-1">5.2TB of 8TB</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-gray-400 text-sm mb-2">Uptime</h3>
                <div className="text-2xl font-bold">99.8%</div>
                <div className="text-sm text-gray-400 mt-1">
                  14 days, 6 hours
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Alert History</h1>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">
                  Export Alerts
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">
                  Clear All
                </button>
              </div>
            </div>
            {/* Alert List */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 px-4 py-3">
                <h3 className="font-medium">Recent Alerts</h3>
              </div>
              <div className="divide-y divide-gray-700">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-4 hover:bg-gray-750">
                    <div className="flex items-start">
                      <div
                        className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}
                      ></div>
                      <div className="ml-3 flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{alert.message}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {alert.camera}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">System Statistics</h1>
              <div className="flex space-x-2">
                <select className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Custom range</option>
                </select>
              </div>
            </div>
            {/* Placeholder for statistics charts */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">
                Statistics charts would appear here
              </span>
            </div>
          </div>
        )}

        {/* Alert Drawer */}
        <AlertDrawer
          isOpen={isAlertDrawerOpen}
          onClose={() => setIsAlertDrawerOpen(false)}
          alerts={alerts}
        />

        {/* Alert Toggle Button */}
        <button
          onClick={toggleAlertDrawer}
          className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
          aria-label="Toggle alerts"
        >
          <AlertCircleIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {alerts.length}
          </span>
        </button>
      </div>
    </MainLayout>
  )
}

export default DashboardPage
