import React, { useState } from 'react'
import { PageWrapper } from '@/components/Layout/PageWrapper'
import { Plus, Camera as CameraIcon, Settings, Trash2, Eye, EyeOff, Wifi, WifiOff, X } from 'lucide-react'
import { mockCameras } from '@/mock/camerasData'
import { cn } from '@/lib/utils'
import type { Camera } from '@/types/types'

export const CameraSetup: React.FC = () => {
  const [cameras, setCameras] = useState(mockCameras)
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const getStatusIcon = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-green-600" />
      case 'offline':
        return <WifiOff className="w-4 h-4 text-gray-400" />
      case 'error':
        return <WifiOff className="w-4 h-4 text-red-600" />
      default:
        return <WifiOff className="w-4 h-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: Camera['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'offline':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  return (
    <PageWrapper title="Camera Setup">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Camera Management</h1>
            <p className="text-gray-600">Configure and monitor your camera network</p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Camera</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <CameraIcon className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{cameras.length}</div>
                <div className="text-sm text-gray-500">Total Cameras</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Wifi className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {cameras.filter(c => c.status === 'online').length}
                </div>
                <div className="text-sm text-gray-500">Online</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <WifiOff className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {cameras.filter(c => c.status === 'offline' || c.status === 'error').length}
                </div>
                <div className="text-sm text-gray-500">Offline</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {cameras.filter(c => c.isActive).length}
                </div>
                <div className="text-sm text-gray-500">Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Camera Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {cameras.map((camera) => (
            <div
              key={camera.id}
              className={cn(
                'bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer',
                selectedCamera?.id === camera.id && 'ring-2 ring-primary-500 ring-offset-2'
              )}
              onClick={() => setSelectedCamera(camera)}
            >
              {/* Camera Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <CameraIcon className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{camera.name}</h3>
                    <p className="text-sm text-gray-500">{camera.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(camera.status)}
                  <span className={cn(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
                    getStatusColor(camera.status)
                  )}>
                    {camera.status}
                  </span>
                </div>
              </div>

              {/* Camera Preview */}
              <div className="bg-gray-900 rounded-lg aspect-video mb-4 flex items-center justify-center">
                {camera.status === 'online' ? (
                  <div className="text-white text-center">
                    <CameraIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-75">Live Feed</p>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center">
                    <WifiOff className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">No Signal</p>
                  </div>
                )}
              </div>

              {/* Camera Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Resolution:</span>
                  <span className="text-gray-900">{camera.resolution.width}x{camera.resolution.height}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Frame Rate:</span>
                  <span className="text-gray-900">{camera.frameRate} FPS</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Heartbeat:</span>
                  <span className="text-gray-900">
                    {camera.lastHeartbeat ? new Date(camera.lastHeartbeat).toLocaleTimeString() : 'Never'}
                  </span>
                </div>
              </div>

              {/* Camera Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Toggle camera active state
                    }}
                    className={cn(
                      'p-2 rounded-md',
                      camera.isActive 
                        ? 'text-green-600 hover:bg-green-100' 
                        : 'text-gray-400 hover:bg-gray-100'
                    )}
                    title={camera.isActive ? 'Disable camera' : 'Enable camera'}
                  >
                    {camera.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Open camera settings
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"
                    title="Camera settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Delete camera
                    }}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                    title="Delete camera"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Test camera connection
                  }}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Test Connection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {cameras.length === 0 && (
          <div className="text-center py-12">
            <CameraIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cameras configured</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first camera to the system.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Camera</span>
            </button>
          </div>
        )}
      </div>

      {/* Camera Details Sidebar */}
      {selectedCamera && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Camera Details</h2>
              <button
                onClick={() => setSelectedCamera(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Camera info and configuration would go here */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Camera Name</label>
                <input
                  type="text"
                  value={selectedCamera.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={selectedCamera.location}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stream URL</label>
                <input
                  type="text"
                  value={selectedCamera.streamUrl || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
