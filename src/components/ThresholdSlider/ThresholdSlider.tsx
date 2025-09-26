import React, { useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { 
  ThresholdSliderProps, 
  ThresholdRangeProps, 
  ThresholdDisplayProps,
  ThresholdMark 
} from './ThresholdSlider.types'

const ThresholdDisplay: React.FC<ThresholdDisplayProps> = ({
  value,
  min,
  max,
  unit,
  color,
  size = 'md',
  className
}) => {
  const percentage = ((value - min) / (max - min)) * 100
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  
  const getColorClass = () => {
    if (color) return `text-${color}-600`
    if (percentage >= 80) return 'text-red-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className={cn(
      'flex items-center space-x-2',
      sizeClasses[size],
      className
    )}>
      <span className={cn('font-semibold', getColorClass())}>
        {typeof value === 'number' ? value.toFixed(2) : value}
      </span>
      {unit && (
        <span className="text-gray-500 text-sm">
          {unit}
        </span>
      )}
    </div>
  )
}

export const ThresholdSlider: React.FC<ThresholdSliderProps> = ({
  value,
  min,
  max,
  step = 0.01,
  unit,
  label,
  description,
  onChange,
  onChangeCommitted,
  className,
  disabled = false,
  color = 'primary',
  showValue = true,
  showMarks = false,
  marks = [],
  size = 'md'
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const percentage = ((value - min) / (max - min)) * 100

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
  }

  const sizeClasses = {
    sm: {
      track: 'h-2',
      thumb: 'w-4 h-4',
      container: 'py-2'
    },
    md: {
      track: 'h-3',
      thumb: 'w-5 h-5',
      container: 'py-3'
    },
    lg: {
      track: 'h-4',
      thumb: 'w-6 h-6',
      container: 'py-4'
    }
  }

  const updateValue = useCallback((clientX: number) => {
    if (!sliderRef.current || disabled) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newValue = min + percentage * (max - min)
    const steppedValue = Math.round(newValue / step) * step
    const clampedValue = Math.max(min, Math.min(max, steppedValue))

    onChange(clampedValue)
  }, [min, max, step, onChange, disabled])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return
    
    setIsDragging(true)
    updateValue(e.clientX)
    
    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientX)
    }
    
    const handleMouseUp = () => {
      setIsDragging(false)
      if (onChangeCommitted) {
        onChangeCommitted(value)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [updateValue, disabled, onChangeCommitted, value])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return
    
    let newValue = value
    const stepSize = (max - min) * 0.01 // 1% of range
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + stepSize)
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - stepSize)
        break
      case 'Home':
        newValue = min
        break
      case 'End':
        newValue = max
        break
      default:
        return
    }
    
    e.preventDefault()
    onChange(newValue)
    
    if (onChangeCommitted) {
      onChangeCommitted(newValue)
    }
  }, [value, min, max, onChange, onChangeCommitted, disabled])

  return (
    <div className={cn('w-full', className)}>
      {/* Label and Value */}
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {showValue && (
            <ThresholdDisplay
              value={value}
              min={min}
              max={max}
              unit={unit}
              size={size}
            />
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 mb-3">
          {description}
        </p>
      )}

      {/* Slider */}
      <div className={cn('relative', sizeClasses[size].container)}>
        <div
          ref={sliderRef}
          className={cn(
            'relative w-full bg-gray-200 rounded-full cursor-pointer',
            sizeClasses[size].track,
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onMouseDown={handleMouseDown}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label || 'Threshold slider'}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
        >
          {/* Progress track */}
          <div
            className={cn(
              'absolute top-0 left-0 h-full rounded-full transition-all duration-150',
              colorClasses[color],
              disabled && 'opacity-50'
            )}
            style={{ width: `${percentage}%` }}
          />

          {/* Marks */}
          {showMarks && marks.map((mark) => {
            const markPercentage = ((mark.value - min) / (max - min)) * 100
            return (
              <div
                key={mark.value}
                className="absolute top-0 w-0.5 h-full bg-gray-400"
                style={{ left: `${markPercentage}%` }}
              >
                <div className="absolute top-full mt-1 text-xs text-gray-500 transform -translate-x-1/2 whitespace-nowrap">
                  {mark.label}
                </div>
              </div>
            )
          })}

          {/* Thumb */}
          <div
            className={cn(
              'absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white shadow-md transition-all duration-150',
              sizeClasses[size].thumb,
              colorClasses[color],
              isDragging && 'scale-110',
              disabled ? 'cursor-not-allowed' : 'cursor-grab hover:scale-105',
              isDragging && 'cursor-grabbing'
            )}
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

export const ThresholdRange: React.FC<ThresholdRangeProps> = ({
  values,
  min,
  max,
  step = 0.01,
  unit,
  labels = ['Min', 'Max'],
  onChange,
  onChangeCommitted,
  className,
  disabled = false,
  color = 'primary'
}) => {
  const [activeThumb, setActiveThumb] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const [minValue, maxValue] = values
  const minPercentage = ((minValue - min) / (max - min)) * 100
  const maxPercentage = ((maxValue - min) / (max - min)) * 100

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
  }

  const updateValue = useCallback((clientX: number, thumbIndex: number) => {
    if (!sliderRef.current || disabled) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newValue = min + percentage * (max - min)
    const steppedValue = Math.round(newValue / step) * step

    let newValues: [number, number]
    if (thumbIndex === 0) {
      // Min thumb - ensure it doesn't go above max
      const clampedValue = Math.max(min, Math.min(maxValue, steppedValue))
      newValues = [clampedValue, maxValue]
    } else {
      // Max thumb - ensure it doesn't go below min
      const clampedValue = Math.max(minValue, Math.min(max, steppedValue))
      newValues = [minValue, clampedValue]
    }

    onChange(newValues)
  }, [min, max, step, minValue, maxValue, onChange, disabled])

  const handleMouseDown = useCallback((e: React.MouseEvent, thumbIndex: number) => {
    if (disabled) return
    
    e.preventDefault()
    setActiveThumb(thumbIndex)
    updateValue(e.clientX, thumbIndex)
    
    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientX, thumbIndex)
    }
    
    const handleMouseUp = () => {
      setActiveThumb(null)
      if (onChangeCommitted) {
        onChangeCommitted(values)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [updateValue, disabled, onChangeCommitted, values])

  return (
    <div className={cn('w-full', className)}>
      {/* Value displays */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">{labels[0]}</div>
          <ThresholdDisplay
            value={minValue}
            min={min}
            max={max}
            unit={unit}
            size="sm"
          />
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">{labels[1]}</div>
          <ThresholdDisplay
            value={maxValue}
            min={min}
            max={max}
            unit={unit}
            size="sm"
          />
        </div>
      </div>

      {/* Slider */}
      <div className="relative py-3">
        <div
          ref={sliderRef}
          className={cn(
            'relative w-full h-3 bg-gray-200 rounded-full',
            disabled && 'opacity-50'
          )}
        >
          {/* Active range */}
          <div
            className={cn(
              'absolute top-0 h-full rounded-full',
              colorClasses[color],
              disabled && 'opacity-50'
            )}
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />

          {/* Min thumb */}
          <div
            className={cn(
              'absolute top-1/2 w-5 h-5 transform -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white shadow-md transition-all duration-150',
              colorClasses[color],
              activeThumb === 0 && 'scale-110',
              disabled ? 'cursor-not-allowed' : 'cursor-grab hover:scale-105',
              activeThumb === 0 && 'cursor-grabbing'
            )}
            style={{ left: `${minPercentage}%` }}
            onMouseDown={(e) => handleMouseDown(e, 0)}
          />

          {/* Max thumb */}
          <div
            className={cn(
              'absolute top-1/2 w-5 h-5 transform -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white shadow-md transition-all duration-150',
              colorClasses[color],
              activeThumb === 1 && 'scale-110',
              disabled ? 'cursor-not-allowed' : 'cursor-grab hover:scale-105',
              activeThumb === 1 && 'cursor-grabbing'
            )}
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={(e) => handleMouseDown(e, 1)}
          />
        </div>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

export default ThresholdSlider
