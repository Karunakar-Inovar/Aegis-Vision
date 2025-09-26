import { useState } from 'react'
import {
  GitBranchIcon,
  EyeIcon,
  DownloadIcon,
  TrashIcon,
  StarIcon,
  CalendarIcon,
  TrendingUpIcon,
  PlayIcon,
  GitCompareIcon,
  FilterIcon,
} from 'lucide-react'

// Types
interface ModelVersion {
  id: string
  versionNumber: string
  createdAt: string
  accuracy: number
  status: 'active' | 'deprecated' | 'stale' | 'archived'
  modelType: string
  deploymentCount: number
  size: string
  description?: string
  isStarred: boolean
  trainingDuration: string
  datasetSize: string
}

// Mock data
const mockModelVersions: ModelVersion[] = [
  {
    id: 'v-001',
      versionNumber: 'v2.1.3',
      createdAt: '2024-01-15T10:30:00Z',
    accuracy: 94.2,
      status: 'active',
      modelType: 'CNN-ResNet50',
      deploymentCount: 5,
    size: '125.4 MB',
    description: 'Latest production model with improved defect detection',
    isStarred: true,
    trainingDuration: '4h 32m',
    datasetSize: '15,420 images',
  },
  {
    id: 'v-002',
      versionNumber: 'v2.1.2',
      createdAt: '2024-01-10T14:20:00Z',
    accuracy: 91.8,
    status: 'deprecated',
      modelType: 'CNN-ResNet50',
      deploymentCount: 2,
    size: '124.8 MB',
    description: 'Previous stable version',
    isStarred: false,
    trainingDuration: '4h 18m',
    datasetSize: '14,200 images',
  },
  {
    id: 'v-003',
      versionNumber: 'v2.1.1',
    createdAt: '2024-01-08T09:15:00Z',
    accuracy: 89.6,
      status: 'stale',
      modelType: 'CNN-ResNet50',
      deploymentCount: 1,
    size: '123.2 MB',
    description: 'Experimental build with new augmentation techniques',
    isStarred: false,
    trainingDuration: '3h 45m',
    datasetSize: '12,800 images',
  },
  {
    id: 'v-004',
    versionNumber: 'v2.0.5',
    createdAt: '2024-01-05T16:45:00Z',
    accuracy: 87.3,
    status: 'archived',
    modelType: 'CNN-ResNet34',
      deploymentCount: 0,
    size: '89.6 MB',
    description: 'Legacy version for compatibility testing',
    isStarred: false,
    trainingDuration: '2h 56m',
    datasetSize: '10,500 images',
  },
  {
    id: 'v-005',
    versionNumber: 'v2.0.4',
    createdAt: '2024-01-03T11:30:00Z',
    accuracy: 85.9,
    status: 'archived',
    modelType: 'CNN-ResNet34',
      deploymentCount: 0,
    size: '88.4 MB',
    description: 'Initial production release',
    isStarred: true,
    trainingDuration: '2h 41m',
    datasetSize: '9,200 images',
  },
]

