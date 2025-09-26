import { useState } from 'react'
import {
  PlayIcon,
  PauseIcon,
  PlusIcon,
  RefreshCwIcon,
  XIcon,
  BrainCircuitIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  DatabaseIcon,
  SettingsIcon,
} from 'lucide-react'

// Training Job Types
interface TrainingJob {
  id: string
  datasetId: string
  datasetName: string
  modelArchitecture: string
  status: 'pending' | 'training' | 'completed' | 'failed' | 'paused'
  startedAt: Date
  progress: number // 0-100
  learningRate: number
  epochs: number
  currentEpoch?: number
  estimatedTimeRemaining?: string
  accuracy?: number
  loss?: number
}

interface Dataset {
  id: string
  name: string
  imageCount: number
  size: string
}

// Mock data
const mockTrainingJobs: TrainingJob[] = [
  {
    id: 'job-001',
    datasetId: 'ds-001',
    datasetName: 'Aluminum Panel Inspection - Q2 2023',
    modelArchitecture: 'EfficientDet-D2',
    status: 'training',
    startedAt: new Date('2024-01-15T08:30:00Z'),
    progress: 68,
    learningRate: 0.001,
    epochs: 100,
    currentEpoch: 68,
    estimatedTimeRemaining: '2h 15m',
    accuracy: 94.2,
    loss: 0.032,
  },
  {
    id: 'job-002',
    datasetId: 'ds-002',
    datasetName: 'Steel Component Analysis',
    modelArchitecture: 'YOLOv8-Medium',
    status: 'completed',
    startedAt: new Date('2024-01-14T14:20:00Z'),
    progress: 100,
    learningRate: 0.0005,
    epochs: 75,
    currentEpoch: 75,
    accuracy: 96.8,
    loss: 0.018,
  },
  {
    id: 'job-003',
    datasetId: 'ds-003',
    datasetName: 'Circuit Board Inspection',
    modelArchitecture: 'ResNet-50',
    status: 'failed',
    startedAt: new Date('2024-01-14T10:15:00Z'),
    progress: 23,
    learningRate: 0.01,
    epochs: 50,
    currentEpoch: 12,
  },
  {
    id: 'job-004',
    datasetId: 'ds-004',
    datasetName: 'Automotive Parts - Prototype Series',
    modelArchitecture: 'EfficientNet-B3',
    status: 'pending',
    startedAt: new Date('2024-01-15T16:45:00Z'),
    progress: 0,
    learningRate: 0.002,
    epochs: 120,
  },
  {
    id: 'job-005',
    datasetId: 'ds-005',
    datasetName: 'Precision Machined Components',
    modelArchitecture: 'Faster R-CNN',
    status: 'paused',
    startedAt: new Date('2024-01-13T11:30:00Z'),
    progress: 45,
    learningRate: 0.0008,
    epochs: 80,
    currentEpoch: 36,
    accuracy: 89.5,
    loss: 0.045,
  },
]

const mockDatasets: Dataset[] = [
  { id: 'ds-001', name: 'Aluminum Panel Inspection - Q2 2023', imageCount: 1245, size: '4.2 GB' },
  { id: 'ds-002', name: 'Steel Component Analysis', imageCount: 784, size: '2.8 GB' },
  { id: 'ds-003', name: 'Circuit Board Inspection', imageCount: 423, size: '1.5 GB' },
  { id: 'ds-004', name: 'Automotive Parts - Prototype Series', imageCount: 912, size: '3.4 GB' },
  { id: 'ds-005', name: 'Precision Machined Components', imageCount: 2145, size: '7.8 GB' },
  { id: 'ds-006', name: 'Electronic Components QC', imageCount: 1567, size: '5.1 GB' },
]

const modelArchitectures = [
  'EfficientDet-D2',
  'YOLOv8-Medium',
  'YOLOv8-Large',
  'ResNet-50',
  'ResNet-101',
  'EfficientNet-B3',
  'EfficientNet-B5',
  'Faster R-CNN',
  'SSD MobileNet',
  'RetinaNet',
]

