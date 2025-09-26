import React, { useState } from 'react'
import { PageWrapper } from '@/components/Layout/PageWrapper'
import { ROIOverlay, ROIControls } from '@/components/ROIOverlay/ROIOverlay'
import { Play, Pause, Square, Settings, Camera } from 'lucide-react'
import { mockInspections, mockROIAreas } from '@/mock/inspectionData'
import type { ROIArea, Inspection } from '@/types/types'

export const InspectionScreen: React.FC = () => {
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(mockInspections[0])
  const [roiAreas, setROIAreas] = useState<ROIArea[]>(mockROIAreas)
  const [selectedROI, setSelectedROI] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)

  const handleROIClick = (roi: ROIArea) => {
    setSelectedROI(roi.id === selectedROI ? '' : roi.id)
  }

  const handleToggleROI = (roiId: string) => {
    setROIAreas(areas => 
      areas.map((area: ROIArea) => 
        area.id === roiId ? { ...area, isActive: !area.isActive } : area
      )
    )
  }

  return (
    <PageWrapper title="Inspection">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Main Inspection View */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-4">
              <select
                value={selectedInspection?.id || ''}
                onChange={(e) => {
                  const inspection = mockInspections.find(i => i.id === e.target.value)
                  setSelectedInspection(inspection || null)
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select inspection...</option>
                {mockInspections.map((inspection: Inspection) => (
                  <option key={inspection.id} value={inspection.id}>
                    {inspection.name}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    isRunning 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRunning ? 'Pause' : 'Start'}</span>
                </button>
                
                <button
                  onClick={() => setIsRunning(false)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isRunning 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {isRunning ? 'Running' : 'Stopped'}
              </span>
              
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Camera Feed */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="relative">
              {/* Mock camera feed */}
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative">
                <div className="text-white text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Live Camera Feed</p>
                  <p className="text-sm opacity-50">
                    {selectedInspection ? `Camera: ${selectedInspection.cameraId}` : 'No inspection selected'}
                  </p>
                </div>

                {/* ROI Overlay */}
                <ROIOverlay
                  roiAreas={roiAreas}
                  imageWidth={1920}
                  imageHeight={1080}
                  containerWidth={800}
                  containerHeight={450}
                  onROIClick={handleROIClick}
                  selectedROI={selectedROI}
                  showLabels={true}
                  interactive={true}
                />
              </div>

              {/* Status overlay */}
              {isRunning && (
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm">Recording</span>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          {selectedInspection && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedInspection.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedInspection.totalRuns}</div>
                  <div className="text-sm text-gray-600">Total Runs</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedInspection.lastRun ? new Date(selectedInspection.lastRun).toLocaleTimeString() : 'Never'}
                  </div>
                  <div className="text-sm text-gray-600">Last Run</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ROI Controls Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <ROIControls
              roiAreas={roiAreas}
              onToggleROI={handleToggleROI}
              onDeleteROI={(roiId) => {
                setROIAreas(areas => areas.filter(area => area.id !== roiId))
              }}
              onEditROI={(roi) => {
                console.log('Edit ROI:', roi)
              }}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