const ModelVersionsPage = () => {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'deprecated', label: 'Deprecated' },
    { value: 'stale', label: 'Stale' },
    { value: 'archived', label: 'Archived' },
  ]

  const sortOptions = [
    { value: 'createdAt', label: 'Created Date' },
    { value: 'accuracy', label: 'Accuracy' },
    { value: 'versionNumber', label: 'Version' },
    { value: 'deploymentCount', label: 'Deployments' },
  ]

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId)
      } else if (prev.length < 2) {
        return [...prev, versionId]
      } else {
        return [prev[1], versionId]
      }
    })
  }

  const getStatusBadge = (status: ModelVersion['status']) => {
    const statusConfig = {
      active: { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-500/30' },
      deprecated: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      stale: { bg: 'bg-orange-900/30', text: 'text-orange-400', border: 'border-orange-500/30' },
      archived: { bg: 'bg-gray-700/50', text: 'text-gray-400', border: 'border-gray-500/30' },
    }

    const config = statusConfig[status]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredVersions = mockModelVersions
    .filter(version => statusFilter === 'all' || version.status === statusFilter)
    .sort((a, b) => {
      let aValue = a[sortBy as keyof ModelVersion]
      let bValue = b[sortBy as keyof ModelVersion]
      
      if (sortBy === 'createdAt') {
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      
      return sortOrder === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue)
    })

  return (
      <div className="space-y-6">
      {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <GitBranchIcon className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Model Versions</h1>
                <p className="text-gray-300">Manage and compare different versions of your AI models</p>
              </div>
            </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FilterIcon size={20} className="text-gray-400 mr-2" />
            <h3 className="text-lg font-medium text-white">Filters & Actions</h3>
          </div>
          <div className="flex space-x-3">
              {selectedVersions.length === 2 && (
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium text-white flex items-center">
                <GitCompareIcon size={16} className="mr-2" />
                  Compare Selected
                </button>
              )}
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium text-white flex items-center">
              <DownloadIcon size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900/20 rounded-lg">
              <GitBranchIcon size={20} className="text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Total Versions</p>
              <p className="text-xl font-semibold text-white">{mockModelVersions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-900/20 rounded-lg">
              <PlayIcon size={20} className="text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-xl font-semibold text-white">
                {mockModelVersions.filter(v => v.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-900/20 rounded-lg">
              <TrendingUpIcon size={20} className="text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Best Accuracy</p>
              <p className="text-xl font-semibold text-white">
                {Math.max(...mockModelVersions.map(v => v.accuracy)).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-900/20 rounded-lg">
              <StarIcon size={20} className="text-orange-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Starred</p>
              <p className="text-xl font-semibold text-white">
                {mockModelVersions.filter(v => v.isStarred).length}
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* Versions Table */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700 border-b border-gray-600">
                <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-200">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVersions(filteredVersions.slice(0, 2).map(v => v.id))
                      } else {
                        setSelectedVersions([])
                      }
                    }}
                  />
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-200">Version</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-200">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Accuracy</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Deployments</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-200">Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
              {filteredVersions.map((version) => (
                <tr key={version.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                      className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-2"
                        checked={selectedVersions.includes(version.id)}
                        onChange={() => handleVersionSelect(version.id)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                      {version.isStarred && (
                        <StarIcon size={16} className="text-yellow-400 fill-current" />
                      )}
                      <div>
                        <div className="font-medium text-gray-200">{version.versionNumber}</div>
                        <div className="text-sm text-gray-400">{version.modelType}</div>
                      </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                    <div className="flex items-center text-gray-200">
                      <CalendarIcon size={16} className="text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm">{formatDate(version.createdAt)}</div>
                        <div className="text-xs text-gray-400">{version.trainingDuration}</div>
                      </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                    <div className="flex items-center">
                      <TrendingUpIcon size={16} className="text-green-400 mr-2" />
                      <span className="text-gray-200 font-medium">
                        {version.accuracy.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(version.status)}
                  </td>
                  <td className="py-4 px-4 text-gray-200">
                    <div className="flex items-center">
                      <PlayIcon size={16} className="text-blue-400 mr-2" />
                      {version.deploymentCount}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-200">
                    {version.size}
                  </td>
                    <td className="py-4 px-4">
                    <div className="flex space-x-2">
                          <button
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center transition-colors"
                        title="View Details"
                          >
                        <EyeIcon size={14} className="mr-1" />
                        View Details
                          </button>
                          <button
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="Download"
                          >
                        <DownloadIcon size={16} />
                          </button>
                        <button
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                        >
                        <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {/* Selected Versions Info */}
      {selectedVersions.length > 0 && (
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {selectedVersions.length} version{selectedVersions.length > 1 ? 's' : ''} selected
              </span>
              {selectedVersions.length === 2 && (
                <span className="text-sm text-purple-400">
                  Ready to compare
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedVersions([])}
              className="text-sm text-gray-400 hover:text-white"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
      </div>
  )
}

export default ModelVersionsPage