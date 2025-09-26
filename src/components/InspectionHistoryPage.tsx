import { useState } from 'react'
import {
  CheckCircleIcon,
  XCircleIcon,
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon,
  DownloadIcon,
  EyeIcon,
  AlertTriangleIcon,
} from 'lucide-react'

// Types
interface InspectionHistory {
  id: string
  productName: string
  result: 'passed' | 'failed' | 'warning'
  dateTime: Date
  operator: string
  duration: string
  defectsFound: number
  confidence: number
  cameraId: string
  batchId?: string
  notes?: string
}

// Mock data
const mockInspectionHistory: InspectionHistory[] = [
  {
    id: 'INS-2024-098',
    productName: 'Aluminum Panel - Series A',
    result: 'passed',
    dateTime: new Date('2024-01-15T14:30:00Z'),
    operator: 'Sarah Chen',
    duration: '4m 23s',
    defectsFound: 0,
    confidence: 98.5,
    cameraId: 'CAM-LINE-01',
    batchId: 'BATCH-2024-A-012',
  },
  {
    id: 'INS-2024-097',
    productName: 'Steel Component - Type B',
    result: 'failed',
    dateTime: new Date('2024-01-15T14:25:00Z'),
    operator: 'Mike Johnson',
    duration: '6m 12s',
    defectsFound: 3,
    confidence: 94.2,
    cameraId: 'CAM-LINE-02',
    batchId: 'BATCH-2024-B-008',
    notes: 'Surface scratches detected on edges',
  },
  {
    id: 'INS-2024-096',
    productName: 'Circuit Board - Rev 3.2',
    result: 'warning',
    dateTime: new Date('2024-01-15T14:18:00Z'),
    operator: 'Lisa Wang',
    duration: '3m 45s',
    defectsFound: 1,
    confidence: 87.3,
    cameraId: 'CAM-QC-01',
    batchId: 'BATCH-2024-C-015',
    notes: 'Minor solder joint irregularity',
  },
  {
    id: 'INS-2024-095',
    productName: 'Automotive Part - Prototype',
    result: 'passed',
    dateTime: new Date('2024-01-15T14:10:00Z'),
    operator: 'David Rodriguez',
    duration: '5m 08s',
    defectsFound: 0,
    confidence: 96.7,
    cameraId: 'CAM-LINE-03',
    batchId: 'BATCH-2024-D-003',
  },
  {
    id: 'INS-2024-094',
    productName: 'Precision Machined - Batch 7',
    result: 'failed',
    dateTime: new Date('2024-01-15T14:02:00Z'),
    operator: 'Sarah Chen',
    duration: '7m 34s',
    defectsFound: 2,
    confidence: 91.8,
    cameraId: 'CAM-QC-02',
    batchId: 'BATCH-2024-E-007',
    notes: 'Dimensional tolerance exceeded',
  },
  {
    id: 'INS-2024-093',
    productName: 'Electronic Module - V2.1',
    result: 'passed',
    dateTime: new Date('2024-01-15T13:55:00Z'),
    operator: 'Mike Johnson',
    duration: '4m 56s',
    defectsFound: 0,
    confidence: 99.1,
    cameraId: 'CAM-LINE-01',
    batchId: 'BATCH-2024-F-011',
  },
  {
    id: 'INS-2024-092',
    productName: 'Metal Housing - Standard',
    result: 'warning',
    dateTime: new Date('2024-01-15T13:48:00Z'),
    operator: 'Lisa Wang',
    duration: '3m 29s',
    defectsFound: 1,
    confidence: 88.9,
    cameraId: 'CAM-LINE-02',
    batchId: 'BATCH-2024-G-004',
    notes: 'Minor surface discoloration',
  },
]

