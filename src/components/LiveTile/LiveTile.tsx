import React from 'react'
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react'
import { cn, formatTimestamp } from '@/lib/utils'
import type { LiveTileProps, TrendIndicatorProps, StatusIndicatorProps } from './LiveTile.types'

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, className }) => {
  const statusConfig = {
    success: 'bg-green-100 border-green-200',
    warning: 'bg-yellow-100 border-yellow-200',
    error: 'bg-red-100 border-red-200',
    info: 'bg-blue-100 border-blue-200'
  }

  return (
    <div className={cn(
      'absolute top-2 right-2 w-3 h-3 rounded-full border-2',
      statusConfig[status],
      className
    )} />
  )
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ trend, value, className }) => {
  const trendConfig = {
    up: {
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    down: {
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    stable: {
      icon: Minus,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  }

  const config = trendConfig[trend]
  const Icon = config.icon

  return (
    <div className={cn(
      'flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium',
      config.color,
      config.bgColor,
      className
    )}>
      <Icon className="w-3 h-3" />
      {value !== undefined && (
        <span>
          {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
          {Math.abs(value)}
          {typeof value === 'number' && value % 1 !== 0 ? '' : ''}
        </span>
      )}
    </div>
  )
}

export const LiveTile: React.FC<LiveTileProps> = ({
  id,
  title,
  value,
  unit,
  status,
  trend,
  trendValue,
  lastUpdated,
  className,
  onClick,
  loading = false
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && onClick) {
      event.preventDefault()
      onClick()
    }
  }

  if (loading) {
    return (
      <div className={cn(
        'live-tile animate-pulse',
        className
      )}>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'live-tile relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        `live-tile--${status}`,
        onClick && 'hover:shadow-md transform hover:-translate-y-1 transition-all duration-200',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? 'button' : 'article'}
      aria-label={`${title}: ${value}${unit ? ` ${unit}` : ''}`}
    >
      {/* Status indicator */}
      <StatusIndicator status={status} />

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-600 truncate">
          {title}
        </h3>

        {/* Value */}
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-gray-500">
              {unit}
            </span>
          )}
        </div>

        {/* Trend and timestamp */}
        <div className="flex items-center justify-between">
          {trend && (
            <TrendIndicator 
              trend={trend} 
              value={trendValue}
            />
          )}
          
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{formatTimestamp(lastUpdated)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
