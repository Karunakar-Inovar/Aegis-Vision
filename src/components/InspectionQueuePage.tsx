import { useState } from 'react'
import {
  PlayIcon,
  PauseIcon,
  ClockIcon,
  AlertTriangleIcon,
  CameraIcon,
  FilterIcon,
  RefreshCwIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
} from 'lucide-react'

// Types
interface QueuedInspection {
  id: string
  productName: string
  status: 'pending' | 'in-progress' | 'paused'
  sourceCamera: string
  eta: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  queuedAt: Date
  estimatedDuration: string
  operator?: string
}

// Mock data
const mockQueuedInspections: QueuedInspection[] = [
  {
    id: 'INS-2024-001',
    productName: 'Aluminum Panel - Series A',
    status: 'in-progress',
    sourceCamera: 'CAM-LINE-01',
    eta: '2 min',
    priority: 'critical',
    queuedAt: new Date('2024-01-15T10:30:00Z'),
    estimatedDuration: '5 min',
    operator: 'Sarah Chen',
  },
  {
    id: 'INS-2024-002',
    productName: 'Steel Component - Type B',
    status: 'pending',
    sourceCamera: 'CAM-LINE-02',
    eta: '8 min',
    priority: 'high',
    queuedAt: new Date('2024-01-15T10:32:00Z'),
    estimatedDuration: '4 min',
  },
  {
    id: 'INS-2024-003',
    productName: 'Circuit Board - Rev 3.2',
    status: 'pending',
    sourceCamera: 'CAM-QC-01',
    eta: '12 min',
    priority: 'medium',
    queuedAt: new Date('2024-01-15T10:35:00Z'),
    estimatedDuration: '6 min',
  },
  {
    id: 'INS-2024-004',
    productName: 'Automotive Part - Prototype',
    status: 'paused',
    sourceCamera: 'CAM-LINE-03',
    eta: 'Paused',
    priority: 'low',
    queuedAt: new Date('2024-01-15T10:28:00Z'),
    estimatedDuration: '8 min',
  },
  {
    id: 'INS-2024-005',
    productName: 'Precision Machined - Batch 7',
    status: 'pending',
    sourceCamera: 'CAM-QC-02',
    eta: '18 min',
    priority: 'medium',
    queuedAt: new Date('2024-01-15T10:40:00Z'),
    estimatedDuration: '7 min',
  },
]

const InspectionQueuePage = () => {
  const [inspections, setInspections] = useState(mockQueuedInspections)
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'priority' | 'eta' | 'queuedAt'>('priority')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Status badge component
  const StatusBadge = ({ status }: { status: QueuedInspection['status'] }) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: ClockIcon },
      'in-progress': { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: PlayIcon },
      paused: { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: PauseIcon },
    }
    
    const config = statusConfig[status]
    const Icon = config.icon
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon size={12} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </div>
    )
  }

  // Priority badge component
  const PriorityBadge = ({ priority }: { priority: QueuedInspection['priority'] }) => {
    const priorityConfig = {
      low: { bg: 'bg-green-500/20', text: 'text-green-400' },
      medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      high: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
      critical: { bg: 'bg-red-500/20', text: 'text-red-400' },
    }
    
    const config = priorityConfig[priority]
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {priority === 'critical' && <AlertTriangleIcon size={12} className="mr-1" />}
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </div>
    )
  }

  // Filter and sort inspections
  const filteredInspections = inspections
    .filter(inspection => {
      if (statusFilter !== 'all' && inspection.status !== statusFilter) return false
      if (priorityFilter !== 'all' && inspection.priority !== priorityFilter) return false
      return true
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        case 'eta':
          // Simple eta comparison (assuming format like "2 min", "8 min")
          aValue = parseInt(a.eta) || 999
          bValue = parseInt(b.eta) || 999
          break
        case 'queuedAt':
          aValue = a.queuedAt.getTime()
          bValue = b.queuedAt.getTime()
          break
        default:
          return 0
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const SortIcon = ({ field }: { field: typeof sortBy }) => {
    if (sortBy !== field) return null
    return sortOrder === 'asc' ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inspection Queue</h1>
          <p className="text-gray-400 mt-1">
            {filteredInspections.length} inspections queued
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <RefreshCwIcon size={16} />
            Refresh Queue
          </button>
        </div>
      </div>

      {/* Queue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-blue-400">
                {inspections.filter(i => i.status === 'in-progress').length}
              </p>
            </div>
            <PlayIcon className="text-blue-400" size={24} />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">
                {inspections.filter(i => i.status === 'pending').length}
              </p>
            </div>
            <ClockIcon className="text-yellow-400" size={24} />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Critical Priority</p>
              <p className="text-2xl font-bold text-red-400">
                {inspections.filter(i => i.priority === 'critical').length}
              </p>
            </div>
            <AlertTriangleIcon className="text-red-400" size={24} />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg ETA</p>
              <p className="text-2xl font-bold text-green-400">8 min</p>
            </div>
            <CheckCircleIcon className="text-green-400" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FilterIcon size={16} className="text-gray-400" />
            <span className="text-sm text-gray-400">Filters:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="paused">Paused</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inspections Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div className="border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <h3 className="font-medium text-white">Queue Details</h3>
          <div className="text-sm text-gray-400">
            Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Inspection ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('priority')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Priority
                    <SortIcon field="priority" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Source Camera
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('eta')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    ETA
                    <SortIcon field="eta" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('queuedAt')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    Queued At
                    <SortIcon field="queuedAt" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Operator
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredInspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-4 py-4 text-sm font-mono text-blue-400">
                    {inspection.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-white">
                    {inspection.productName}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <StatusBadge status={inspection.status} />
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <PriorityBadge priority={inspection.priority} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <CameraIcon size={16} className="text-gray-500" />
                      {inspection.sourceCamera}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-white font-medium">
                    {inspection.eta}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">
                    {inspection.estimatedDuration}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">
                    {inspection.queuedAt.toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-300">
                    {inspection.operator || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default InspectionQueuePage
