import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import {
  CalendarIcon,
  TrendingUpIcon,
  BarChartIcon,
  FilterIcon,
  DownloadIcon,
  RefreshCwIcon,
} from 'lucide-react'

// Types
interface PerformanceData {
  epoch: number
  trainingAccuracy: number
  validationAccuracy: number
  trainingLoss: number
  validationLoss: number
}

interface MetricsData {
  metric: string
  value: number
  color: string
}

interface ModelOption {
  id: string
  name: string
  version: string
}

// Mock data
const mockModels: ModelOption[] = [
  { id: 'model-001', name: 'DefectNet', version: '2.1.0' },
  { id: 'model-002', name: 'DimensionCheck Pro', version: '1.5.2' },
  { id: 'model-003', name: 'QualityAssist AI', version: '3.0.0-beta' },
  { id: 'model-004', name: 'SurfaceInspect', version: '1.2.1' },
  { id: 'model-005', name: 'ComponentClassifier', version: '2.0.0' },
]

const mockPerformanceData: PerformanceData[] = [
  { epoch: 1, trainingAccuracy: 45.2, validationAccuracy: 42.8, trainingLoss: 1.85, validationLoss: 1.92 },
  { epoch: 5, trainingAccuracy: 62.1, validationAccuracy: 58.9, trainingLoss: 1.42, validationLoss: 1.51 },
  { epoch: 10, trainingAccuracy: 74.8, validationAccuracy: 71.2, trainingLoss: 1.15, validationLoss: 1.28 },
  { epoch: 15, trainingAccuracy: 82.3, validationAccuracy: 78.9, trainingLoss: 0.89, validationLoss: 1.02 },
  { epoch: 20, trainingAccuracy: 87.6, validationAccuracy: 84.1, trainingLoss: 0.68, validationLoss: 0.82 },
  { epoch: 25, trainingAccuracy: 91.2, validationAccuracy: 87.8, trainingLoss: 0.52, validationLoss: 0.68 },
  { epoch: 30, trainingAccuracy: 93.8, validationAccuracy: 90.2, trainingLoss: 0.41, validationLoss: 0.58 },
  { epoch: 35, trainingAccuracy: 95.4, validationAccuracy: 91.9, trainingLoss: 0.33, validationLoss: 0.51 },
  { epoch: 40, trainingAccuracy: 96.7, validationAccuracy: 93.1, trainingLoss: 0.27, validationLoss: 0.46 },
  { epoch: 45, trainingAccuracy: 97.5, validationAccuracy: 94.2, trainingLoss: 0.22, validationLoss: 0.42 },
  { epoch: 50, trainingAccuracy: 98.1, validationAccuracy: 94.8, trainingLoss: 0.19, validationLoss: 0.39 },
]

const mockMetricsData: MetricsData[] = [
  { metric: 'F1 Score', value: 94.2, color: '#3b82f6' },
  { metric: 'Precision', value: 96.1, color: '#10b981' },
  { metric: 'Recall', value: 92.4, color: '#f59e0b' },
]

const ModelPerformancePage = () => {
  const [selectedModel, setSelectedModel] = useState('model-001')
  const [selectedVersion, setSelectedVersion] = useState('2.1.0')
  const [dateRange, setDateRange] = useState('last-30-days')

  const selectedModelData = mockModels.find(m => m.id === selectedModel)
  const availableVersions = mockModels
    .filter(m => m.name === selectedModelData?.name)
    .map(m => m.version)

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-90-days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Performance</h1>
          <p className="text-gray-400 mt-1">
            Monitor and analyze model performance metrics over time
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium text-white flex items-center">
            <DownloadIcon size={16} className="mr-2" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white flex items-center">
            <RefreshCwIcon size={16} className="mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="flex items-center mb-4">
          <FilterIcon size={20} className="text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-white">Filters</h3>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {mockModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          {/* Version Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Version
            </label>
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableVersions.map((version) => (
                <option key={version} value={version}>
                  v{version}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-900/20 rounded-lg">
              <TrendingUpIcon size={20} className="text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Current Accuracy</p>
              <p className="text-2xl font-semibold text-white">94.8%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-900/20 rounded-lg">
              <BarChartIcon size={20} className="text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">F1 Score</p>
              <p className="text-2xl font-semibold text-white">94.2%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-900/20 rounded-lg">
              <TrendingUpIcon size={20} className="text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Precision</p>
              <p className="text-2xl font-semibold text-white">96.1%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-900/20 rounded-lg">
              <BarChartIcon size={20} className="text-orange-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Recall</p>
              <p className="text-2xl font-semibold text-white">92.4%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training vs Validation Accuracy */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">
              Training vs Validation Accuracy
            </h3>
            <CalendarIcon size={16} className="text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="epoch" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="trainingAccuracy"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Training Accuracy"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="validationAccuracy"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Validation Accuracy"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Training vs Validation Loss */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">
              Training vs Validation Loss
            </h3>
            <TrendingUpIcon size={16} className="text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="epoch" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  domain={[0, 2]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="trainingLoss"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Training Loss"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="validationLoss"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Validation Loss"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Metrics Bar Chart */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">
            Current Performance Metrics
          </h3>
          <BarChartIcon size={16} className="text-gray-400" />
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockMetricsData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="metric" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value: number) => [`${value}%`, 'Value']}
              />
              <Bar 
                dataKey="value" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <h4 className="text-lg font-medium text-white mb-3">Model Info</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Architecture:</span>
              <span className="text-white">EfficientDet-D2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Parameters:</span>
              <span className="text-white">8.1M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Training Time:</span>
              <span className="text-white">4h 32m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Dataset Size:</span>
              <span className="text-white">15,420 images</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <h4 className="text-lg font-medium text-white mb-3">Performance Trends</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-400">Accuracy improving</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-400">Loss decreasing</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-400">Overfitting detected</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <h4 className="text-lg font-medium text-white mb-3">Recommendations</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Consider early stopping at epoch 45</p>
            <p>• Add more regularization</p>
            <p>• Increase validation dataset size</p>
            <p>• Fine-tune learning rate schedule</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelPerformancePage