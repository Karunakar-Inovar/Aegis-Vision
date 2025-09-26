import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import MainLayout from './MainLayout'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  TagIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
  EyeIcon,
  DownloadIcon,
  UploadIcon,
  InfoIcon,
  RefreshCwIcon,
  HardDriveIcon,
  DatabaseIcon,
  ServerIcon,
  CloudIcon,
  ChevronDownIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  FileTextIcon,
  ArchiveIcon,
  PackageIcon,
  SlidersIcon,
  SaveIcon,
  SquareIcon,
  CircleIcon,
} from 'lucide-react'

// Types for annotation tool
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

const DatasetsPage = () => {
  const { loading, isAuthenticated } = useAuthRedirect()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('annotation')
  
  // Canvas refs for annotation tool
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Image state for annotation tool
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageScale, setImageScale] = useState(1)
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })

  // Sample annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([
    {
      id: '1',
      type: 'rectangle',
      defectType: 'scratch',
      points: [{ x: 150, y: 120 }, { x: 230, y: 150 }],
      label: 'Surface Scratch',
      confidence: 96,
      verified: true,
      notes: 'Deep scratch on metal surface',
      createdAt: new Date(Date.now() - 3600000),
      createdBy: 'Alex Morgan'
    },
    {
      id: '2',
      type: 'circle',
      defectType: 'dent',
      points: [{ x: 340, y: 200 }, { x: 370, y: 230 }],
      label: 'Impact Dent',
      confidence: 88,
      verified: false,
      notes: 'Circular dent, requires verification',
      createdAt: new Date(Date.now() - 1800000),
      createdBy: 'Jamie Wilson'
    }
  ])

  // Defect types
  const defectTypes: DefectType[] = [
    { id: 'scratch', name: 'Scratch', color: '#ef4444', description: 'Surface scratches and abrasions' },
    { id: 'dent', name: 'Dent', color: '#3b82f6', description: 'Impact dents and deformations' },
    { id: 'discoloration', name: 'Discoloration', color: '#f59e0b', description: 'Color variations and stains' },
    { id: 'missing_part', name: 'Missing Part', color: '#16a34a', description: 'Missing components or parts' },
    { id: 'misalignment', name: 'Misalignment', color: '#9333ea', description: 'Misaligned components' }
  ]

  // UI state for annotation tool
  const [activeTool, setActiveTool] = useState<DrawingTool>('select')
  const [selectedDefectType, setSelectedDefectType] = useState('scratch')
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDefectType] = useState<string>('all')

  // Image list
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const imageList = [
    { id: 1, name: 'aluminum_panel_0023.jpg', path: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { id: 2, name: 'product_002.jpg', path: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { id: 3, name: 'product_003.jpg', path: 'https://images.unsplash.com/photo-1597149565096-4b5dbd9c3262?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }
  ]

  // Settings
  const [settings] = useState({
    showLabels: true,
    showConfidence: true,
    annotationOpacity: 0.7
  })

  // Datasets tab state
  const [datasets] = useState([
    {
      id: 'ds001',
      name: 'Aluminum Panel Inspection - Q2 2023',
      type: 'Production',
      images: 1245,
      size: '4.2 GB',
      created: '2023-05-15',
      lastModified: '2023-08-22',
      status: 'active',
      defectRate: '3.8%',
    },
    {
      id: 'ds002',
      name: 'Steel Component Analysis',
      type: 'Training',
      images: 784,
      size: '2.8 GB',
      created: '2023-06-10',
      lastModified: '2023-07-15',
      status: 'active',
      defectRate: '5.2%',
    },
    {
      id: 'ds003',
      name: 'Circuit Board Inspection',
      type: 'Validation',
      images: 423,
      size: '1.5 GB',
      created: '2023-04-20',
      lastModified: '2023-04-20',
      status: 'archived',
      defectRate: '2.1%',
    },
    {
      id: 'ds004',
      name: 'Automotive Parts - Prototype Series',
      type: 'Testing',
      images: 912,
      size: '3.4 GB',
      created: '2023-03-05',
      lastModified: '2023-09-01',
      status: 'active',
      defectRate: '7.6%',
    },
    {
      id: 'ds005',
      name: 'Precision Machined Components',
      type: 'Production',
      images: 2145,
      size: '7.8 GB',
      created: '2023-01-12',
      lastModified: '2023-08-30',
      status: 'active',
      defectRate: '1.3%',
    },
  ])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDatasetType, setSelectedDatasetType] = useState('all')
  
  // Import tab state
  const [importSource, setImportSource] = useState('local')
  const [importProgress, setImportProgress] = useState(0)
  const [importStatus, setImportStatus] = useState('idle') // idle, importing, completed, error
  
  // Export tab state
  const [selectedExportFormat, setSelectedExportFormat] = useState('json')
  const [selectedExportDataset, setSelectedExportDataset] = useState('')
  const [includeImages, setIncludeImages] = useState(true)
  const [includeAnnotations, setIncludeAnnotations] = useState(true)
  const [exportHistory, setExportHistory] = useState([
    {
      id: 'exp001',
      dataset: 'Aluminum Panel Inspection - Q2 2023',
      format: 'JSON',
      date: '2023-09-10',
      size: '215 MB',
      status: 'completed',
    },
    {
      id: 'exp002',
      dataset: 'Steel Component Analysis',
      format: 'CSV',
      date: '2023-08-25',
      size: '42 MB',
      status: 'completed',
    },
    {
      id: 'exp003',
      dataset: 'Circuit Board Inspection',
      format: 'COCO',
      date: '2023-07-12',
      size: '178 MB',
      status: 'completed',
    },
  ])

  const datasetsTabs = [
    {
      id: 'annotation',
      label: 'Annotation Tool',
    },
    {
      id: 'datasets',
      label: 'Datasets',
    },
    {
      id: 'import',
      label: 'Import',
    },
    {
      id: 'export',
      label: 'Export',
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  // Load image effect
  useEffect(() => {
    if (activeTab !== 'annotation') return
    
    const img = new Image()
    img.onload = () => {
      console.log('Image loaded:', img.width, 'x', img.height)
      setImage(img)
      setImageScale(1) // Start with original scale
      setImageOffset({ x: 0, y: 0 }) // Start with no offset
    }
    img.onerror = (error) => {
      console.error('Image failed to load:', error)
      // Try to create a placeholder canvas image
      const canvas = document.createElement('canvas')
      canvas.width = 800
      canvas.height = 600
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Draw a placeholder
        ctx.fillStyle = '#374151'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#9ca3af'
        ctx.font = '24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('Sample Product Image', canvas.width / 2, canvas.height / 2)
        ctx.fillText('(Image placeholder)', canvas.width / 2, canvas.height / 2 + 30)
        
        // Create image from canvas
        const placeholderImg = new Image()
        placeholderImg.onload = () => {
          setImage(placeholderImg)
          setImageScale(1)
          setImageOffset({ x: 0, y: 0 })
        }
        placeholderImg.src = canvas.toDataURL()
      }
    }
    img.src = imageList[currentImageIndex].path
    console.log('Loading image:', imageList[currentImageIndex].path)
  }, [currentImageIndex, activeTab])

  // Canvas drawing function
  const drawCanvas = useCallback(() => {
    if (activeTab !== 'annotation') return
    
    const canvas = canvasRef.current
    if (!canvas || !image) {
      console.log('Canvas or image not ready:', { canvas: !!canvas, image: !!image })
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get container dimensions
    const container = canvas.parentElement // Get the canvas area container
    if (!container) return

    const containerWidth = container.clientWidth - 20 // Account for padding
    const containerHeight = container.clientHeight - 20 // Account for padding

    console.log('Container size:', containerWidth, 'x', containerHeight)
    console.log('Image size:', image.width, 'x', image.height)

    // Calculate canvas size to fit image while maintaining aspect ratio
    const imageAspectRatio = image.width / image.height
    const containerAspectRatio = containerWidth / containerHeight

    let canvasWidth, canvasHeight

    if (imageAspectRatio > containerAspectRatio) {
      // Image is wider than container
      canvasWidth = Math.min(containerWidth, image.width * imageScale)
      canvasHeight = canvasWidth / imageAspectRatio
    } else {
      // Image is taller than container
      canvasHeight = Math.min(containerHeight, image.height * imageScale)
      canvasWidth = canvasHeight * imageAspectRatio
    }

    // Ensure reasonable size
    canvasWidth = Math.max(Math.min(canvasWidth, containerWidth), 300)
    canvasHeight = Math.max(Math.min(canvasHeight, containerHeight), 200)

    console.log('Canvas size:', canvasWidth, 'x', canvasHeight)

    // Set canvas size
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'

    // Clear canvas with a background color for debugging
    ctx.fillStyle = '#374151' // gray-700
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw image to fill the canvas
    try {
      ctx.drawImage(image, imageOffset.x, imageOffset.y, canvasWidth, canvasHeight)
      console.log('Image drawn successfully')
    } catch (error) {
      console.error('Error drawing image:', error)
    }

    // Draw annotations
    if (showAnnotations) {
      annotations.forEach(annotation => {
        drawAnnotation(ctx, annotation)
      })
    }
  }, [activeTab, image, imageScale, imageOffset, annotations, showAnnotations, settings])

  // Canvas drawing effect
  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // Resize observer to redraw canvas when container size changes
  useEffect(() => {
    if (activeTab !== 'annotation') return

    const canvas = canvasRef.current
    if (!canvas) return

    const container = canvas.parentElement
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      // Debounce the redraw
      setTimeout(drawCanvas, 50)
    })

    resizeObserver.observe(container)

    // Also observe window resize
    const handleResize = () => {
      setTimeout(drawCanvas, 50)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [activeTab, drawCanvas])

  const drawAnnotation = (ctx: CanvasRenderingContext2D, annotation: Annotation) => {
    const defectType = defectTypes.find(dt => dt.id === annotation.defectType)
    const color = defectType?.color || '#6b7280'
    const isSelected = selectedAnnotation === annotation.id

    ctx.globalAlpha = settings.annotationOpacity
    ctx.strokeStyle = color
    ctx.fillStyle = color + '30'
    ctx.lineWidth = isSelected ? 3 : 2

    // Scale annotation points to canvas size
    const canvas = ctx.canvas
    const scaleX = canvas.width / (image?.width || 1)
    const scaleY = canvas.height / (image?.height || 1)
    
    const scaledPoints = annotation.points.map(p => ({
      x: imageOffset.x + p.x * scaleX,
      y: imageOffset.y + p.y * scaleY
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
      const labelText = annotation.label + (settings.showConfidence && annotation.confidence ? ` (${annotation.confidence}%)` : '')
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
      const containerWidth = container.clientWidth - 320
      const containerHeight = container.clientHeight - 200
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

  // Filter datasets based on search and type
  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesType =
      selectedDatasetType === 'all' ||
      dataset.type.toLowerCase() === selectedDatasetType.toLowerCase()
    return matchesSearch && matchesType
  })

  // Simulate starting an import
  const handleStartImport = () => {
    setImportStatus('importing')
    setImportProgress(0)
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setImportStatus('completed')
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Simulate export
  const handleExport = () => {
    if (!selectedExportDataset) return
    const newExport = {
      id: `exp${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`,
      dataset:
        datasets.find((d) => d.id === selectedExportDataset)?.name ||
        'Unknown Dataset',
      format: selectedExportFormat.toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      size: `${Math.floor(Math.random() * 200 + 50)} MB`,
      status: 'completed',
    }
    setExportHistory([newExport, ...exportHistory])
  }



  // Filter annotations
  const filteredAnnotations = annotations.filter(annotation => {
    const matchesSearch = annotation.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         annotation.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterDefectType === 'all' || annotation.defectType === filterDefectType
    return matchesSearch && matchesFilter
  })

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white text-lg">Loading datasets...</p>
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
      activeModule={location.pathname === '/annotation' ? 'annotation' : 'datasets'}
      tabs={datasetsTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'annotation' && (
        <div className="space-y-6" ref={containerRef}>
          {/* Top Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Product Annotation Tool</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center text-white">
                <SaveIcon size={16} className="mr-2" />
                Save Annotations
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm flex items-center text-white">
                Next Image
              </button>
            </div>
          </div>
          
          {/* Main Layout - Three Columns */}
          <div className="flex h-[calc(100vh-280px)] min-h-[600px] bg-gray-900 rounded-lg overflow-hidden gap-1">
            {/* Left Sidebar - Annotation Tools */}
            <div className="w-80 bg-gray-800 flex flex-col rounded-l-lg">
              {/* Header - Fixed */}
              <div className="p-4 border-b border-gray-700 flex-shrink-0">
                <h3 className="text-lg font-medium text-white">Annotation Tools</h3>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Defect Types */}
                <div className="p-4 border-b border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Defect Types</h4>
                  <div className="space-y-2">
                    {defectTypes.map(defectType => (
                      <button
                        key={defectType.id}
                        onClick={() => setSelectedDefectType(defectType.id)}
                        className={`w-full px-3 py-2.5 rounded text-sm flex items-center space-x-3 transition-colors ${
                          selectedDefectType === defectType.id
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-900 hover:bg-gray-700 text-gray-300'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: defectType.color }}
                        />
                        <span className="flex-1 text-left">{defectType.name}</span>
                        {selectedDefectType === defectType.id && <CheckIcon size={14} className="text-blue-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Drawing Tools */}
                <div className="p-4 border-b border-gray-700">
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
                        className={`p-3 rounded flex flex-col items-center space-y-1 transition-colors ${
                          activeTool === tool ? 'bg-gray-700 text-white' : 'bg-gray-900 hover:bg-gray-700 text-gray-300'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-xs">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Options</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Show Labels</span>
                      <button
                        onClick={() => setShowAnnotations(!showAnnotations)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          showAnnotations ? 'bg-blue-600' : 'bg-gray-600'
                        } relative`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                            showAnnotations ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Auto-save</span>
                      <button className="w-12 h-6 rounded-full bg-gray-600 relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle - Image Canvas */}
            <div className="flex-1 flex flex-col bg-gray-800 min-w-0">
              {/* Image Header */}
              <div className="p-4 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                <span className="text-white font-medium truncate mr-4">Image: {imageList[currentImageIndex].name}</span>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={zoomIn}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300"
                  >
                    Zoom In
                  </button>
                  <button
                    onClick={zoomOut}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300"
                  >
                    Zoom Out
                  </button>
                  <button
                    onClick={resetView}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Canvas Area */}
              <div className="flex-1 relative bg-gray-700 flex items-center justify-center p-4">
                {!image && (
                  <div className="text-center text-gray-400">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p>Loading image...</p>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className={`border border-gray-600 rounded ${!image ? 'hidden' : ''}`}
                  style={{ 
                    cursor: activeTool === 'move' ? 'move' : activeTool === 'select' ? 'default' : 'crosshair',
                    backgroundColor: '#374151'
                  }}
                />

                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm flex items-center space-x-4 z-10">
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentImageIndex === 0}
                    className="text-gray-300 hover:text-white disabled:opacity-50 p-1"
                  >
                    ←
                  </button>
                  <span className="text-white">Image {currentImageIndex + 1} of {imageList.length}</span>
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.min(imageList.length - 1, prev + 1))}
                    disabled={currentImageIndex === imageList.length - 1}
                    className="text-gray-300 hover:text-white disabled:opacity-50 p-1"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Annotations */}
            <div className="w-80 bg-gray-800 flex flex-col rounded-r-lg">
              {/* Annotations Header - Fixed */}
              <div className="p-4 border-b border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Annotations</h3>
                </div>

                {/* Search */}
                <div className="relative">
                  <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search annotations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Annotations List - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <div className="space-y-3">
                    {filteredAnnotations.map(annotation => {
                      const defectType = defectTypes.find(dt => dt.id === annotation.defectType)
                      
                      return (
                        <div
                          key={annotation.id}
                          onClick={() => setSelectedAnnotation(annotation.id)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors bg-gray-700 hover:bg-gray-600`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center min-w-0">
                              <div
                                className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
                                style={{ backgroundColor: defectType?.color }}
                              />
                              <span className="font-medium text-sm text-white truncate">{annotation.label}</span>
                            </div>
                            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                              <EyeIcon size={14} className="text-gray-400" />
                              <PencilIcon size={14} className="text-gray-400" />
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

                          <div className="text-xs text-gray-400">
                            <span>{annotation.points.length > 1 ? `${Math.round(Math.abs(annotation.points[1]?.x - annotation.points[0]?.x) || 0)} x ${Math.round(Math.abs(annotation.points[1]?.y - annotation.points[0]?.y) || 0)} px` : 'No dimensions'}</span>
                          </div>

                          {annotation.notes && (
                            <div className="mt-2 text-xs text-gray-300 bg-gray-800 rounded p-2">
                              {annotation.notes}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Add Annotation Button */}
                  <button className="w-full mt-4 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white flex items-center justify-center">
                    + Add Annotation
                  </button>
                </div>
              </div>

              {/* Quality Assessment - Fixed at bottom */}
              <div className="border-t border-gray-700 p-4 flex-shrink-0">
                <h4 className="font-medium mb-3 text-white">Quality Assessment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Defects Found:</span>
                    <span className="font-medium text-white">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quality Score:</span>
                    <span className="font-medium text-yellow-400">78/100</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm flex items-center justify-center text-white">
                    <CheckIcon size={16} className="mr-1" />
                    Accept
                  </button>
                  <button className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm flex items-center justify-center text-white">
                    <XIcon size={16} className="mr-1" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'datasets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dataset Management</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center">
                <PlusIcon size={16} className="mr-2" />
                New Dataset
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm flex items-center">
                <RefreshCwIcon size={16} className="mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md pl-10 pr-4 py-2 text-sm"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={selectedDatasetType}
                  onChange={(e) => setSelectedDatasetType(e.target.value)}
                  className="appearance-none bg-gray-700 border border-gray-600 rounded-md pl-3 pr-10 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="production">Production</option>
                  <option value="training">Training</option>
                  <option value="validation">Validation</option>
                  <option value="testing">Testing</option>
              </select>
                <ChevronDownIcon
                  size={16}
                  className="absolute right-3 top-2.5 text-gray-400"
                />
              </div>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm flex items-center">
                <FilterIcon size={16} className="mr-2" />
                More Filters
              </button>
            </div>
          </div>

          {/* Datasets Table */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 p-4">
              <h3 className="font-medium">
                Available Datasets ({filteredDatasets.length})
              </h3>
            </div>
            
            {/* Dataset Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Images</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Defect Rate</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Modified</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredDatasets.map((dataset) => (
                    <tr key={dataset.id} className="hover:bg-gray-750">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <DatabaseIcon
                            size={16}
                            className="text-blue-400 mr-2"
                          />
                          <span>{dataset.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{dataset.type}</td>
                      <td className="py-3 px-4 text-sm">
                        {dataset.images.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm">{dataset.size}</td>
                      <td className="py-3 px-4 text-sm">
                        {dataset.defectRate}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {dataset.lastModified}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dataset.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                        >
                          {dataset.status === 'active' ? 'Active' : 'Archived'}
          </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            className="p-1 text-gray-400 hover:text-white"
                            title="View"
                          >
                            <EyeIcon size={16} />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-white"
                            title="Edit"
                          >
                            <PencilIcon size={16} />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-white"
                            title="Export"
                          >
                            <DownloadIcon size={16} />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-white"
                            title="Delete"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredDatasets.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <DatabaseIcon size={40} className="mx-auto mb-2 opacity-50" />
                <p>No datasets match your search criteria</p>
              </div>
            )}
          </div>

          {/* Bottom Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Storage Usage */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Storage Usage</h3>
              <div className="space-y-3">
                <div className="flex items-end space-x-2">
                  <span className="text-2xl font-bold text-white">19.7 GB</span>
                  <span className="text-sm text-gray-400 mb-1">of 50 GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '39.4%' }}></div>
                </div>
                <p className="text-xs text-gray-400">39.4% of available storage used</p>
              </div>
            </div>

            {/* Total Images */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Total Images</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-white">5,509</span>
                  <div className="flex items-center text-green-400 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +245 this month
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Labeled</div>
                    <div className="text-lg font-semibold text-white">4,218</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Unlabeled</div>
                    <div className="text-lg font-semibold text-white">1,291</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Verified</div>
                    <div className="text-lg font-semibold text-white">3,845</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dataset Health */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Dataset Health</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Quality Score</span>
                  <span className="text-lg font-semibold text-green-400">92/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Completeness</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">95%</span>
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Diversity</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">88%</span>
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Balance</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">84%</span>
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'import' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Import Data</h1>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm flex items-center">
              <InfoIcon size={16} className="mr-2" />
              Import Guidelines
            </button>
          </div>

          {/* Import Sources */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 p-4">
              <h3 className="font-medium">Select Import Source</h3>
                  </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  className={`flex items-center p-4 rounded-lg border-2 ${importSource === 'local' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-750'}`}
                  onClick={() => setImportSource('local')}
                >
                  <div className="p-3 bg-blue-500/20 rounded-full mr-3">
                    <HardDriveIcon size={20} className="text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium mb-1">Local Files</div>
                    <div className="text-xs text-gray-400">
                      Import from your computer
                </div>
              </div>
                </button>
                <button
                  className={`flex items-center p-4 rounded-lg border-2 ${importSource === 'cloud' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-750'}`}
                  onClick={() => setImportSource('cloud')}
                >
                  <div className="p-3 bg-purple-500/20 rounded-full mr-3">
                    <CloudIcon size={20} className="text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium mb-1">Cloud Storage</div>
                    <div className="text-xs text-gray-400">
                      Import from cloud services
                  </div>
                </div>
                </button>
                <button
                  className={`flex items-center p-4 rounded-lg border-2 ${importSource === 'server' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600 hover:bg-gray-750'}`}
                  onClick={() => setImportSource('server')}
                >
                  <div className="p-3 bg-green-500/20 rounded-full mr-3">
                    <ServerIcon size={20} className="text-green-400" />
              </div>
                  <div className="text-left">
                    <div className="font-medium mb-1">Remote Server</div>
                    <div className="text-xs text-gray-400">
                      Import from remote location
                  </div>
                  </div>
                </button>
                </div>

              {/* Local Files Import */}
              {importSource === 'local' && (
                <div className="space-y-5">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                    <UploadIcon
                      size={40}
                      className="mx-auto mb-4 text-gray-500"
                    />
                    <div className="mb-3">
                      <div className="text-lg font-medium">
                        Drag and drop files here
              </div>
                      <div className="text-sm text-gray-400 mt-1">
                        or click to browse your files
            </div>
          </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm inline-flex items-center">
                      <UploadIcon size={16} className="mr-2" />
                Browse Files
              </button>
                    <div className="text-xs text-gray-500 mt-4">
                      Supports JPG, PNG, TIFF images and JSON, XML, CSV
                      annotation files
            </div>
          </div>
                  <div className="bg-gray-750 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-3">Import Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="create-new-dataset"
                          className="mr-2"
                          checked
                        />
                        <label htmlFor="create-new-dataset" className="text-sm">
                          Create new dataset
              </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="extract-metadata"
                          className="mr-2"
                          checked
                        />
                        <label htmlFor="extract-metadata" className="text-sm">
                          Extract EXIF metadata
              </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="auto-tag" className="mr-2" />
                        <label htmlFor="auto-tag" className="text-sm">
                          Auto-tag images using AI
              </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="validate-annotations"
                          className="mr-2"
                          checked
                        />
                        <label
                          htmlFor="validate-annotations"
                          className="text-sm"
                        >
                          Validate annotation format
              </label>
            </div>
                    </div>
                  </div>
                  {importStatus === 'idle' ? (
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
                        onClick={handleStartImport}
                      >
                Start Import
              </button>
                    </div>
                  ) : importStatus === 'importing' ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Importing data...</span>
                        <span>{importProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${importProgress}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Processed: 245 files</span>
                        <span>Remaining: ~2 minutes</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-start">
                      <CheckCircleIcon
                        size={20}
                        className="text-green-400 mr-3 mt-0.5 flex-shrink-0"
                      />
                  <div>
                        <div className="font-medium">
                          Import Completed Successfully
                  </div>
                        <div className="text-sm text-gray-300 mt-1">
                          512 files were imported and added to dataset "New
                          Import - 09/15/2023"
                </div>
                        <div className="mt-3 flex space-x-3">
                          <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs">
                            View Dataset
                          </button>
                          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs">
                            Start Annotation
                          </button>
              </div>
            </div>
          </div>
                  )}
              </div>
              )}
              {/* Cloud Storage Import */}
              {importSource === 'cloud' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <button className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2965/2965327.png"
                        alt="Google Drive"
                        className="w-10 h-10 mx-auto mb-2"
                      />
                      <div className="font-medium">Google Drive</div>
              </button>
                    <button className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/732/732349.png"
                        alt="OneDrive"
                        className="w-10 h-10 mx-auto mb-2"
                      />
                      <div className="font-medium">OneDrive</div>
                    </button>
                    <button className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/873/873120.png"
                        alt="Dropbox"
                        className="w-10 h-10 mx-auto mb-2"
                      />
                      <div className="font-medium">Dropbox</div>
                    </button>
                  </div>
                  <div className="bg-gray-750 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-400">
                      Select a cloud storage provider to continue
                    </div>
                  </div>
                </div>
              )}
              {/* Remote Server Import */}
              {importSource === 'server' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Server URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://server.example.com/api/data"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        API Key
                      </label>
                      <input
                        type="password"
                        placeholder="Enter API key"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">
                      Connect to Server
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Imports */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 p-4 flex justify-between items-center">
              <h3 className="font-medium">Recent Imports</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View All
              </button>
            </div>
            <div className="divide-y divide-gray-700">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500/20 rounded-full mr-3">
                    <CheckCircleIcon size={16} className="text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium">Circuit Board Images</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      423 files • 1.5 GB • 2023-09-10
                  </div>
                </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-white">
                  <EyeIcon size={16} />
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500/20 rounded-full mr-3">
                    <CheckCircleIcon size={16} className="text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium">Steel Component Batch #45</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      218 files • 784 MB • 2023-09-05
                  </div>
                </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-white">
                  <EyeIcon size={16} />
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-red-500/20 rounded-full mr-3">
                    <AlertCircleIcon size={16} className="text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium">Automotive Parts Import</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Failed • 2023-08-28
                  </div>
                </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-white">
                  <EyeIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Export Data</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center">
                <DownloadIcon size={16} className="mr-2" />
                Start Export
              </button>
            </div>
          </div>
          {/* Export Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Export Settings */}
            <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 p-4">
                <h3 className="font-medium">Export Settings</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Dataset
                  </label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                    value={selectedExportDataset}
                    onChange={(e) => setSelectedExportDataset(e.target.value)}
                  >
                    <option value="">-- Select a dataset --</option>
                    {datasets.map((dataset) => (
                      <option key={dataset.id} value={dataset.id}>
                        {dataset.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Export Format
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      className={`p-3 flex flex-col items-center rounded-lg border ${selectedExportFormat === 'json' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-750'}`}
                      onClick={() => setSelectedExportFormat('json')}
                    >
                      <FileTextIcon size={24} className="mb-2" />
                      <span className="text-sm font-medium">JSON</span>
                    </button>
                    <button
                      className={`p-3 flex flex-col items-center rounded-lg border ${selectedExportFormat === 'csv' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-750'}`}
                      onClick={() => setSelectedExportFormat('csv')}
                    >
                      <FileTextIcon size={24} className="mb-2" />
                      <span className="text-sm font-medium">CSV</span>
                    </button>
                    <button
                      className={`p-3 flex flex-col items-center rounded-lg border ${selectedExportFormat === 'coco' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-750'}`}
                      onClick={() => setSelectedExportFormat('coco')}
                    >
                      <ArchiveIcon size={24} className="mb-2" />
                      <span className="text-sm font-medium">COCO</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Export Options
                  </label>
                  <div className="space-y-3 bg-gray-750 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Include Images</span>
                      <div
                        className={`w-10 h-5 ${includeImages ? 'bg-blue-600' : 'bg-gray-600'} rounded-full relative cursor-pointer`}
                        onClick={() => setIncludeImages(!includeImages)}
                      >
                        <div
                          className={`absolute ${includeImages ? 'right-0.5' : 'left-0.5'} top-0.5 bg-white w-4 h-4 rounded-full transition-all`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Include Annotations</span>
                      <div
                        className={`w-10 h-5 ${includeAnnotations ? 'bg-blue-600' : 'bg-gray-600'} rounded-full relative cursor-pointer`}
                        onClick={() =>
                          setIncludeAnnotations(!includeAnnotations)
                        }
                      >
                        <div
                          className={`absolute ${includeAnnotations ? 'right-0.5' : 'left-0.5'} top-0.5 bg-white w-4 h-4 rounded-full transition-all`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Include Metadata</span>
                      <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compress Output</span>
                      <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Advanced Settings
                  </label>
                  <div className="bg-gray-750 p-4 rounded-lg">
                    <button className="flex items-center text-sm text-gray-300 hover:text-white">
                      <SlidersIcon size={14} className="mr-2" />
                      Configure Advanced Export Settings
                    </button>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    className={`px-6 py-2 rounded-md text-sm ${selectedExportDataset ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
                    disabled={!selectedExportDataset}
                    onClick={handleExport}
                  >
                    <DownloadIcon size={16} className="mr-2 inline-block" />
                    Export Dataset
                  </button>
                </div>
              </div>
            </div>
            {/* Export History */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 p-4">
                <h3 className="font-medium">Export History</h3>
              </div>
              <div className="divide-y divide-gray-700 max-h-[500px] overflow-y-auto">
                {exportHistory.length > 0 ? (
                  exportHistory.map((export_item) => (
                    <div key={export_item.id} className="p-4 hover:bg-gray-750">
                      <div className="flex items-start">
                        <div className="p-2 bg-green-500/20 rounded-full mr-3">
                          <DownloadIcon size={16} className="text-green-400" />
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">
                            {export_item.dataset}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {export_item.format} • {export_item.size} •{' '}
                            {export_item.date}
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs">
                              Download
                            </button>
                            <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <DownloadIcon
                      size={32}
                      className="mx-auto mb-2 opacity-50"
                    />
                    <p>No export history available</p>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-700 p-4">
                <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm">
                  View All Exports
                </button>
              </div>
            </div>
          </div>
          {/* Export Destinations */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 p-4">
              <h3 className="font-medium">Export Destinations</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 text-center">
                  <HardDriveIcon
                    size={24}
                    className="mx-auto mb-2 text-blue-400"
                  />
                  <div className="font-medium">Local Storage</div>
                </button>
                <button className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 text-center">
                  <CloudIcon
                    size={24}
                    className="mx-auto mb-2 text-purple-400"
                  />
                  <div className="font-medium">Cloud Storage</div>
                </button>
                <button className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 text-center">
                  <ServerIcon
                    size={24}
                    className="mx-auto mb-2 text-green-400"
                  />
                  <div className="font-medium">Remote Server</div>
                </button>
                <button className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 text-center">
                  <PackageIcon
                    size={24}
                    className="mx-auto mb-2 text-yellow-400"
                  />
                  <div className="font-medium">Model Training</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default DatasetsPage
