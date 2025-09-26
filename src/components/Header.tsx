import React from 'react'
import {
  WifiIcon,
  ServerIcon,
  BatteryFullIcon,
  AlertTriangleIcon,
} from 'lucide-react'

const Header = () => {
  // Mock health status data
  const systemStatus = {
    network: {
      status: 'good',
      latency: '24ms',
    },
    server: {
      status: 'good',
      load: '42%',
    },
    storage: {
      status: 'warning',
      used: '78%',
    },
    cameras: {
      status: 'good',
      online: '8/8',
    },
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/aegis-logo.png" alt="Aegis Vision Logo" className="h-8 w-auto mr-2" />
          <h1 className="text-xl font-bold mr-8">Security Operations Center</h1>
          <span className="text-sm text-gray-400 mr-4">
            Live View • {new Date().toLocaleString()}
          </span>
        </div>
        <div className="flex space-x-6">
          {/* Network Status */}
          <div className="flex items-center">
            <WifiIcon
              className={`h-5 w-5 mr-2 ${systemStatus.network.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Network</span>
              <span className="text-sm">{systemStatus.network.latency}</span>
            </div>
          </div>
          {/* Server Status */}
          <div className="flex items-center">
            <ServerIcon
              className={`h-5 w-5 mr-2 ${systemStatus.server.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Server</span>
              <span className="text-sm">{systemStatus.server.load}</span>
            </div>
          </div>
          {/* Storage Status */}
          <div className="flex items-center">
            <BatteryFullIcon
              className={`h-5 w-5 mr-2 ${systemStatus.storage.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}`}
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Storage</span>
              <span className="text-sm">{systemStatus.storage.used}</span>
            </div>
          </div>
          {/* Camera Status */}
          <div className="flex items-center">
            <AlertTriangleIcon
              className={`h-5 w-5 mr-2 ${systemStatus.cameras.status === 'good' ? 'text-green-400' : 'text-yellow-400'}`}
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Cameras</span>
              <span className="text-sm">{systemStatus.cameras.online}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
