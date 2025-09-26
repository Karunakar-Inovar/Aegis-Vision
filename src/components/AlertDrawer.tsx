import React from 'react'
import { XIcon, BellIcon } from 'lucide-react'

interface Alert {
  id: number
  camera: string
  message: string
  timestamp: string
  severity: string
}

interface AlertDrawerProps {
  isOpen: boolean
  onClose: () => void
  alerts: Alert[]
}

const AlertDrawer: React.FC<AlertDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between border-b border-gray-700 p-4">
        <div className="flex items-center">
          <BellIcon className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-lg font-bold">Alerts</h2>
          <div className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {alerts.length}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
          aria-label="Close alerts"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="overflow-y-auto h-full pb-20">
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-gray-400">No alerts</div>
        ) : (
          <div className="divide-y divide-gray-700">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-gray-750">
                <div className="flex items-start">
                  <div
                    className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}
                  ></div>
                  <div className="ml-3 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{alert.message}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {alert.camera}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 p-4 bg-gray-800">
        <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">
          Clear All Alerts
        </button>
      </div>
    </div>
  )
}

export default AlertDrawer