const InspectionHistoryPage = () => {
  const [inspections, setInspections] = useState(mockInspectionHistory)
  const [searchTerm, setSearchTerm] = useState('')
  const [resultFilter, setResultFilter] = useState('all')
  const [operatorFilter, setOperatorFilter] = useState('all')
  const [dateRange, setDateRange] = useState('today')
  const [sortBy, setSortBy] = useState<'dateTime' | 'result' | 'confidence'>('dateTime')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Result badge component
  const ResultBadge = ({ result }: { result: InspectionHistory['result'] }) => {
    const resultConfig = {
      passed: { bg: 'bg-green-500/20', text: 'text-green-400', icon: CheckCircleIcon },
      failed: { bg: 'bg-red-500/20', text: 'text-red-400', icon: XCircleIcon },
      warning: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: AlertTriangleIcon },
    }
    
    const config = resultConfig[result]
    const Icon = config.icon
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon size={12} className="mr-1" />
        {result.charAt(0).toUpperCase() + result.slice(1)}
      </div>
    )
  }

  // Get unique operators for filter
  const uniqueOperators = [...new Set(inspections.map(i => i.operator))]

  // Filter and search inspections
  const filteredInspections = inspections
    .filter(inspection => {
      // Search filter
      if (searchTerm && !inspection.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !inspection.id.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      
      // Result filter
      if (resultFilter !== 'all' && inspection.result !== resultFilter) return false
      
      // Operator filter
      if (operatorFilter !== 'all' && inspection.operator !== operatorFilter) return false
      
      // Date range filter (simplified)
      if (dateRange === 'today') {
        const today = new Date()
        const inspectionDate = inspection.dateTime
        if (inspectionDate.toDateString() !== today.toDateString()) return false
      }
      
      return true
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'dateTime':
          aValue = a.dateTime.getTime()
          bValue = b.dateTime.getTime()
          break
        case 'result':
          const resultOrder = { failed: 3, warning: 2, passed: 1 }
          aValue = resultOrder[a.result]
          bValue = resultOrder[b.result]
          break
        case 'confidence':
          aValue = a.confidence
          bValue = b.confidence
          break
        default:
          return 0
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

  // Statistics
  const stats = {
    total: filteredInspections.length,
    passed: filteredInspections.filter(i => i.result === 'passed').length,
    failed: filteredInspections.filter(i => i.result === 'failed').length,
    warnings: filteredInspections.filter(i => i.result === 'warning').length,
    avgConfidence: filteredInspections.length > 0 
      ? (filteredInspections.reduce((sum, i) => sum + i.confidence, 0) / filteredInspections.length).toFixed(1)
      : '0',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inspection History</h1>
          <p className="text-gray-400 mt-1">
            {filteredInspections.length} inspections completed
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors border border-gray-600">
            <DownloadIcon size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <ClockIcon className="text-gray-400" size={24} />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Passed</p>
              <p className="text-2xl font-bold text-green-400">{stats.passed}</p>
            </div>
            <CheckCircleIcon className="text-green-400" size={24} />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Failed</p>
              <p className="text-2xl font-bold text-red-400">{stats.failed}</p>
            </div>
            <XCircleIcon className="text-red-400" size={24} />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Warnings</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.warnings}</p>
            </div>
            <AlertTriangleIcon className="text-yellow-400" size={24} />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Confidence</p>
              <p className="text-2xl font-bold text-blue-400">{stats.avgConfidence}%</p>
            </div>
            <div className="text-blue-400 text-sm font-medium">AI</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or inspection ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <FilterIcon size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">Filters:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Result:</label>
              <select
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="warning">Warning</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Operator:</label>
              <select
                value={operatorFilter}
                onChange={(e) => setOperatorFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                {uniqueOperators.map(operator => (
                  <option key={operator} value={operator}>{operator}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-400">Date:</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inspections Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div className="border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <h3 className="font-medium text-white">Inspection Results</h3>
          <div className="text-sm text-gray-400">
            <CalendarIcon size={14} className="inline mr-1" />
            {dateRange === 'today' ? 'Today' : dateRange === 'week' ? 'This Week' : dateRange === 'month' ? 'This Month' : 'All Time'}
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
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Operator
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Defects
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
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
                    <div>
                      <div className="font-medium">{inspection.productName}</div>
                      {inspection.batchId && (
                        <div className="text-xs text-gray-400">Batch: {inspection.batchId}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <ResultBadge result={inspection.result} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-300">
                    <div>
                      <div>{inspection.dateTime.toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">{inspection.dateTime.toLocaleTimeString()}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <UserIcon size={16} className="text-gray-500" />
                      {inspection.operator}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">
                    {inspection.duration}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`font-medium ${inspection.defectsFound > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {inspection.defectsFound}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`font-medium ${
                        inspection.confidence >= 95 ? 'text-green-400' : 
                        inspection.confidence >= 90 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {inspection.confidence}%
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                        <EyeIcon size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                        <DownloadIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredInspections.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No inspections found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}

export default InspectionHistoryPage
