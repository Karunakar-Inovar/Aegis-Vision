import { useState } from 'react'
import {
  SettingsIcon,
  CameraIcon,
  BrainCircuitIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  DatabaseIcon,
  ShieldIcon,
  BellIcon,
  SaveIcon,
  RefreshCwIcon,
  InfoIcon,
} from 'lucide-react'

// Types
interface InspectionSettings {
  // AI Settings
  enableAutoReject: boolean
  minAIConfidence: number
  maxProcessingTime: number
  enableMultiAngleInspection: boolean
  
  // Camera Settings
  cameraConfigProfile: string
  captureResolution: string
  lightingProfile: string
  exposureMode: string
  
  // Quality Control
  defectThreshold: number
  enableManualReview: boolean
  requireOperatorApproval: boolean
  enableBatchTracking: boolean
  
  // Notifications
  enableRealTimeAlerts: boolean
  notifyOnFailures: boolean
  notifyOnWarnings: boolean
  emailNotifications: boolean
  
  // Performance
  maxConcurrentInspections: number
  enableGPUAcceleration: boolean
  cacheInspectionResults: boolean
  enablePreProcessing: boolean
}

const InspectionSettingsPage = () => {
  const [settings, setSettings] = useState<InspectionSettings>({
    // AI Settings
    enableAutoReject: true,
    minAIConfidence: 85,
    maxProcessingTime: 30,
    enableMultiAngleInspection: false,
    
    // Camera Settings
    cameraConfigProfile: 'high-precision',
    captureResolution: '4K',
    lightingProfile: 'auto-adjust',
    exposureMode: 'auto',
    
    // Quality Control
    defectThreshold: 3,
    enableManualReview: true,
    requireOperatorApproval: false,
    enableBatchTracking: true,
    
    // Notifications
    enableRealTimeAlerts: true,
    notifyOnFailures: true,
    notifyOnWarnings: false,
    emailNotifications: true,
    
    // Performance
    maxConcurrentInspections: 4,
    enableGPUAcceleration: true,
    cacheInspectionResults: true,
    enablePreProcessing: true,
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSettingChange = <K extends keyof InspectionSettings>(
    key: K,
    value: InspectionSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setHasChanges(false)
    setIsSaving(false)
  }

  const handleReset = () => {
    // Reset to default values
    setSettings({
      enableAutoReject: true,
      minAIConfidence: 85,
      maxProcessingTime: 30,
      enableMultiAngleInspection: false,
      cameraConfigProfile: 'high-precision',
      captureResolution: '4K',
      lightingProfile: 'auto-adjust',
      exposureMode: 'auto',
      defectThreshold: 3,
      enableManualReview: true,
      requireOperatorApproval: false,
      enableBatchTracking: true,
      enableRealTimeAlerts: true,
      notifyOnFailures: true,
      notifyOnWarnings: false,
      emailNotifications: true,
      maxConcurrentInspections: 4,
      enableGPUAcceleration: true,
      cacheInspectionResults: true,
      enablePreProcessing: true,
    })
    setHasChanges(true)
  }

  // Toggle component
  const Toggle = ({ 
    enabled, 
    onChange, 
    label, 
    description 
  }: { 
    enabled: boolean
    onChange: (value: boolean) => void
    label: string
    description?: string 
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="text-sm font-medium text-white">{label}</div>
        {description && (
          <div className="text-xs text-gray-400 mt-1">{description}</div>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
          enabled ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  // Slider component
  const Slider = ({
    value,
    onChange,
    min,
    max,
    step = 1,
    label,
    unit = '',
    description
  }: {
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    step?: number
    label: string
    unit?: string
    description?: string
  }) => (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm font-medium text-white">{label}</div>
          {description && (
            <div className="text-xs text-gray-400 mt-1">{description}</div>
          )}
        </div>
        <div className="text-sm font-medium text-blue-400">
          {value}{unit}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #374151 ${((value - min) / (max - min)) * 100}%, #374151 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )

  // Select component
  const Select = ({
    value,
    onChange,
    options,
    label,
    description
  }: {
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string }[]
    label: string
    description?: string
  }) => (
    <div className="py-3">
      <div className="mb-2">
        <label className="text-sm font-medium text-white">{label}</label>
        {description && (
          <div className="text-xs text-gray-400 mt-1">{description}</div>
        )}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inspection Settings</h1>
          <p className="text-gray-400 mt-1">
            Configure AI inspection parameters and system behavior
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors border border-gray-600"
          >
            <RefreshCwIcon size={16} />
            Reset to Defaults
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasChanges && !isSaving
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <SaveIcon size={16} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Settings */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="border-b border-gray-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <BrainCircuitIcon size={20} className="text-blue-400" />
              <h3 className="font-medium text-white">AI Configuration</h3>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <Toggle
              enabled={settings.enableAutoReject}
              onChange={(value) => handleSettingChange('enableAutoReject', value)}
              label="Auto-Reject Failed Inspections"
              description="Automatically reject parts that fail AI inspection"
            />
            
            <Slider
              value={settings.minAIConfidence}
              onChange={(value) => handleSettingChange('minAIConfidence', value)}
              min={50}
              max={99}
              label="Minimum AI Confidence"
              unit="%"
              description="Minimum confidence threshold for AI decisions"
            />
            
            <Slider
              value={settings.maxProcessingTime}
              onChange={(value) => handleSettingChange('maxProcessingTime', value)}
              min={5}
              max={120}
              step={5}
              label="Max Processing Time"
              unit="s"
              description="Maximum time allowed for inspection processing"
            />
            
            <Toggle
              enabled={settings.enableMultiAngleInspection}
              onChange={(value) => handleSettingChange('enableMultiAngleInspection', value)}
              label="Multi-Angle Inspection"
              description="Enable inspection from multiple camera angles"
            />
          </div>
        </div>

        {/* Camera Settings */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="border-b border-gray-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <CameraIcon size={20} className="text-green-400" />
              <h3 className="font-medium text-white">Camera Configuration</h3>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <Select
              value={settings.cameraConfigProfile}
              onChange={(value) => handleSettingChange('cameraConfigProfile', value)}
              label="Configuration Profile"
              description="Predefined camera settings for different inspection types"
              options={[
                { value: 'high-precision', label: 'High Precision' },
                { value: 'speed-optimized', label: 'Speed Optimized' },
                { value: 'balanced', label: 'Balanced' },
                { value: 'custom', label: 'Custom' },
              ]}
            />
            
            <Select
              value={settings.captureResolution}
              onChange={(value) => handleSettingChange('captureResolution', value)}
              label="Capture Resolution"
              description="Image resolution for inspection capture"
              options={[
                { value: '1080p', label: '1080p (1920x1080)' },
                { value: '4K', label: '4K (3840x2160)' },
                { value: '8K', label: '8K (7680x4320)' },
                { value: 'custom', label: 'Custom Resolution' },
              ]}
            />
            
            <Select
              value={settings.lightingProfile}
              onChange={(value) => handleSettingChange('lightingProfile', value)}
              label="Lighting Profile"
              description="Lighting configuration for optimal inspection"
              options={[
                { value: 'auto-adjust', label: 'Auto Adjust' },
                { value: 'bright-field', label: 'Bright Field' },
                { value: 'dark-field', label: 'Dark Field' },
                { value: 'side-lighting', label: 'Side Lighting' },
                { value: 'custom', label: 'Custom' },
              ]}
            />
            
            <Select
              value={settings.exposureMode}
              onChange={(value) => handleSettingChange('exposureMode', value)}
              label="Exposure Mode"
              options={[
                { value: 'auto', label: 'Auto' },
                { value: 'manual', label: 'Manual' },
                { value: 'priority-speed', label: 'Speed Priority' },
                { value: 'priority-quality', label: 'Quality Priority' },
              ]}
            />
          </div>
        </div>

        {/* Quality Control */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="border-b border-gray-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <ShieldIcon size={20} className="text-yellow-400" />
              <h3 className="font-medium text-white">Quality Control</h3>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <Slider
              value={settings.defectThreshold}
              onChange={(value) => handleSettingChange('defectThreshold', value)}
              min={1}
              max={10}
              label="Defect Detection Threshold"
              description="Number of defects before triggering failure"
            />
            
            <Toggle
              enabled={settings.enableManualReview}
              onChange={(value) => handleSettingChange('enableManualReview', value)}
              label="Enable Manual Review"
              description="Allow operators to manually review AI decisions"
            />
            
            <Toggle
              enabled={settings.requireOperatorApproval}
              onChange={(value) => handleSettingChange('requireOperatorApproval', value)}
              label="Require Operator Approval"
              description="Require operator approval for all pass decisions"
            />
            
            <Toggle
              enabled={settings.enableBatchTracking}
              onChange={(value) => handleSettingChange('enableBatchTracking', value)}
              label="Batch Tracking"
              description="Track and correlate inspections by batch"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="border-b border-gray-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <BellIcon size={20} className="text-purple-400" />
              <h3 className="font-medium text-white">Notifications</h3>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <Toggle
              enabled={settings.enableRealTimeAlerts}
              onChange={(value) => handleSettingChange('enableRealTimeAlerts', value)}
              label="Real-Time Alerts"
              description="Show immediate alerts for inspection events"
            />
            
            <Toggle
              enabled={settings.notifyOnFailures}
              onChange={(value) => handleSettingChange('notifyOnFailures', value)}
              label="Notify on Failures"
              description="Send notifications when inspections fail"
            />
            
            <Toggle
              enabled={settings.notifyOnWarnings}
              onChange={(value) => handleSettingChange('notifyOnWarnings', value)}
              label="Notify on Warnings"
              description="Send notifications for warning-level issues"
            />
            
            <Toggle
              enabled={settings.emailNotifications}
              onChange={(value) => handleSettingChange('emailNotifications', value)}
              label="Email Notifications"
              description="Send email notifications to operators and managers"
            />
          </div>
        </div>
      </div>

      {/* Performance Settings */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="border-b border-gray-700 px-4 py-3">
          <div className="flex items-center gap-2">
            <DatabaseIcon size={20} className="text-orange-400" />
            <h3 className="font-medium text-white">Performance & System</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Slider
                value={settings.maxConcurrentInspections}
                onChange={(value) => handleSettingChange('maxConcurrentInspections', value)}
                min={1}
                max={8}
                label="Max Concurrent Inspections"
                description="Maximum number of simultaneous inspections"
              />
              
              <Toggle
                enabled={settings.enableGPUAcceleration}
                onChange={(value) => handleSettingChange('enableGPUAcceleration', value)}
                label="GPU Acceleration"
                description="Use GPU for faster AI processing"
              />
            </div>
            
            <div className="space-y-4">
              <Toggle
                enabled={settings.cacheInspectionResults}
                onChange={(value) => handleSettingChange('cacheInspectionResults', value)}
                label="Cache Results"
                description="Cache inspection results for faster retrieval"
              />
              
              <Toggle
                enabled={settings.enablePreProcessing}
                onChange={(value) => handleSettingChange('enablePreProcessing', value)}
                label="Pre-Processing"
                description="Enable image pre-processing for better accuracy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Information */}
      {hasChanges && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-400">
            <InfoIcon size={16} />
            <span className="text-sm font-medium">Unsaved Changes</span>
          </div>
          <p className="text-sm text-blue-300 mt-1">
            You have unsaved changes. Click "Save Changes" to apply your settings.
          </p>
        </div>
      )}
    </div>
  )
}

export default InspectionSettingsPage
