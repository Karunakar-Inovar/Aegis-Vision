import {
  RocketIcon,
  ServerIcon,
  CloudIcon,
  SettingsIcon,
  AlertTriangleIcon,
} from 'lucide-react'

const ModelDeploymentPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="flex items-center space-x-3">
          <RocketIcon className="w-8 h-8 text-green-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Model Deployment</h1>
            <p className="text-gray-300">Deploy and manage your AI models across different environments</p>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployment Options Card */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <CloudIcon size={20} className="text-blue-400 mr-2" />
            <h3 className="text-lg font-medium text-white">Deployment Options</h3>
          </div>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
              <ServerIcon size={16} className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-white">Edge Deployment</p>
                <p className="text-xs text-gray-400">Deploy models directly to edge devices</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
              <CloudIcon size={16} className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-white">Cloud Deployment</p>
                <p className="text-xs text-gray-400">Deploy to cloud infrastructure</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
              <SettingsIcon size={16} className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-white">Hybrid Deployment</p>
                <p className="text-xs text-gray-400">Combine edge and cloud deployment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Overview Card */}
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <AlertTriangleIcon size={20} className="text-orange-400 mr-2" />
            <h3 className="text-lg font-medium text-white">Deployment Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <span className="text-sm text-white">Production Deployments</span>
              <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">3 Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <span className="text-sm text-white">Staging Deployments</span>
              <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">2 Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <span className="text-sm text-white">Failed Deployments</span>
              <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded-full text-xs">1 Failed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-8 text-center">
        <RocketIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Deployment Management Coming Soon</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Advanced deployment management features are currently under development. 
          This will include automated deployment pipelines, rollback capabilities, 
          A/B testing, and comprehensive monitoring dashboards.
        </p>
        <div className="mt-6">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white transition-colors">
            Request Early Access
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModelDeploymentPage
