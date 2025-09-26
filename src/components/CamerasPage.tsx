import React, { useState } from 'react'
import MainLayout from '@/components/MainLayout'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import {
  CameraIcon,
  WifiIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SaveIcon,
  RefreshCwIcon,
  EyeIcon,
  MapPinIcon,
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  PlusIcon,
  PowerIcon,
  AlertTriangleIcon,
  DownloadIcon,
  UploadIcon,
  SlashIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  SlidersIcon,
  ZapIcon,
  MonitorIcon,
  ClockIcon,
  ShieldIcon,
  RotateCwIcon,
  GridIcon,
  SettingsIcon,
  TargetIcon,
  FocusIcon,
  MaximizeIcon,
  MinimizeIcon,
  CheckIcon,
  EditIcon,
} from 'lucide-react'

// Additional icon components
const NetworkIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="10" x2="6" y2="14"></line>
    <line x1="12" y1="10" x2="12" y2="14"></line>
    <line x1="18" y1="10" x2="18" y2="14"></line>
  </svg>
)

const ListIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
)

const AdjustmentsIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
)

const BrainCircuitIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M9 13a4.5 4.5 0 0 0 3-4"/>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
    <path d="M6 18a4 4 0 0 1-1.967-.516"/>
    <path d="M12 13h4"/>
    <path d="M12 18h6a2 2 0 0 1 2 2v1"/>
    <path d="M12 8h8"/>
    <path d="M16 8V5a2 2 0 0 1 2-2"/>
    <circle cx="16" cy="13" r=".5"/>
    <circle cx="18" cy="3" r=".5"/>
    <circle cx="20" cy="21" r=".5"/>
    <circle cx="20" cy="8" r=".5"/>
  </svg>
)

