import React from 'react'
import { CircleIcon, MaximizeIcon } from 'lucide-react'

interface CameraFeedProps {
  camera: {
    id: number
    name: string
    status: string
    roiStatus: string
    imageUrl: string
  }
}

const CameraFeed: React.FC<CameraFeedProps> = ({ camera }) => {
  // Map ROI status to colors
  const roiColors = {
    normal: 'border-green-500 bg-green-500/20',
    warning: 'border-yellow-500 bg-yellow-500/20',
    alert: 'border-red-500 bg-red-500/20',
  }

  // Create ROI overlay based on camera status
  const RoiOverlay = () => {
    const color = roiColors[camera.roiStatus as keyof typeof roiColors]
    // This is a simplified ROI overlay - in a real application,
    // these would be positioned based on actual detection areas
    return (
      <div className="absolute inset-0 pointer-events-none">
        {camera.roiStatus !== 'normal' && (
          <div
            className={`absolute border-2 ${color} rounded-md w-1/3 h-1/4 top-1/3 left-1/3`}
          ></div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative aspect-video">
        {/* Camera Feed */}
        <img
          src={camera.imageUrl}
          alt={`Feed from ${camera.name}`}
          className="w-full h-full object-cover"
        />
        {/* ROI Overlay */}
        <RoiOverlay />
        {/* Status Indicator */}
        <div className="absolute top-2 left-2 flex items-center">
          <CircleIcon
            className={`h-3 w-3 mr-1 ${camera.status === 'active' ? 'text-green-500' : 'text-red-500'} fill-current`}
          />
          <span className="text-xs font-medium bg-black/50 px-1.5 py-0.5 rounded">
            LIVE
          </span>
        </div>
        {/* ROI Status Indicator */}
        {camera.roiStatus !== 'normal' && (
          <div
            className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded ${camera.roiStatus === 'warning' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'}`}
          >
            {camera.roiStatus.toUpperCase()}
          </div>
        )}
        {/* Controls */}
        <div className="absolute bottom-2 right-2 flex space-x-1">
          <button className="bg-black/50 p-1 rounded hover:bg-black/70">
            <MaximizeIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-2 border-t border-gray-700">
        <h3 className="font-medium text-sm">{camera.name}</h3>
      </div>
    </div>
  )
}

export default CameraFeed
