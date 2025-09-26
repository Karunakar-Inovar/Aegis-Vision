import React, { useState } from 'react'
import MainLayout from './MainLayout'
import {
  AlertOctagonIcon,
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  ClockIcon,
  CameraIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpRightIcon,
  EyeIcon,
  DownloadIcon,
  TrashIcon,
} from 'lucide-react'

const IncidentsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const incidentsTabs = [
    {
      id: 'all',
      label: 'All Incidents',
    },
    {
      id: 'unresolved',
      label: 'Unresolved',
    },
    {
      id: 'resolved',
      label: 'Resolved',
    },
    {
      id: 'reports',
      label: 'Reports',
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  // Mock incidents data
  const incidents = [
    {
      id: 'INC-1023',
      title: 'Unauthorized access to restricted area',
      timestamp: '2023-06-15T14:32:45',
      camera: 'Assembly Line East',
      severity: 'high',
      status: 'unresolved',
      assignee: 'Alex Morgan',
    },
    {
      id: 'INC-1022',
      title: 'Quality control failure - Missing component',
      timestamp: '2023-06-15T11:17:22',
      camera: 'QC Station 3',
      severity: 'medium',
      status: 'unresolved',
      assignee: null,
    },
    {
      id: 'INC-1021',
      title: 'Motion detected after hours',
      timestamp: '2023-06-14T22:45:11',
      camera: 'Warehouse South',
      severity: 'medium',
      status: 'resolved',
      assignee: 'Jamie Wilson',
      resolution: 'False alarm - scheduled maintenance',
    },
    {
      id: 'INC-1020',
      title: 'Product defect identified',
      timestamp: '2023-06-14T15:23:56',
      camera: 'QC Station 1',
      severity: 'low',
      status: 'resolved',
      assignee: 'Taylor Reed',
      resolution: 'Defective product removed from line',
    },
    {
      id: 'INC-1019',
      title: 'Safety protocol violation',
      timestamp: '2023-06-14T10:12:33',
      camera: 'Assembly Line West',
      severity: 'high',
      status: 'resolved',
      assignee: 'Alex Morgan',
      resolution: 'Employee retrained on safety protocols',
    },
  ]

  // Filter incidents based on active tab
  const filteredIncidents = incidents.filter((incident) => {
    if (activeTab === 'all') return true
    if (activeTab === 'unresolved') return incident.status === 'unresolved'
    if (activeTab === 'resolved') return incident.status === 'resolved'
    return true
  })

  return (
    <MainLayout
      activeModule="incidents"
      tabs={incidentsTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Incident Management</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <SearchIcon
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search incidents..."
                className="pl-9 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm w-64"
              />
            </div>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm flex items-center">
              <FilterIcon size={16} className="mr-2" />
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">
              Create Report
            </button>
          </div>
        </div>

        {/* Incident Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-400 mb-1">
                  Total Incidents
                </div>
                <div className="text-2xl font-bold">127</div>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <AlertOctagonIcon size={20} className="text-blue-400" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400 flex items-center">
              <ArrowUpRightIcon size={12} className="mr-1 text-red-400" />
              <span className="text-red-400">+12%</span> from last month
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-400 mb-1">Unresolved</div>
                <div className="text-2xl font-bold">23</div>
              </div>
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <XCircleIcon size={20} className="text-yellow-400" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400 flex items-center">
              <ArrowUpRightIcon size={12} className="mr-1 text-red-400" />
              <span className="text-red-400">+5%</span> from last month
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-400 mb-1">Resolved</div>
                <div className="text-2xl font-bold">104</div>
              </div>
              <div className="p-2 rounded-lg bg-green-500/20">
                <CheckCircleIcon size={20} className="text-green-400" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400 flex items-center">
              <ArrowUpRightIcon size={12} className="mr-1 text-green-400" />
              <span className="text-green-400">+18%</span> from last month
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-400 mb-1">
                  Avg. Resolution Time
                </div>
                <div className="text-2xl font-bold">3.2h</div>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <ClockIcon size={20} className="text-blue-400" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400 flex items-center">
              <ArrowUpRightIcon size={12} className="mr-1 text-green-400" />
              <span className="text-green-400">-15%</span> from last month
            </div>
          </div>
        </div>

        {/* Incidents Table */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-700 px-4 py-3 flex items-center justify-between">
            <h3 className="font-medium">Incident List</h3>
            <div className="flex items-center text-sm text-gray-400">
              <CalendarIcon size={14} className="mr-1" />
              <span>Last 30 days</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-750">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Incident
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Camera
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-750">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {incident.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {incident.title}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                      {new Date(incident.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <CameraIcon size={14} className="mr-1 text-gray-400" />
                        <span>{incident.camera}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          incident.severity === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : incident.severity === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {incident.severity.charAt(0).toUpperCase() +
                          incident.severity.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          incident.status === 'resolved'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {incident.status.charAt(0).toUpperCase() +
                          incident.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {incident.assignee ? (
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                            <UserIcon size={12} />
                          </div>
                          <span>{incident.assignee}</span>
                        </div>
                      ) : (
                        <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs">
                          Assign
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1 text-gray-400 hover:text-white">
                          <EyeIcon size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white">
                          <DownloadIcon size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white">
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-700 px-4 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing{' '}
              <span className="font-medium">{filteredIncidents.length}</span> of{' '}
              <span className="font-medium">{incidents.length}</span> incidents
            </div>
            <div className="flex space-x-1">
              <button
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default IncidentsPage