const CamerasPage = () => {
  const { loading, isAuthenticated } = useAuthRedirect()
  const [activeTab, setActiveTab] = useState('setup')
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null)
  const [calibrationStep, setCalibrationStep] = useState(1)

  const camerasTabs = [
    {
      id: 'setup',
      label: 'Camera Setup',
    },
    {
      id: 'management',
      label: 'Management',
    },
    {
      id: 'settings',
      label: 'Settings',
    },
    {
      id: 'calibration',
      label: 'Calibration',
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleNextCalibrationStep = () => {
    setCalibrationStep((prev) => Math.min(prev + 1, 4))
  }

  const handlePrevCalibrationStep = () => {
    setCalibrationStep((prev) => Math.max(prev - 1, 1))
  }

  // Mock camera connection status
  const [connectionStatus, setConnectionStatus] = useState({
    connected: true,
    signalStrength: 87,
    ipAddress: '192.168.1.45',
    mac: '00:1B:44:11:3A:B7',
  })

  // Mock camera settings
  const [cameraSettings, setCameraSettings] = useState({
    name: 'Assembly Line Camera',
    resolution: '1920x1080',
    frameRate: 30,
    nightMode: false,
    motionDetection: true,
  })

  // Mock cameras for management tab
  const cameras = [
    {
      id: 1,
      name: 'Assembly Line East',
      location: 'Production Floor',
      type: 'Fixed IP Camera',
      status: 'online',
      lastMaintenance: '2023-05-10',
      ipAddress: '192.168.1.45',
      resolution: '1920x1080',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Assembly Line West',
      location: 'Production Floor',
      type: 'Fixed IP Camera',
      status: 'online',
      lastMaintenance: '2023-05-15',
      ipAddress: '192.168.1.46',
      resolution: '1920x1080',
      image: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Warehouse Entrance',
      location: 'Warehouse',
      type: 'PTZ Camera',
      status: 'online',
      lastMaintenance: '2023-06-01',
      ipAddress: '192.168.1.47',
      resolution: '1920x1080',
      image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      name: 'Quality Control',
      location: 'QC Department',
      type: 'Fixed IP Camera',
      status: 'maintenance',
      lastMaintenance: '2023-06-10',
      ipAddress: '192.168.1.48',
      resolution: '3840x2160',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      name: 'Loading Dock',
      location: 'Warehouse',
      type: 'Fixed IP Camera',
      status: 'offline',
      lastMaintenance: '2023-04-20',
      ipAddress: '192.168.1.49',
      resolution: '1280x720',
      image: 'https://images.unsplash.com/photo-1597149565096-4b5dbd9c3262?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      name: 'Main Entrance',
      location: 'Reception',
      type: 'PTZ Camera',
      status: 'online',
      lastMaintenance: '2023-05-25',
      ipAddress: '192.168.1.50',
      resolution: '1920x1080',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 7,
      name: 'Parking Lot',
      location: 'Exterior',
      type: 'Fixed IP Camera',
      status: 'online',
      lastMaintenance: '2023-05-05',
      ipAddress: '192.168.1.51',
      resolution: '1920x1080',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 8,
      name: 'Server Room',
      location: 'IT Department',
      type: 'Fixed IP Camera',
      status: 'online',
      lastMaintenance: '2023-06-05',
      ipAddress: '192.168.1.52',
      resolution: '1920x1080',
      image: 'https://images.unsplash.com/photo-1523346830303-4673c7f3a086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ]

  // Global camera settings for settings tab
  const [globalSettings, setGlobalSettings] = useState({
    storageRetention: 23,
    recordingQuality: 'high',
    motionSensitivity: 50,
    nightModeActivation: 'auto',
    timelapseInterval: 60,
    backupFrequency: 'daily',
    aiEnabled: true,
    objectDetection: true,
    facialRecognition: false,
    alertNotifications: true,
    bandwidthLimit: 0,
    motionDetectionAlert: true,
    objectDetectionAlert: true,
    cameraOfflineAlert: true,
    cameraTamperingAlert: true,
    storageWarningsAlert: true,
    connectionProtocol: 'rtsp',
  })

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white text-lg">Loading cameras...</p>
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
      activeModule="cameras"
      tabs={camerasTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'setup' && (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Camera Setup Wizard</h1>
            <div className="text-sm text-gray-400">Step {currentStep} of 4</div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                <div
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  style={{
                    width: `${(currentStep / 4) * 100}%`,
                  }}
                ></div>
              </div>
              {/* Step Indicators */}
              <div className="flex justify-between text-xs mt-2">
                <div
                  className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${currentStep > 1 ? 'bg-blue-600' : currentStep === 1 ? 'border-2 border-blue-600' : 'border-2 border-gray-600'}`}
                  >
                    {currentStep > 1 && <CheckIcon size={12} />}
                  </div>
                  <span>Connection</span>
                </div>
                <div
                  className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${currentStep > 2 ? 'bg-blue-600' : currentStep === 2 ? 'border-2 border-blue-600' : 'border-2 border-gray-600'}`}
                  >
                    {currentStep > 2 && <CheckIcon size={12} />}
                  </div>
                  <span>Settings</span>
                </div>
                <div
                  className={`flex flex-col items-center ${currentStep >= 3 ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${currentStep > 3 ? 'bg-blue-600' : currentStep === 3 ? 'border-2 border-blue-600' : 'border-2 border-gray-600'}`}
                  >
                    {currentStep > 3 && <CheckIcon size={12} />}
                  </div>
                  <span>Positioning</span>
                </div>
                <div
                  className={`flex flex-col items-center ${currentStep >= 4 ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${currentStep === 4 ? 'border-2 border-blue-600' : 'border-2 border-gray-600'}`}
                  >
                    {currentStep === 4 && <CheckIcon size={12} />}
                  </div>
                  <span>Verification</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Step 1: Connection */}
            {currentStep === 1 && (
              <div>
            <div className="border-b border-gray-700 p-4">
                  <h2 className="text-lg font-medium">Connect Your Camera</h2>
              <p className="text-sm text-gray-400 mt-1">
                    Establish a connection with your camera device
              </p>
            </div>
            <div className="p-6">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                    <CameraIcon size={64} className="text-gray-500" />
                  </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm mb-2">Connection Method</div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 bg-blue-600 rounded-lg flex items-center justify-center">
                        <WifiIcon size={20} className="mr-2" />
                        <span>Wi-Fi</span>
                      </button>
                      <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
                        <NetworkIcon size={20} className="mr-2" />
                        <span>Ethernet</span>
                      </button>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm mb-2">Available Cameras</div>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-600 rounded-full mr-3">
                        <CameraIcon size={20} className="text-white" />
                      </div>
                          <div className="flex-grow">
                            <div className="font-medium">
                              IP Camera (192.168.1.45)
                            </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Manufacturer: Axis Communications
                        </div>
                      </div>
                      <div className="flex items-center text-green-400">
                        <CheckCircleIcon size={16} className="mr-1" />
                        <span className="text-sm">Connected</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-750 border border-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-700 rounded-full mr-3">
                            <CameraIcon size={20} className="text-gray-400" />
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium">
                              IP Camera (192.168.1.72)
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              Manufacturer: Hikvision
                            </div>
                          </div>
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-750 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3">
                      Connection Details
                    </h3>
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                      <div className="text-gray-400">Status:</div>
                      <div className="flex items-center text-green-400">
                        <CheckCircleIcon size={16} className="mr-1" />
                        Connected
                      </div>
                      <div className="text-gray-400">Signal Strength:</div>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${connectionStatus.signalStrength}%`,
                            }}
                          ></div>
                        </div>
                        <span>{connectionStatus.signalStrength}%</span>
                      </div>
                      <div className="text-gray-400">IP Address:</div>
                      <div>{connectionStatus.ipAddress}</div>
                      <div className="text-gray-400">MAC Address:</div>
                      <div>{connectionStatus.mac}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Step 2: Camera Settings */}
              {currentStep === 2 && (
              <div>
                <div className="border-b border-gray-700 p-4">
                  <h2 className="text-lg font-medium">
                    Configure Camera Settings
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Adjust the camera settings for optimal performance
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                        <label className="block text-sm mb-2">
                          Camera Name
                        </label>
                    <input
                      type="text"
                          value={cameraSettings.name}
                          onChange={(e) =>
                            setCameraSettings({
                              ...cameraSettings,
                              name: e.target.value,
                            })
                          }
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                    <div>
                      <label className="block text-sm mb-2">Resolution</label>
                        <select
                          value={cameraSettings.resolution}
                          onChange={(e) =>
                            setCameraSettings({
                              ...cameraSettings,
                              resolution: e.target.value,
                            })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                        >
                          <option value="640x480">640x480 (VGA)</option>
                        <option value="1280x720">1280x720 (720p)</option>
                          <option value="1920x1080">1920x1080 (1080p)</option>
                        <option value="3840x2160">3840x2160 (4K)</option>
                      </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-2">
                          Frame Rate (FPS)
                        </label>
                        <select
                          value={cameraSettings.frameRate}
                          onChange={(e) =>
                            setCameraSettings({
                              ...cameraSettings,
                              frameRate: parseInt(e.target.value),
                            })
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                        >
                          <option value="15">15 FPS</option>
                        <option value="24">24 FPS</option>
                          <option value="30">30 FPS</option>
                        <option value="60">60 FPS</option>
                      </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">
                          Advanced Settings
                        </label>
                        <div className="space-y-3 bg-gray-750 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Night Mode</span>
                            <div
                              onClick={() =>
                                setCameraSettings({
                                  ...cameraSettings,
                                  nightMode: !cameraSettings.nightMode,
                                })
                              }
                              className={`w-10 h-5 ${cameraSettings.nightMode ? 'bg-blue-600' : 'bg-gray-600'} rounded-full relative cursor-pointer`}
                            >
                              <div
                                className={`absolute top-0.5 ${cameraSettings.nightMode ? 'right-0.5' : 'left-0.5'} bg-white w-4 h-4 rounded-full transition-all`}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Motion Detection</span>
                            <div
                              onClick={() =>
                                setCameraSettings({
                                  ...cameraSettings,
                                  motionDetection:
                                    !cameraSettings.motionDetection,
                                })
                              }
                              className={`w-10 h-5 ${cameraSettings.motionDetection ? 'bg-blue-600' : 'bg-gray-600'} rounded-full relative cursor-pointer`}
                            >
                              <div
                                className={`absolute top-0.5 ${cameraSettings.motionDetection ? 'right-0.5' : 'left-0.5'} bg-white w-4 h-4 rounded-full transition-all`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Preview</label>
                        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                          <CameraIcon size={48} className="text-gray-700" />
                          <span className="ml-3 text-gray-600">
                            Camera preview would appear here
                          </span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              )}

            {/* Step 3: Positioning */}
              {currentStep === 3 && (
              <div>
                <div className="border-b border-gray-700 p-4">
                  <h2 className="text-lg font-medium">Camera Positioning</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Define the camera's location and monitoring areas
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="aspect-video bg-gray-750 rounded-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPinIcon size={48} className="text-gray-600" />
                          <span className="ml-3 text-gray-500">
                            Floor plan would appear here
                          </span>
                    </div>
                        {/* Camera Position Indicator */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 rounded-full bg-blue-600/30 border-2 border-blue-600 flex items-center justify-center">
                            <CameraIcon size={20} className="text-blue-400" />
                  </div>
                          {/* Field of View Indicator */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-[100px] border-t-transparent border-l-[160px] border-l-blue-600/20 border-r-[160px] border-r-blue-600/20 rotate-90"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-sm">
                          <UploadIcon size={16} className="mr-2" />
                      Upload Floor Plan
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-sm">
                          <EditIcon size={16} className="mr-2" />
                      Edit Monitoring Areas
                    </button>
                      </div>
                    </div>
                    <div>
                      <div className="bg-gray-750 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3">
                          Camera Location
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Building
                            </label>
                            <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                              <option>Main Factory</option>
                              <option>Warehouse</option>
                              <option>Office Building</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Floor
                            </label>
                            <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                              <option>Ground Floor</option>
                              <option>First Floor</option>
                              <option>Second Floor</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Area
                            </label>
                            <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                              <option>Assembly Line</option>
                              <option>Packaging</option>
                              <option>Quality Control</option>
                              <option>Storage</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-750 rounded-lg p-4 mt-4">
                        <h3 className="text-sm font-medium mb-3">
                          Field of View
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Angle (degrees)
                            </label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                min="30"
                                max="120"
                                defaultValue="75"
                                className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                              />
                              <span className="ml-2 text-sm">75°</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Height (meters)
                            </label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                min="1"
                                max="10"
                                defaultValue="3"
                                className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                              />
                              <span className="ml-2 text-sm">3m</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Rotation
                            </label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                min="0"
                                max="359"
                                defaultValue="180"
                                className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                              />
                              <span className="ml-2 text-sm">180°</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              )}

            {/* Step 4: Verification */}
              {currentStep === 4 && (
              <div>
                <div className="border-b border-gray-700 p-4">
                  <h2 className="text-lg font-medium">
                    Verify and Complete Setup
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Review settings and complete the camera setup
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Camera Preview
                      </h3>
                      <div className="aspect-video bg-gray-750 rounded-lg flex items-center justify-center mb-3">
                    <EyeIcon size={48} className="text-gray-600" />
                        <span className="ml-3 text-gray-500">
                          Live preview would appear here
                        </span>
                  </div>
                      <div className="flex justify-between">
                        <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm flex items-center">
                          <RefreshCwIcon size={14} className="mr-1" />
                          Refresh
                        </button>
                        <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm flex items-center">
                          <AdjustmentsIcon size={14} className="mr-1" />
                          Adjust
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Configuration Summary
                      </h3>
                      <div className="bg-gray-750 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between pb-2 border-b border-gray-700">
                            <span className="text-sm text-gray-400">
                              Camera Name:
                            </span>
                            <span className="text-sm font-medium">
                              {cameraSettings.name}
                            </span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-gray-700">
                            <span className="text-sm text-gray-400">
                              IP Address:
                            </span>
                            <span className="text-sm font-medium">
                              {connectionStatus.ipAddress}
                            </span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-gray-700">
                            <span className="text-sm text-gray-400">
                              Resolution:
                            </span>
                            <span className="text-sm font-medium">
                              {cameraSettings.resolution}
                            </span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-gray-700">
                            <span className="text-sm text-gray-400">
                              Frame Rate:
                            </span>
                            <span className="text-sm font-medium">
                              {cameraSettings.frameRate} FPS
                            </span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-gray-700">
                            <span className="text-sm text-gray-400">
                              Location:
                            </span>
                            <span className="text-sm font-medium">
                              Assembly Line (Ground Floor)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">
                              Features:
                            </span>
                            <span className="text-sm font-medium">
                              {cameraSettings.motionDetection
                                ? 'Motion Detection, '
                                : ''}
                              {cameraSettings.nightMode ? 'Night Mode' : ''}
                              {!cameraSettings.motionDetection &&
                                !cameraSettings.nightMode &&
                                'None'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex">
                        <CheckCircleIcon
                          size={20}
                          className="text-green-500 mr-3 flex-shrink-0"
                        />
                        <div>
                          <div className="text-sm font-medium text-green-500">
                            Camera Ready
                          </div>
                      <div className="text-xs text-gray-300 mt-1">
                            Your camera has been successfully configured and is
                            ready to use.
                      </div>
                    </div>
                  </div>
                </div>
            </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="border-t border-gray-700 p-4 flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-md text-sm flex items-center ${currentStep === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <ChevronLeftIcon size={16} className="mr-2" />
                Previous
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center"
                >
                  Next
                  <ChevronRightIcon size={16} className="ml-2" />
                </button>
              ) : (
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm flex items-center">
                  Finish Setup
                  <CheckIcon size={16} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Camera Management Tab */}
      {activeTab === 'management' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Camera Management</h1>
            <div className="flex space-x-3">
              <div className="relative">
                <SearchIcon
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search cameras..."
                  className="pl-9 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm w-64"
                />
              </div>
              <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center">
                <FilterIcon size={16} className="mr-2" />
                Filter
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center">
                <PlusIcon size={16} className="mr-2" />
                Add Camera
              </button>
            </div>
          </div>

          {/* Camera Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Cameras</div>
                  <div className="text-2xl font-bold">8</div>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <CameraIcon size={20} className="text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Online</div>
                  <div className="text-2xl font-bold">6</div>
                </div>
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircleIcon size={20} className="text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Maintenance</div>
                  <div className="text-2xl font-bold">1</div>
                </div>
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <AlertTriangleIcon size={20} className="text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Offline</div>
                  <div className="text-2xl font-bold">1</div>
                </div>
                <div className="p-2 rounded-lg bg-red-500/20">
                  <XCircleIcon size={20} className="text-red-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Camera Grid */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 px-4 py-3 flex items-center justify-between">
              <h3 className="font-medium">Camera Network</h3>
              <div className="flex items-center space-x-2">
                <button className="p-1 bg-gray-700 hover:bg-gray-600 rounded">
                  <GridIcon size={16} />
                </button>
                <button className="p-1 bg-gray-700 hover:bg-gray-600 rounded">
                  <ListIcon size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {cameras.map((camera) => (
                <div
                  key={camera.id}
                  className="bg-gray-750 rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={camera.image}
                      alt={camera.name}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <div
                        className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${
                          camera.status === 'online'
                            ? 'bg-green-500/20 text-green-400'
                            : camera.status === 'offline'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            camera.status === 'online'
                              ? 'bg-green-400'
                              : camera.status === 'offline'
                                ? 'bg-red-400'
                                : 'bg-yellow-400'
                          }`}
                        ></div>
                        {camera.status.charAt(0).toUpperCase() +
                          camera.status.slice(1)}
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button className="p-1 bg-black/50 rounded hover:bg-black/70">
                        <MoreHorizontalIcon size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      <button className="p-1 bg-black/50 rounded hover:bg-black/70">
                        <MaximizeIcon size={16} />
                      </button>
                      <button className="p-1 bg-black/50 rounded hover:bg-black/70">
                        <PowerIcon size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-medium text-sm mb-1">
                      {camera.name}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        {camera.location}
                      </div>
                      <div className="text-xs text-gray-400">
                        {camera.resolution}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Camera Details */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 px-4 py-3">
              <h3 className="font-medium">Camera Details</h3>
            </div>
            <div className="p-4">
              <div className="text-center text-gray-500 py-12">
                Select a camera to view detailed information and controls
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Camera System Settings</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">
                Reset to Default
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center">
                <SaveIcon size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Recording Settings and AI Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recording Settings */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-700 px-4 py-3">
                  <h3 className="font-medium">Recording Settings</h3>
                </div>
                <div className="p-4 space-y-6">
                  {/* Storage Retention Period */}
                  <div>
                    <label className="block text-sm mb-2">
                      Storage Retention Period (days)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="7"
                        max="90"
                        value={globalSettings.storageRetention}
                        onChange={(e) =>
                          setGlobalSettings({
                            ...globalSettings,
                            storageRetention: parseInt(e.target.value),
                          })
                        }
                        className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-3 text-sm font-medium w-8 text-right">
                        {globalSettings.storageRetention}
          </span>
                    </div>
                  </div>

                  {/* Recording Quality */}
                  <div>
                    <label className="block text-sm mb-2">
                      Recording Quality
                    </label>
                    <select
                      value={globalSettings.recordingQuality}
                      onChange={(e) =>
                        setGlobalSettings({
                          ...globalSettings,
                          recordingQuality: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="low">Low (480p)</option>
                      <option value="medium">Medium (720p)</option>
                      <option value="high">High (1080p)</option>
                      <option value="ultra">Ultra (4K)</option>
                    </select>
                  </div>

                  {/* Two Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Motion Detection Sensitivity */}
                    <div>
                      <label className="block text-sm mb-2">
                        Motion Detection Sensitivity
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={globalSettings.motionSensitivity}
                          onChange={(e) =>
                            setGlobalSettings({
                              ...globalSettings,
                              motionSensitivity: parseInt(e.target.value),
                            })
                          }
                          className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-3 text-sm font-medium w-12 text-right">
                          {globalSettings.motionSensitivity}%
                        </span>
                      </div>
                    </div>

                    {/* Night Mode Activation */}
                    <div>
                      <label className="block text-sm mb-2">
                        Night Mode Activation
                      </label>
                      <select
                        value={globalSettings.nightModeActivation}
                        onChange={(e) =>
                          setGlobalSettings({
                            ...globalSettings,
                            nightModeActivation: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="auto">Automatic (Light Sensor)</option>
                        <option value="schedule">Schedule Based</option>
                        <option value="manual">Manual Only</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                  </div>

                  {/* Second Two Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Timelapse Interval */}
                    <div>
                      <label className="block text-sm mb-2">
                        Timelapse Interval (seconds)
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="3600"
                        value={globalSettings.timelapseInterval}
                        onChange={(e) =>
                          setGlobalSettings({
                            ...globalSettings,
                            timelapseInterval: parseInt(e.target.value),
                          })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                      />
                    </div>

                    {/* Backup Frequency */}
                    <div>
                      <label className="block text-sm mb-2">
                        Backup Frequency
                      </label>
                      <select
                        value={globalSettings.backupFrequency}
                        onChange={(e) =>
                          setGlobalSettings({
                            ...globalSettings,
                            backupFrequency: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI & Analytics Settings */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-700 px-4 py-3">
                  <h3 className="font-medium">AI & Analytics Settings</h3>
                </div>
                <div className="p-4 space-y-4">
                  {/* AI-Powered Detection */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">AI-Powered Detection</div>
                      <div className="text-sm text-gray-400">
                        Enable machine learning for advanced object detection
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        setGlobalSettings({
                          ...globalSettings,
                          aiEnabled: !globalSettings.aiEnabled,
                        })
                      }
                      className={`w-10 h-5 ${globalSettings.aiEnabled ? 'bg-blue-600' : 'bg-gray-600'} rounded-full relative cursor-pointer`}
                    >
                      <div
                        className={`absolute top-0.5 ${globalSettings.aiEnabled ? 'right-0.5' : 'left-0.5'} bg-white w-4 h-4 rounded-full transition-all`}
                      ></div>
                    </div>
                  </div>

                  {/* Object Detection */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Object Detection</div>
                      <div className="text-sm text-gray-400">
                        Detect and classify objects in the camera view
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        setGlobalSettings({
                          ...globalSettings,
                          objectDetection: !globalSettings.objectDetection,
                        })
                      }
                      className={`w-10 h-5 ${globalSettings.objectDetection ? 'bg-blue-600' : 'bg-gray-600'} rounded-full relative cursor-pointer ${!globalSettings.aiEnabled && 'opacity-50 cursor-not-allowed'}`}
                    >
                      <div
                        className={`absolute top-0.5 ${globalSettings.objectDetection ? 'right-0.5' : 'left-0.5'} bg-white w-4 h-4 rounded-full transition-all`}
                      ></div>
                    </div>
                  </div>

                  {/* Facial Recognition */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Facial Recognition</div>
                      <div className="text-sm text-gray-400">
                        Identify and track individuals using facial recognition
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        setGlobalSettings({
                          ...globalSettings,
                          facialRecognition: !globalSettings.facialRecognition,
                        })
                      }
                      className={`w-10 h-5 ${globalSettings.facialRecognition ? 'bg-blue-600' : 'bg-gray-600'} rounded-full relative cursor-pointer ${!globalSettings.aiEnabled && 'opacity-50 cursor-not-allowed'}`}
                    >
                      <div
                        className={`absolute top-0.5 ${globalSettings.facialRecognition ? 'right-0.5' : 'left-0.5'} bg-white w-4 h-4 rounded-full transition-all`}
                      ></div>
                    </div>
                  </div>

                  {/* AI Model Information */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-start">
                      <div className="p-1 rounded-full bg-blue-500/20 mr-3 mt-0.5">
                        <BrainCircuitIcon size={16} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-400">
                          AI Model Information
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          Current model: Vision AI v2.4 • Last updated: June 2, 2023
                        </div>
                        <button className="mt-2 px-2 py-1 bg-blue-600/30 hover:bg-blue-600/40 text-blue-400 rounded text-xs">
                          Update AI Models
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Notification Settings and Network Settings */}
            <div className="space-y-6">
              {/* Notification Settings */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-700 px-4 py-3">
                  <h3 className="font-medium">Notification Settings</h3>
                </div>
                <div className="p-4 space-y-4">
                  {/* Alert Notifications Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Alert Notifications</div>
                      <div className="text-sm text-gray-400">
                        Receive notifications for detected events
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        setGlobalSettings({
                          ...globalSettings,
                          alertNotifications: !globalSettings.alertNotifications,
                        })
                      }
                      className={`w-10 h-5 ${globalSettings.alertNotifications ? 'bg-blue-600' : 'bg-gray-600'} rounded-full relative cursor-pointer`}
                    >
                      <div
                        className={`absolute top-0.5 ${globalSettings.alertNotifications ? 'right-0.5' : 'left-0.5'} bg-white w-4 h-4 rounded-full transition-all`}
                      ></div>
                    </div>
                  </div>

                  {/* Alert Types */}
                  <div className="space-y-2">
                    <label className="block text-sm">Alert Types</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="motionAlert"
                          checked={globalSettings.motionDetectionAlert}
                          onChange={(e) =>
                            setGlobalSettings({
                              ...globalSettings,
                              motionDetectionAlert: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="motionAlert" className="ml-2 text-sm">
                          Motion Detection
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="objectAlert"
                          checked={globalSettings.objectDetectionAlert}
                          onChange={(e) =>
                            setGlobalSettings({
                              ...globalSettings,
                              objectDetectionAlert: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="objectAlert" className="ml-2 text-sm">
                          Object Detection
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="offlineAlert"
                          checked={globalSettings.cameraOfflineAlert}
                          onChange={(e) =>
                            setGlobalSettings({
                              ...globalSettings,
                              cameraOfflineAlert: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="offlineAlert" className="ml-2 text-sm">
                          Camera Offline
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="tamperingAlert"
                          checked={globalSettings.cameraTamperingAlert}
                          onChange={(e) =>
                            setGlobalSettings({
                              ...globalSettings,
                              cameraTamperingAlert: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="tamperingAlert" className="ml-2 text-sm">
                          Camera Tampering
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="storageAlert"
                          checked={globalSettings.storageWarningsAlert}
                          onChange={(e) =>
                            setGlobalSettings({
                              ...globalSettings,
                              storageWarningsAlert: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="storageAlert" className="ml-2 text-sm">
                          Storage Warnings
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Notification Recipients */}
                  <div>
                    <label className="block text-sm mb-2">
                      Notification Recipients
                    </label>
                    <textarea
                      placeholder="admin@example.com&#10;security@example.com"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm h-20 resize-none"
                      defaultValue="admin@example.com&#10;security@example.com"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Network Settings */}
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="border-b border-gray-700 px-4 py-3">
                  <h3 className="font-medium">Network Settings</h3>
                </div>
                <div className="p-4 space-y-4">
                  {/* Bandwidth Limit */}
                  <div>
                    <label className="block text-sm mb-2">
                      Bandwidth Limit (Mbps)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={globalSettings.bandwidthLimit}
                        onChange={(e) =>
                          setGlobalSettings({
                            ...globalSettings,
                            bandwidthLimit: parseInt(e.target.value),
                          })
                        }
                        className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-3 text-sm font-medium w-12 text-right">
                        {globalSettings.bandwidthLimit === 0 ? 'None' : globalSettings.bandwidthLimit}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Set to 0 for unlimited bandwidth
                    </div>
                  </div>

                  {/* Connection Protocol */}
                  <div>
                    <label className="block text-sm mb-2">
                      Connection Protocol
                    </label>
                    <select
                      value={globalSettings.connectionProtocol}
                      onChange={(e) =>
                        setGlobalSettings({
                          ...globalSettings,
                          connectionProtocol: e.target.value,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="rtsp">RTSP (Default)</option>
                      <option value="rtmp">RTMP</option>
                      <option value="http">HTTP/HTTPS</option>
                      <option value="webrtc">WebRTC</option>
                    </select>
                  </div>

                  {/* Network Optimization Warning */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-start">
                      <AlertTriangleIcon
                        size={16}
                        className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <div className="text-sm font-medium text-yellow-400">
                          Network Optimization
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          Lower bandwidth limits may reduce video quality. Adjusting resolution and frame rate settings is recommended for optimal performance.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calibration Tab */}
      {activeTab === 'calibration' && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Camera Calibration</h1>
            <div className="text-sm text-gray-400">
              Step {calibrationStep} of 4
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                <div
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  style={{ width: `${(calibrationStep / 4) * 100}%` }}
                ></div>
              </div>
              {/* Step Indicators */}
              <div className="flex justify-between text-xs mt-2">
                <div
                  className={`flex flex-col items-center ${calibrationStep >= 1 ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                      calibrationStep > 1
                        ? 'bg-blue-600'
                        : calibrationStep === 1
                          ? 'border-2 border-blue-600'
                          : 'border-2 border-gray-600'
                    }`}
                  >
                    {calibrationStep > 1 && <CheckIcon size={12} />}
                  </div>
                  <span>Select Camera</span>
                </div>
                <div
                  className={`flex flex-col items-center ${calibrationStep >= 2 ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                      calibrationStep > 2
                        ? 'bg-blue-600'
                        : calibrationStep === 2
                          ? 'border-2 border-blue-600'
                          : 'border-2 border-gray-600'
                    }`}
                  >
                    {calibrationStep > 2 && <CheckIcon size={12} />}
                  </div>
                  <span>Alignment</span>
                </div>
                <div
                  className={`flex flex-col items-center ${calibrationStep >= 3 ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                      calibrationStep > 3
                        ? 'bg-blue-600'
                        : calibrationStep === 3
                          ? 'border-2 border-blue-600'
                          : 'border-2 border-gray-600'
                    }`}
                  >
                    {calibrationStep > 3 && <CheckIcon size={12} />}
                  </div>
                  <span>Color/Focus</span>
                </div>
                <div
                  className={`flex flex-col items-center ${calibrationStep >= 4 ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full mb-1 flex items-center justify-center ${
                      calibrationStep === 4
                        ? 'border-2 border-blue-600'
                        : 'border-2 border-gray-600'
                    }`}
                  >
                    {calibrationStep === 4 && <CheckIcon size={12} />}
                  </div>
                  <span>Verification</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Step 1: Select Camera */}
            {calibrationStep === 1 && (
              <div>
                <div className="border-b border-gray-700 p-4">
                  <h2 className="text-lg font-medium">
                    Select Camera for Calibration
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Choose the camera you want to calibrate from the list below
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {cameras.slice(0, 6).map((camera) => (
                      <div
                        key={camera.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedCamera === camera.id
                            ? 'bg-blue-600/10 border-blue-600/30'
                            : 'bg-gray-750 border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedCamera(camera.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                            <img
                              src={camera.image}
                              alt={camera.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium text-sm">
                              {camera.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {camera.location}
                            </div>
                            <div className="flex items-center mt-1">
                              <div
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  camera.status === 'online'
                                    ? 'bg-green-400'
                                    : camera.status === 'offline'
                                      ? 'bg-red-400'
                                      : 'bg-yellow-400'
                                }`}
                              ></div>
                              <span className="text-xs text-gray-400">
                                {camera.status.charAt(0).toUpperCase() +
                                  camera.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!selectedCamera && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start">
                      <AlertTriangleIcon
                        size={16}
                        className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <div className="text-sm font-medium text-yellow-400">
                          Camera Selection Required
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          Please select a camera to proceed with calibration.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Camera Alignment */}
            {calibrationStep === 2 && (
              <div>
                <div className="border-b border-gray-700 p-4">
                  <h2 className="text-lg font-medium">Camera Alignment</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Adjust the physical position and orientation of the camera
                  </p>
                </div>
                <div className="p-6">
                  <div className="aspect-video bg-gray-900 rounded-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CameraIcon size={48} className="text-gray-700" />
                      <span className="ml-3 text-gray-600">
                        Live camera feed would appear here
                      </span>
                    </div>
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                      <div className="border-r border-b border-blue-500/30"></div>
                      <div className="border-r border-b border-blue-500/30"></div>
                      <div className="border-b border-blue-500/30"></div>
                      <div className="border-r border-b border-blue-500/30"></div>
                      <div className="border-r border-b border-blue-500/30"></div>
                      <div className="border-b border-blue-500/30"></div>
                      <div className="border-r border-blue-500/30"></div>
                      <div className="border-r border-blue-500/30"></div>
                      <div className=""></div>
                    </div>
                    {/* Center Point */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center pointer-events-none">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    </div>
                    {/* Horizon Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-500/50 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Color & Focus Calibration */}
            {calibrationStep === 3 && (
              <div>
                <div className="border-b border-gray-700 p-4">
                  <h2 className="text-lg font-medium">
                    Color & Focus Calibration
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Adjust image quality settings for optimal visual performance
                  </p>
                </div>
                <div className="p-6">
                  <div className="aspect-video bg-gray-900 rounded-lg relative flex items-center justify-center">
                    <div className="text-center">
                      <FocusIcon
                        size={48}
                        className="text-gray-700 mx-auto mb-2"
                      />
                      <span className="text-gray-600">
                        Camera feed with focus/color adjustments would
                        appear here
                      </span>
                    </div>
                    {/* Focus Target */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-blue-500/50 rounded-full pointer-events-none flex items-center justify-center">
                      <div className="w-24 h-24 border-2 border-blue-500/50 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 border-2 border-blue-500/50 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Verification */}
            {calibrationStep === 4 && (
              <div>
                <div className="border-b border-gray-700 p-4">
                  <h2 className="text-lg font-medium">
                    Calibration Verification
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Verify calibration results and save the configuration
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Before/After Comparison
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-gray-600 text-sm">
                                Before
                              </span>
                            </div>
                            <div className="absolute top-2 left-2 bg-black/50 text-xs px-1.5 py-0.5 rounded">
                              Before
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-gray-600 text-sm">
                                After
                              </span>
                            </div>
                            <div className="absolute top-2 left-2 bg-blue-600/70 text-xs px-1.5 py-0.5 rounded">
                              After
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-start">
                          <CheckCircleIcon
                            size={16}
                            className="text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          />
                          <div>
                            <div className="text-sm font-medium text-green-500">
                              Calibration Successful
                            </div>
                            <div className="text-xs text-gray-300 mt-1">
                              The camera has been successfully calibrated. You
                              can now save these settings or make additional
                              adjustments.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-750 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3">
                          Calibration Summary
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between pb-1 border-b border-gray-700">
                            <span className="text-xs text-gray-400">
                              Camera:
                            </span>
                            <span className="text-xs">Assembly Line East</span>
                          </div>
                          <div className="flex justify-between pb-1 border-b border-gray-700">
                            <span className="text-xs text-gray-400">
                              Alignment:
                            </span>
                            <span className="text-xs">
                              Pan: 0°, Tilt: -5°, Roll: 0°
                            </span>
                          </div>
                          <div className="flex justify-between pb-1 border-b border-gray-700">
                            <span className="text-xs text-gray-400">
                              Focus:
                            </span>
                            <span className="text-xs">Optimized (Auto)</span>
                          </div>
                          <div className="flex justify-between pb-1 border-b border-gray-700">
                            <span className="text-xs text-gray-400">
                              Color Balance:
                            </span>
                            <span className="text-xs">
                              Brightness: 52, Contrast: 48, Saturation: 50
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">
                              White Balance:
                            </span>
                            <span className="text-xs">Auto (5500K)</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-750 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3">
                          Save Configuration
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Configuration Name
                            </label>
                            <input
                              type="text"
                              defaultValue="Assembly Line East - Standard"
                              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="default"
                              className="mr-2"
                              defaultChecked
                            />
                            <label htmlFor="default" className="text-xs">
                              Set as default configuration
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="schedule"
                              className="mr-2"
                            />
                            <label htmlFor="schedule" className="text-xs">
                              Schedule periodic recalibration
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="border-t border-gray-700 p-4 flex justify-between">
              <button
                onClick={handlePrevCalibrationStep}
                disabled={calibrationStep === 1}
                className={`px-4 py-2 rounded-md text-sm flex items-center ${calibrationStep === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <ChevronLeftIcon size={16} className="mr-2" />
                Previous
              </button>
              {calibrationStep < 4 ? (
                <button
                  onClick={handleNextCalibrationStep}
                  disabled={calibrationStep === 1 && !selectedCamera}
                  className={`px-4 py-2 rounded-md text-sm flex items-center ${
                    calibrationStep === 1 && !selectedCamera
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Next
                  <ChevronRightIcon size={16} className="ml-2" />
                </button>
              ) : (
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm flex items-center">
                  Save Calibration
                  <SaveIcon size={16} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default CamerasPage