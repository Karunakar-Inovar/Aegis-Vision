import React, { useState, useCallback } from 'react'
import { Eye, EyeOff, Edit, Trash2, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ROIArea } from '@/types/types'
import type { 
  ROIOverlayProps, 
  ROIAreaProps, 
  ROILabelProps, 
  ROIControlsProps 
} from './ROIOverlay.types'

const ROILabel: React.FC<ROILabelProps> = ({ roi, position, className }) => (
  <div
    className={cn(
      'absolute pointer-events-none z-10 px-2 py-1 text-xs font-medium text-white bg-black bg-opacity-75 rounded whitespace-nowrap',
      className
    )}
    style={{
      left: position.x,
      top: position.y - 25,
      transform: 'translateX(-50%)',
    }}
  >
    <div className="flex items-center space-x-1">
      <Target className="w-3 h-3" />
      <span>{roi.name}</span>
      {roi.threshold && (
        <span className="text-gray-300">({(roi.threshold * 100).toFixed(0)}%)</span>
      )}
    </div>
  </div>
)

const ROIAreaComponent: React.FC<ROIAreaProps> = ({
  roi,
  scale,
  onClick,
  onHover,
  showLabel = true,
  interactive = true,
  isSelected = false,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick && interactive) {
      onClick(roi)
    }
  }, [onClick, roi, interactive])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (onHover && interactive) {
      onHover(roi)
    }
  }, [onHover, roi, interactive])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (onHover && interactive) {
      onHover(null)
    }
  }, [onHover, interactive])

  const getROITypeColor = (type: ROIArea['type']) => {
    switch (type) {
      case 'defect':
        return 'border-red-500 bg-red-500'
      case 'quality':
        return 'border-green-500 bg-green-500'
      case 'measurement':
        return 'border-blue-500 bg-blue-500'
      case 'inspection':
        return 'border-purple-500 bg-purple-500'
      default:
        return 'border-gray-500 bg-gray-500'
    }
  }

  const scaledCoords = {
    x: roi.coordinates.x * scale.x,
    y: roi.coordinates.y * scale.y,
    width: roi.coordinates.width * scale.x,
    height: roi.coordinates.height * scale.y,
  }

  const labelPosition = {
    x: scaledCoords.x + scaledCoords.width / 2,
    y: scaledCoords.y,
  }

  return (
    <>
      {/* ROI Rectangle */}
      <div
        className={cn(
          'absolute border-2 transition-all duration-200',
          getROITypeColor(roi.type),
          interactive && 'cursor-pointer hover:shadow-lg',
          !roi.isActive && 'opacity-50',
          isSelected && 'ring-2 ring-white ring-offset-2',
          isHovered && 'shadow-lg',
          className
        )}
        style={{
          left: scaledCoords.x,
          top: scaledCoords.y,
          width: scaledCoords.width,
          height: scaledCoords.height,
          backgroundColor: roi.isActive 
            ? `${roi.color || getROITypeColor(roi.type).split(' ')[1].replace('bg-', '')}20`
            : 'transparent',
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role={interactive ? 'button' : 'presentation'}
        aria-label={`ROI: ${roi.name}`}
        tabIndex={interactive ? 0 : -1}
      >
        {/* Corner indicators */}
        {isSelected && (
          <>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-gray-400 rounded-full" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-gray-400 rounded-full" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-gray-400 rounded-full" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-gray-400 rounded-full" />
          </>
        )}
      </div>

      {/* Label */}
      {showLabel && (isHovered || isSelected) && (
        <ROILabel
          roi={roi}
          position={labelPosition}
        />
      )}
    </>
  )
}

const ROIControls: React.FC<ROIControlsProps> = ({
  roiAreas,
  onToggleROI,
  onDeleteROI,
  onEditROI,
  className
}) => (
  <div className={cn('space-y-2', className)}>
    <h4 className="text-sm font-medium text-gray-900">ROI Areas</h4>
    <div className="space-y-1 max-h-40 overflow-y-auto">
      {roiAreas.map((roi) => (
        <div
          key={roi.id}
          className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50"
        >
          <div className="flex items-center space-x-2 flex-1">
            <div
              className="w-3 h-3 rounded border"
              style={{ backgroundColor: roi.color }}
            />
            <span className="text-sm text-gray-900 truncate">
              {roi.name}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {roi.type}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onToggleROI?.(roi.id)}
              className={cn(
                'p-1 rounded hover:bg-gray-200',
                roi.isActive ? 'text-green-600' : 'text-gray-400'
              )}
              title={roi.isActive ? 'Hide ROI' : 'Show ROI'}
            >
              {roi.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>
            
            <button
              onClick={() => onEditROI?.(roi)}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
              title="Edit ROI"
            >
              <Edit className="w-3 h-3" />
            </button>
            
            <button
              onClick={() => onDeleteROI?.(roi.id)}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
              title="Delete ROI"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
    
    {roiAreas.length === 0 && (
      <p className="text-sm text-gray-500 text-center py-4">
        No ROI areas defined
      </p>
    )}
  </div>
)

export const ROIOverlay: React.FC<ROIOverlayProps> = ({
  roiAreas,
  imageWidth,
  imageHeight,
  containerWidth,
  containerHeight,
  className,
  onROIClick,
  onROIHover,
  showLabels = true,
  interactive = true,
  selectedROI
}) => {
  // Calculate scale factors
  const scale = {
    x: containerWidth ? containerWidth / imageWidth : 1,
    y: containerHeight ? containerHeight / imageHeight : 1,
  }

  // Filter active ROIs
  const visibleROIs = roiAreas.filter(roi => roi.isActive)

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        className
      )}
      style={{
        width: containerWidth || imageWidth,
        height: containerHeight || imageHeight,
      }}
    >
      {visibleROIs.map((roi) => (
        <ROIAreaComponent
          key={roi.id}
          roi={roi}
          scale={scale}
          onClick={onROIClick}
          onHover={onROIHover}
          showLabel={showLabels}
          interactive={interactive}
          isSelected={selectedROI === roi.id}
          className="pointer-events-auto"
        />
      ))}
    </div>
  )
}

// Export the controls component separately
export { ROIControls }
