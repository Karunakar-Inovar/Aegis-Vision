import React, { useState } from 'react'
import MainLayout from './MainLayout'
import {
  BarChartIcon,
  LineChartIcon,
  PieChartIcon,
  DownloadIcon,
  RefreshCwIcon,
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CameraIcon,
  UsersIcon,
} from 'lucide-react'

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const analyticsTabs = [
    {
      id: 'overview',
      label: 'Overview',
    },
    {
      id: 'defects',
      label: 'Defect Analysis',
    },
    {
      id: 'performance',
      label: 'System Performance',
    },
    {
      id: 'reports',
      label: 'Reports',
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  // Time period selection
  const [timePeriod, setTimePeriod] = useState('30d')

  return (
    <MainLayout
      activeModule="analytics"
      tabs={analyticsTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <div className="flex space-x-2">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="custom">Custom range</option>
            </select>
            <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">
              <RefreshCwIcon size={16} />
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center">
              <DownloadIcon size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overview Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Total Inspections
                    </div>
                    <div className="text-2xl font-bold">12,547</div>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <CameraIcon size={20} className="text-blue-400" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-center">
                  <TrendingUpIcon size={12} className="mr-1 text-green-400" />
                  <span className="text-green-400">+8.2%</span> from previous
                  period
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Defect Rate
                    </div>
                    <div className="text-2xl font-bold">4.3%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <AlertTriangleIcon size={20} className="text-yellow-400" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-center">
                  <TrendingDownIcon size={12} className="mr-1 text-green-400" />
                  <span className="text-green-400">-1.2%</span> from previous
                  period
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Detection Accuracy
                    </div>
                    <div className="text-2xl font-bold">96.8%</div>
                  </div>
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <CheckCircleIcon size={20} className="text-green-400" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-center">
                  <TrendingUpIcon size={12} className="mr-1 text-green-400" />
                  <span className="text-green-400">+2.4%</span> from previous
                  period
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Active Users
                    </div>
                    <div className="text-2xl font-bold">24</div>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <UsersIcon size={20} className="text-blue-400" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-center">
                  <TrendingUpIcon size={12} className="mr-1 text-green-400" />
                  <span className="text-green-400">+3</span> from previous
                  period
                </div>
              </div>
            </div>

            {/* Main Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-700 p-4 flex justify-between items-center">
                  <h3 className="font-medium">
                    Inspection Volume & Defect Rate
                  </h3>
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-blue-600 text-xs rounded">
                      Daily
                    </button>
                    <button className="px-2 py-1 bg-gray-700 text-xs rounded">
                      Weekly
                    </button>
                    <button className="px-2 py-1 bg-gray-700 text-xs rounded">
                      Monthly
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <LineChartIcon size={64} className="text-gray-600" />
                    <span className="ml-4 text-gray-500">
                      Inspection volume and defect rate chart would appear here
                    </span>
                  </div>
                  <div className="flex justify-center space-x-8 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-400">Inspections</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-400">Defect Rate</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-700 p-4">
                  <h3 className="font-medium">Defect Types Distribution</h3>
                </div>
                <div className="p-4">
                  <div className="h-64 flex items-center justify-center">
                    <PieChartIcon size={64} className="text-gray-600" />
                    <span className="ml-4 text-gray-500">
                      Defect types pie chart would appear here
                    </span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm">Scratches</span>
                      </div>
                      <span className="text-sm">34%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm">Dents</span>
                      </div>
                      <span className="text-sm">27%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm">Discoloration</span>
                      </div>
                      <span className="text-sm">21%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Missing Parts</span>
                      </div>
                      <span className="text-sm">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-sm">Other</span>
                      </div>
                      <span className="text-sm">6%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-700 p-4">
                  <h3 className="font-medium">Camera Performance</h3>
                </div>
                <div className="p-4">
                  <div className="h-56 flex items-center justify-center">
                    <BarChartIcon size={64} className="text-gray-600" />
                    <span className="ml-4 text-gray-500">
                      Camera performance chart would appear here
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-700 p-4 flex justify-between items-center">
                  <h3 className="font-medium">System Health Metrics</h3>
                  <div className="text-sm text-gray-400 flex items-center">
                    <CalendarIcon size={14} className="mr-1" />
                    <span>Updated 5 mins ago</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">CPU Usage</span>
                        <span className="text-sm">42%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: '42%',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Memory Usage</span>
                        <span className="text-sm">61%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: '61%',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Storage</span>
                        <span className="text-sm">78%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: '78%',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Network</span>
                        <span className="text-sm">35%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: '35%',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">GPU Usage</span>
                        <span className="text-sm">87%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{
                            width: '87%',
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'defects' && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center h-64">
            <span className="text-gray-500">
              Detailed defect analysis would appear here
            </span>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center h-64">
            <span className="text-gray-500">
              System performance analytics would appear here
            </span>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center h-64">
            <span className="text-gray-500">
              Reports management would appear here
            </span>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default AnalyticsPage