const ModelTrainingJobsPage = () => {
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>(mockTrainingJobs)
  const [showStartTrainingModal, setShowStartTrainingModal] = useState(false)
  
  // Form state for new training job
  const [selectedDataset, setSelectedDataset] = useState('')
  const [selectedArchitecture, setSelectedArchitecture] = useState('')
  const [learningRate, setLearningRate] = useState('0.001')
  const [epochs, setEpochs] = useState('100')

  const getStatusBadge = (status: TrainingJob['status']) => {
    switch (status) {
      case 'training':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
            Training
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon size={12} className="mr-1" />
            Completed
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircleIcon size={12} className="mr-1" />
            Failed
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon size={12} className="mr-1" />
            Pending
          </span>
        )
      case 'paused':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <PauseIcon size={12} className="mr-1" />
            Paused
          </span>
        )
      default:
        return null
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const handleStartTraining = () => {
    if (!selectedDataset || !selectedArchitecture || !learningRate || !epochs) {
      return
    }

    const dataset = mockDatasets.find(d => d.id === selectedDataset)
    if (!dataset) return

    const newJob: TrainingJob = {
      id: `job-${Date.now()}`,
      datasetId: selectedDataset,
      datasetName: dataset.name,
      modelArchitecture: selectedArchitecture,
      status: 'pending',
      startedAt: new Date(),
      progress: 0,
      learningRate: parseFloat(learningRate),
      epochs: parseInt(epochs),
    }

    setTrainingJobs([newJob, ...trainingJobs])
    setShowStartTrainingModal(false)
    
    // Reset form
    setSelectedDataset('')
    setSelectedArchitecture('')
    setLearningRate('0.001')
    setEpochs('100')

    // Simulate training start after a short delay
    setTimeout(() => {
      setTrainingJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: 'training' as const, currentEpoch: 1 }
          : job
      ))
    }, 2000)
  }

  return (
    <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Model Training Jobs</h1>
              <p className="text-gray-400 mt-1">Manage and monitor your AI model training processes</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowStartTrainingModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white flex items-center transition-colors"
              >
                <PlusIcon size={16} className="mr-2" />
                Start Training
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium text-white flex items-center transition-colors">
                <RefreshCwIcon size={16} className="mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BrainCircuitIcon size={20} className="text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-400">Active Jobs</p>
                  <p className="text-xl font-semibold text-white">
                    {trainingJobs.filter(job => job.status === 'training').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircleIcon size={20} className="text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-xl font-semibold text-white">
                    {trainingJobs.filter(job => job.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <ClockIcon size={20} className="text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-xl font-semibold text-white">
                    {trainingJobs.filter(job => job.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertCircleIcon size={20} className="text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-400">Failed</p>
                  <p className="text-xl font-semibold text-white">
                    {trainingJobs.filter(job => job.status === 'failed').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Training Jobs Table */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 p-4">
              <h3 className="text-lg font-medium text-white">Training Jobs</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Job ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Dataset
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Architecture
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Started At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {trainingJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{job.id}</div>
                        {job.currentEpoch && (
                          <div className="text-xs text-gray-400">
                            Epoch {job.currentEpoch}/{job.epochs}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <DatabaseIcon size={16} className="text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm text-white">{job.datasetName}</div>
                            <div className="text-xs text-gray-400">ID: {job.datasetId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{job.modelArchitecture}</div>
                        <div className="text-xs text-gray-400">
                          LR: {job.learningRate} • {job.epochs} epochs
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(job.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{formatDate(job.startedAt)}</div>
                        {job.estimatedTimeRemaining && (
                          <div className="text-xs text-gray-400">
                            ~{job.estimatedTimeRemaining} remaining
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-700 rounded-full h-2 mr-3">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                job.status === 'completed' 
                                  ? 'bg-green-500' 
                                  : job.status === 'failed'
                                  ? 'bg-red-500'
                                  : job.status === 'training'
                                  ? 'bg-blue-500'
                                  : 'bg-gray-500'
                              }`}
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-white w-12">{job.progress}%</span>
                        </div>
                        {job.accuracy && (
                          <div className="text-xs text-gray-400 mt-1">
                            Accuracy: {job.accuracy}%
                            {job.loss && ` • Loss: ${job.loss}`}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {job.status === 'training' && (
                            <button className="text-orange-400 hover:text-orange-300">
                              <PauseIcon size={16} />
                            </button>
                          )}
                          {(job.status === 'paused' || job.status === 'failed') && (
                            <button className="text-green-400 hover:text-green-300">
                              <PlayIcon size={16} />
                            </button>
                          )}
                          <button className="text-gray-400 hover:text-white">
                            <SettingsIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      {/* Start Training Modal */}
      {showStartTrainingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={() => setShowStartTrainingModal(false)}></div>

            <div className="inline-block align-bottom bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Start New Training Job</h3>
                <button
                  onClick={() => setShowStartTrainingModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XIcon size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Dataset Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Dataset
                  </label>
                  <select
                    value={selectedDataset}
                    onChange={(e) => setSelectedDataset(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a dataset...</option>
                    {mockDatasets.map((dataset) => (
                      <option key={dataset.id} value={dataset.id}>
                        {dataset.name} ({dataset.imageCount} images, {dataset.size})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model Architecture */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Model Architecture
                  </label>
                  <select
                    value={selectedArchitecture}
                    onChange={(e) => setSelectedArchitecture(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose an architecture...</option>
                    {modelArchitectures.map((arch) => (
                      <option key={arch} value={arch}>
                        {arch}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Learning Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Learning Rate
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    min="0.0001"
                    max="1"
                    value={learningRate}
                    onChange={(e) => setLearningRate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.001"
                  />
                </div>

                {/* Epochs */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Epochs
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={epochs}
                    onChange={(e) => setEpochs(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowStartTrainingModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartTraining}
                  disabled={!selectedDataset || !selectedArchitecture || !learningRate || !epochs}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md text-sm font-medium text-white transition-colors"
                >
                  Start Training
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModelTrainingJobsPage
