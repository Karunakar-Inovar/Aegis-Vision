import React, { useState, useRef, useEffect } from 'react'
import {
  ZoomInIcon,
  ZoomOutIcon,
  SaveIcon,
  TrashIcon,
  EyeIcon,
  SearchIcon,
  SquareIcon,
  CircleIcon,
  PencilIcon,
  RefreshCwIcon,
  CheckIcon,
  XIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PlusIcon,
} from 'lucide-react'

// Types
interface Point {
  x: number
  y: number
}

interface Annotation {
  id: string
  type: 'rectangle' | 'circle' | 'polygon' | 'point'
  defectType: string
  points: Point[]
  label: string
  confidence?: number
  verified: boolean
  notes?: string
  createdAt: Date
  createdBy: string
}

interface DefectType {
  id: string
  name: string
  color: string
  description?: string
}

type DrawingTool = 'select' | 'rectangle' | 'circle' | 'polygon' | 'point' | 'move'

const Annotation: React.FC = () => {
  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Image state
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageScale, setImageScale] = useState(1)
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })

  // Sample annotations to match screenshot
  const [annotations, setAnnotations] = useState<Annotation[]>([
    {
      id: '1',
      type: 'rectangle',
      defectType: 'scratch',
      points: [{ x: 200, y: 150 }, { x: 280, y: 180 }],
      label: 'Surface Scratch',
      confidence: 96,
      verified: true,
      notes: 'Deep scratch on metal surface',
      createdAt: new Date(Date.now() - 3600000),
      createdBy: 'System'
    },
    {
      id: '2',
      type: 'rectangle',
      defectType: 'dent',
      points: [{ x: 320, y: 280 }, { x: 360, y: 320 }],
      label: 'Impact Dent',
      confidence: 88,
      verified: false,
      notes: 'Circular dent, requires verification',
      createdAt: new Date(Date.now() - 1800000),
      createdBy: 'System'
    }
  ])

  // Defect types
  const defectTypes: DefectType[] = [
    { id: 'scratch', name: 'Scratch', color: '#ef4444', description: 'Surface scratches and abrasions' },
    { id: 'dent', name: 'Dent', color: '#3b82f6', description: 'Impact dents and deformations' },
    { id: 'discoloration', name: 'Discoloration', color: '#f59e0b', description: 'Color variations and stains' },
    { id: 'crack', name: 'Crack', color: '#dc2626', description: 'Cracks and fractures' },
    { id: 'missing_part', name: 'Missing Part', color: '#16a34a', description: 'Missing components or parts' },
    { id: 'misalignment', name: 'Misalignment', color: '#9333ea', description: 'Misaligned components' },
    { id: 'contamination', name: 'Contamination', color: '#ea580c', description: 'Foreign material contamination' },
    { id: 'other', name: 'Other', color: '#6b7280', description: 'Other defects not categorized' }
  ]

  // UI state
  const [activeTool, setActiveTool] = useState<DrawingTool>('select')
  const [selectedDefectType, setSelectedDefectType] = useState('scratch')
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null)
  const [showAnnotations] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDefectType] = useState<string>('all')

  // Image list
  const [currentImageIndex, setCurrentImageIndex] = useState(22) // Start at image 23 to match screenshot
  const imageList = Array.from({ length: 145 }, (_, i) => ({
    id: i + 1,
    name: `aluminium_panel_${String(i + 1).padStart(4, '0')}.jpg`,
    path: `https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80&sig=${i}`
  }))

  // Settings
  const [settings, setSettings] = useState({
    showLabels: true,
    autoSave: false,
    annotationOpacity: 0.7
  })

  // UI state
  const [activeTab, setActiveTab] = useState('annotation-tool')
  const [qualityScore] = useState(78)

  // Load image
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImage(img)
      const container = containerRef.current
      if (container) {
        const containerWidth = container.clientWidth - 256 - 288 // left sidebar (256px) + right sidebar (288px) width
        const containerHeight = container.clientHeight
        const scale = Math.min(
          (containerWidth - 100) / img.width,
          (containerHeight - 100) / img.height,
          1
        )
        setImageScale(scale)
        setImageOffset({
          x: (containerWidth - img.width * scale) / 2,
          y: (containerHeight - img.height * scale) / 2
        })
      }
    }
    img.src = imageList[currentImageIndex].path
  }, [currentImageIndex])

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw image
    ctx.drawImage(
      image,
      imageOffset.x,
      imageOffset.y,
      image.width * imageScale,
      image.height * imageScale
    )

    // Draw annotations
    if (showAnnotations) {
      annotations.forEach(annotation => {
        drawAnnotation(ctx, annotation)
      })
    }
  }, [image, imageScale, imageOffset, annotations, showAnnotations, settings])

  const drawAnnotation = (ctx: CanvasRenderingContext2D, annotation: Annotation) => {
    const defectType = defectTypes.find(dt => dt.id === annotation.defectType)
    const color = defectType?.color || '#6b7280'
    const isSelected = selectedAnnotation === annotation.id

    ctx.globalAlpha = settings.annotationOpacity
    ctx.strokeStyle = color
    ctx.fillStyle = color + '30'
    ctx.lineWidth = isSelected ? 3 : 2

    const scaledPoints = annotation.points.map(p => ({
      x: imageOffset.x + p.x * imageScale,
      y: imageOffset.y + p.y * imageScale
    }))

    switch (annotation.type) {
      case 'rectangle':
        if (scaledPoints.length >= 2) {
          const width = scaledPoints[1].x - scaledPoints[0].x
          const height = scaledPoints[1].y - scaledPoints[0].y
          ctx.fillRect(scaledPoints[0].x, scaledPoints[0].y, width, height)
          ctx.strokeRect(scaledPoints[0].x, scaledPoints[0].y, width, height)
        }
        break
      case 'circle':
        if (scaledPoints.length >= 2) {
          const radius = Math.sqrt(
            Math.pow(scaledPoints[1].x - scaledPoints[0].x, 2) +
            Math.pow(scaledPoints[1].y - scaledPoints[0].y, 2)
          )
          ctx.beginPath()
          ctx.arc(scaledPoints[0].x, scaledPoints[0].y, radius, 0, 2 * Math.PI)
          ctx.fill()
          ctx.stroke()
        }
        break
      case 'polygon':
        if (scaledPoints.length >= 3) {
          ctx.beginPath()
          ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y)
          for (let i = 1; i < scaledPoints.length; i++) {
            ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y)
          }
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        }
        break
      case 'point':
        if (scaledPoints.length >= 1) {
          ctx.beginPath()
          ctx.arc(scaledPoints[0].x, scaledPoints[0].y, 8, 0, 2 * Math.PI)
          ctx.fill()
          ctx.stroke()
        }
        break
    }

    // Draw label
    if (settings.showLabels && scaledPoints.length > 0) {
      ctx.globalAlpha = 1
      ctx.fillStyle = color
      ctx.font = '12px Inter, sans-serif'
      const labelText = annotation.label + (annotation.confidence ? ` (${annotation.confidence}%)` : '')
      const textWidth = ctx.measureText(labelText).width
      const labelX = scaledPoints[0].x
      const labelY = scaledPoints[0].y - 8

      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(labelX - 2, labelY - 12, textWidth + 4, 16)
      
      // Text
      ctx.fillStyle = 'white'
      ctx.fillText(labelText, labelX, labelY)
    }

    ctx.globalAlpha = 1
  }

  // Utility functions
  const zoomIn = () => {
    setImageScale(prev => Math.min(prev * 1.2, 5))
  }

  const zoomOut = () => {
    setImageScale(prev => Math.max(prev / 1.2, 0.1))
  }

  const resetView = () => {
    if (!image) return
    const container = containerRef.current
    if (container) {
      const containerWidth = container.clientWidth - 256 - 288
      const containerHeight = container.clientHeight
      const scale = Math.min(
        (containerWidth - 100) / image.width,
        (containerHeight - 100) / image.height,
        1
      )
      setImageScale(scale)
      setImageOffset({
        x: (containerWidth - image.width * scale) / 2,
        y: (containerHeight - image.height * scale) / 2
      })
    }
  }

  const deleteAnnotation = (id: string) => {
    setAnnotations(prev => prev.filter(a => a.id !== id))
    if (selectedAnnotation === id) {
      setSelectedAnnotation(null)
    }
  }


  // Filter annotations
  const filteredAnnotations = annotations.filter(annotation => {
    const matchesSearch = annotation.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         annotation.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterDefectType === 'all' || annotation.defectType === filterDefectType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Annotation Tools Section */}
        <div className="border-b border-gray-700 p-4">
          <h3 className="font-medium text-white mb-4">Annotation Tools</h3>
          
          {/* Defect Types */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Defect Types</h4>
            <div className="space-y-2">
              {defectTypes.slice(0, 5).map(type => (
                <div
                  key={type.id}
                  onClick={() => setSelectedDefectType(type.id)}
                  className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                    selectedDefectType === type.id ? 'bg-gray-700' : 'hover:bg-gray-750'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-sm flex-1">{type.name}</span>
                  {selectedDefectType === type.id && (
                    <CheckIcon size={16} className="text-blue-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Drawing Tools */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Drawing Tools</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { tool: 'rectangle', icon: SquareIcon, label: 'Box' },
                { tool: 'circle', icon: CircleIcon, label: 'Circle' },
                { tool: 'polygon', icon: PencilIcon, label: 'Free' },
                { tool: 'point', icon: TagIcon, label: 'Point' }
              ].map(({ tool, icon: Icon, label }) => (
                <button
                  key={tool}
                  onClick={() => setActiveTool(tool as DrawingTool)}
                  className={`p-3 rounded text-center transition-colors ${
                    activeTool === tool ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Icon size={20} className="mx-auto mb-1" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Options</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Labels</span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, showLabels: !prev.showLabels }))}
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    settings.showLabels ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      settings.showLabels ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-save</span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, autoSave: !prev.autoSave }))}
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    settings.autoSave ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col" ref={containerRef}>
        {/* Top Navigation Tabs */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="flex">
            {[
              { id: 'annotation-tool', label: 'Annotation Tool' },
              { id: 'datasets', label: 'Datasets' },
              { id: 'import', label: 'Import' },
              { id: 'export', label: 'Export' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400 bg-gray-750'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Product Annotation Tool</h1>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm flex items-center">
                <SaveIcon size={16} className="mr-2" />
                Save Annotations
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm flex items-center">
                <PlayIcon size={16} className="mr-2" />
                Next Image
              </button>
            </div>
          </div>
        </div>

        {/* Image Info and Controls */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Image: {imageList[currentImageIndex].name}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={zoomOut}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                  title="Zoom Out"
                >
                  <ZoomOutIcon size={16} />
                </button>
                <button
                  onClick={zoomIn}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                  title="Zoom In"
                >
                  <ZoomInIcon size={16} />
                </button>
                <button
                  onClick={resetView}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                  title="Reset"
                >
                  <RefreshCwIcon size={16} />
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden bg-gray-900">
          <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ 
              width: '100%', 
              height: '100%',
              cursor: activeTool === 'move' ? 'move' : activeTool === 'select' ? 'default' : 'crosshair'
            }}
          />
          
          {/* Image Navigation Overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3">
            <button
              onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
              disabled={currentImageIndex === 0}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
            >
              <ChevronLeftIcon size={16} />
            </button>
            <span className="text-sm text-white">Image {currentImageIndex + 1} of {imageList.length}</span>
            <button
              onClick={() => setCurrentImageIndex(prev => Math.min(imageList.length - 1, prev + 1))}
              disabled={currentImageIndex === imageList.length - 1}
              className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col">
        {/* Annotations Header */}
        <div className="border-b border-gray-700 p-4">
          <h3 className="font-medium text-white mb-4">Annotations</h3>
          
          {/* Search */}
          <div className="relative mb-4">
            <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search annotations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded pl-9 pr-3 py-2 text-sm"
            />
          </div>

          {/* Add Annotation Button */}
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm flex items-center justify-center mb-4">
            <PlusIcon size={16} className="mr-2" />
            Add Annotation
          </button>
        </div>

        {/* Annotations List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredAnnotations.map(annotation => {
              const defectType = defectTypes.find(dt => dt.id === annotation.defectType)
              const isSelected = selectedAnnotation === annotation.id
              
              return (
                <div
                  key={annotation.id}
                  onClick={() => setSelectedAnnotation(annotation.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-600/20 border border-blue-600/50' : 'bg-gray-750 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded mr-2 flex-shrink-0"
                        style={{ backgroundColor: defectType?.color }}
                      />
                      <span className="font-medium text-sm">{annotation.label}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <EyeIcon size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <PencilIcon size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteAnnotation(annotation.id)
                        }}
                        className="p-1 text-gray-400 hover:text-red-400"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {annotation.notes && (
                      <div className="mb-1">{annotation.notes}</div>
                    )}
                    {annotation.points.length >= 2 && (
                      <div>{Math.round(Math.abs(annotation.points[1].x - annotation.points[0].x))} x {Math.round(Math.abs(annotation.points[1].y - annotation.points[0].y))} px</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quality Assessment */}
        <div className="border-t border-gray-700 p-4">
          <h4 className="font-medium text-white mb-3">Quality Assessment</h4>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Defects Found:</span>
              <span className="text-white">{annotations.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Quality Score:</span>
              <span className="text-white">{qualityScore}/100</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm flex items-center justify-center">
              <CheckIcon size={16} className="mr-1" />
              Accept
            </button>
            <button className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm flex items-center justify-center">
              <XIcon size={16} className="mr-1" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Annotation
