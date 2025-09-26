import React from 'react'
import { AlertCircleIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react'

interface AlertItemProps {
  alert: {
    id: number
    camera: string
    message: string
    timestamp: string
    severity: string
  }
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  // Format timestamp to relative time
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))
    
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return alertTime.toLocaleDateString()
  }

  // Determine severity icon and color
  const getSeverityDetails = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          icon: <AlertCircleIcon className="h-5 w-5" />,
          bgColor: 'bg-red-500',
          textColor: 'text-white',
        }
      case 'medium':
        return {
          icon: <AlertTriangleIcon className="h-5 w-5" />,
          bgColor: 'bg-yellow-500',
          textColor: 'text-black',
        }
      default:
        return {
          icon: <InfoIcon className="h-5 w-5" />,
          bgColor: 'bg-green-500',
          textColor: 'text-white',
        }
    }
  }

  const { icon, bgColor, textColor } = getSeverityDetails(alert.severity)

  return (
    <div className="bg-gray-700 rounded-lg p-3">
      <div className="flex items-start">
        <div
          className={`${bgColor} ${textColor} p-1.5 rounded-lg mr-3 flex-shrink-0`}
        >
          {icon}
        </div>
        <div className="flex-grow">
          <h4 className="font-medium">{alert.camera}</h4>
          <p className="text-sm text-gray-300 mb-1">{alert.message}</p>
          <span className="text-xs text-gray-400">
            {formatTimeAgo(alert.timestamp)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AlertItem
