import { useState } from 'react'
import MainLayout from './MainLayout'
import InspectionQueuePage from './InspectionQueuePage'
import InspectionHistoryPage from './InspectionHistoryPage'
import InspectionSettingsPage from './InspectionSettingsPage'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  PencilIcon,
  DownloadIcon,
  ZoomInIcon,
  ZoomOutIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ImageIcon,
  TagIcon,
} from 'lucide-react'

const InspectionPage = () => {
  const { loading, isAuthenticated } = useAuthRedirect()
  const [activeTab, setActiveTab] = useState('current')
  const [confidenceThreshold, setConfidenceThreshold] = useState(85)

  const inspectionTabs = [
    {
      id: 'current',
      label: 'Current Inspection',
    },
    {
      id: 'queue',
      label: 'Queue',
    },
    {
      id: 'history',
      label: 'History',
    },
    {
      id: 'settings',
      label: 'Settings',
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  // Mock defects found in the current inspection
  const defects = [
    {
      id: 1,
      type: 'Scratch',
      confidence: 96,
      location: {
        x: 120,
        y: 80,
      },
      verified: true,
    },
    {
      id: 2,
      type: 'Dent',
      confidence: 88,
      location: {
        x: 340,
        y: 210,
      },
      verified: false,
    },
    {
      id: 3,
      type: 'Discoloration',
      confidence: 72,
      location: {
        x: 450,
        y: 320,
      },
      verified: false,
    },
  ]

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white text-lg">Loading inspection...</p>
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
      activeModule="inspection"
      tabs={inspectionTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'current' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Image Inspection Area */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 p-3 flex justify-between items-center">
              <h3 className="font-medium">Product ID: PRD-29845</h3>
              <div className="flex space-x-2">
                <button className="p-2 rounded bg-gray-700 hover:bg-gray-600">
                  <ZoomInIcon size={16} />
                </button>
                <button className="p-2 rounded bg-gray-700 hover:bg-gray-600">
                  <ZoomOutIcon size={16} />
                </button>
                <button className="p-2 rounded bg-gray-700 hover:bg-gray-600">
                  <RotateCcwIcon size={16} />
                </button>
                <button className="p-2 rounded bg-gray-700 hover:bg-gray-600">
                  <RotateCwIcon size={16} />
                </button>
              </div>
            </div>
            <div className="relative">
              {/* Product Image with Annotations */}
              <div className="aspect-video bg-gray-900 relative">
                <img
                  src="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Product being inspected"
                  className="w-full h-full object-contain"
                />
                {/* Annotation Markers */}
                {defects.map((defect) => (
                  <div
                    key={defect.id}
                    className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full ${defect.verified ? 'bg-red-500/20 border-2 border-red-500' : defect.confidence >= confidenceThreshold ? 'bg-yellow-500/20 border-2 border-yellow-500' : 'bg-blue-500/20 border-2 border-blue-500'}`}
                    style={{
                      left: `${defect.location.x}px`,
                      top: `${defect.location.y}px`,
                    }}
                  >
                    <span className="text-xs font-bold">{defect.id}</span>
                  </div>
                ))}
              </div>
              {/* Image Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/80 rounded-full px-4 py-2 flex space-x-4">
                <button className="text-gray-300 hover:text-white">
                  <PencilIcon size={16} />
                </button>
                <button className="text-gray-300 hover:text-white">
                  <TagIcon size={16} />
                </button>
                <button className="text-gray-300 hover:text-white">
                  <ImageIcon size={16} />
                </button>
                <button className="text-gray-300 hover:text-white">
                  <DownloadIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Inspection Details Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="border-b border-gray-700 p-3">
              <h3 className="font-medium">Inspection Details</h3>
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
              {/* AI Confidence Threshold */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">
                    AI Confidence Threshold
                  </span>
                  <span className="text-sm font-medium">
                    {confidenceThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={confidenceThreshold}
                  onChange={(e) =>
                    setConfidenceThreshold(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Defects List */}
              <h4 className="text-sm font-medium mb-3">Detected Issues</h4>
              <div className="space-y-3 mb-6">
                {defects.map((defect) => (
                  <div
                    key={defect.id}
                    className={`p-3 rounded-lg ${defect.verified ? 'bg-red-500/10 border border-red-500/30' : defect.confidence >= confidenceThreshold ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-blue-500/10 border border-blue-500/30'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        {defect.verified ? (
                          <XCircleIcon
                            size={16}
                            className="text-red-500 mr-2"
                          />
                        ) : defect.confidence >= confidenceThreshold ? (
                          <AlertTriangleIcon
                            size={16}
                            className="text-yellow-500 mr-2"
                          />
                        ) : (
                          <CheckCircleIcon
                            size={16}
                            className="text-blue-500 mr-2"
                          />
                        )}
                        <span className="font-medium">{defect.type}</span>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${defect.confidence >= 90 ? 'bg-green-500/20 text-green-400' : defect.confidence >= 75 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}
                      >
                        {defect.confidence}%
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex space-x-1">
                        <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs">
                          Confirm
                        </button>
                        <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs">
                          Reject
                        </button>
                      </div>
                      <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="bg-gray-750 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">
                  Product Information
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-400">Product Type:</div>
                  <div>Aluminum Panel</div>
                  <div className="text-gray-400">Batch Number:</div>
                  <div>BT-2023-0562</div>
                  <div className="text-gray-400">Inspection Date:</div>
                  <div>{new Date().toLocaleDateString()}</div>
                  <div className="text-gray-400">Operator:</div>
                  <div>Alex Morgan</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 p-3 flex space-x-3">
              <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium">
                Approve
              </button>
              <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'queue' && <InspectionQueuePage />}

      {activeTab === 'history' && <InspectionHistoryPage />}

      {activeTab === 'settings' && <InspectionSettingsPage />}
    </MainLayout>
  )
}

export default InspectionPage
