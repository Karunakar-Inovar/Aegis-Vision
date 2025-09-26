import React, { useState, useEffect } from 'react'
import { 
  X, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Clock,
  Filter,
  MoreHorizontal
} from 'lucide-react'
import { cn, formatTimestamp } from '@/lib/utils'
import type { Alert } from '@/types/types'
import type { 
  AlertDrawerProps, 
  AlertItemProps, 
  AlertFilters, 
  AlertDrawerHeaderProps 
} from './AlertDrawer.types'

const AlertDrawerHeader: React.FC<AlertDrawerHeaderProps> = ({ 
  alertCount, 
  onClose, 
  onClearAll,
  className 
}) => (
  <div className={cn('flex items-center justify-between p-4 border-b border-gray-200', className)}>
    <div>
      <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
      <p className="text-sm text-gray-500">
        {alertCount} {alertCount === 1 ? 'alert' : 'alerts'}
      </p>
    </div>
    <div className="flex items-center space-x-2">
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100"
        >
          Clear All
        </button>
      )}
      <button
        onClick={onClose}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
        aria-label="Close alerts"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </div>
)

const AlertItem: React.FC<AlertItemProps> = ({ 
  alert, 
  onAcknowledge, 
  onDismiss, 
  onClick,
  className 
}) => {
  const getSeverityIcon = (severity: Alert['severity']) => {
    const iconClass = 'w-5 h-5'
    switch (severity) {
      case 'critical':
        return <AlertTriangle className={cn(iconClass, 'text-red-600')} />
      case 'high':
        return <AlertCircle className={cn(iconClass, 'text-red-500')} />
      case 'medium':
        return <AlertCircle className={cn(iconClass, 'text-yellow-500')} />
      case 'low':
        return <Info className={cn(iconClass, 'text-blue-500')} />
      default:
        return <Info className={cn(iconClass, 'text-gray-500')} />
    }
  }

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-l-red-600 bg-red-50'
      case 'high':
        return 'border-l-red-500 bg-red-50'
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50'
      case 'low':
        return 'border-l-blue-500 bg-blue-50'
      default:
        return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getStatusBadge = (status: Alert['status']) => {
    const badgeClasses = 'px-2 py-1 rounded-full text-xs font-medium'
    switch (status) {
      case 'active':
        return <span className={cn(badgeClasses, 'bg-red-100 text-red-800')}>Active</span>
      case 'acknowledged':
        return <span className={cn(badgeClasses, 'bg-yellow-100 text-yellow-800')}>Acknowledged</span>
      case 'resolved':
        return <span className={cn(badgeClasses, 'bg-green-100 text-green-800')}>Resolved</span>
      case 'dismissed':
        return <span className={cn(badgeClasses, 'bg-gray-100 text-gray-800')}>Dismissed</span>
      default:
        return null
    }
  }

  const handleItemClick = () => {
    if (onClick) {
      onClick(alert)
    }
  }

  return (
    <div
      className={cn(
        'border-l-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors',
        getSeverityColor(alert.severity),
        alert.status === 'active' && 'animate-pulse',
        className
      )}
      onClick={handleItemClick}
    >
      <div className="flex items-start space-x-3">
        {getSeverityIcon(alert.severity)}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {alert.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {alert.message}
              </p>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(alert.createdAt)}</span>
                </div>
                <span className="capitalize">{alert.source}</span>
                {getStatusBadge(alert.status)}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 ml-2">
              {alert.status === 'active' && onAcknowledge && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAcknowledge(alert.id)
                  }}
                  className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded"
                  aria-label="Acknowledge alert"
                  title="Acknowledge"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
              
              {onDismiss && alert.status !== 'dismissed' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDismiss(alert.id)
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded"
                  aria-label="Dismiss alert"
                  title="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                aria-label="More options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AlertDrawer: React.FC<AlertDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  className,
  onAlertClick,
  onAcknowledge,
  onDismiss,
  loading = false
}) => {
  const [filters, setFilters] = useState<AlertFilters>({})
  const [showFilters, setShowFilters] = useState(false)

  // Filter alerts based on current filters
  const filteredAlerts = alerts.filter(alert => {
    if (filters.severity?.length && !filters.severity.includes(alert.severity)) return false
    if (filters.status?.length && !filters.status.includes(alert.status)) return false
    if (filters.type?.length && !filters.type.includes(alert.type)) return false
    if (filters.source?.length && !filters.source.includes(alert.source)) return false
    return true
  })

  // Sort alerts by creation date (newest first) and severity
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    // First sort by status (active alerts first)
    if (a.status === 'active' && b.status !== 'active') return -1
    if (a.status !== 'active' && b.status === 'active') return 1
    
    // Then by severity
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
    const severityDiff = severityOrder[b.severity] - severityOrder[a.severity]
    if (severityDiff !== 0) return severityDiff
    
    // Finally by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleClearAll = () => {
    // This would typically call an API to clear all alerts
    console.log('Clear all alerts')
  }

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        'fixed right-0 top-0 z-50 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full',
        className
      )}>
        {/* Header */}
        <AlertDrawerHeader
          alertCount={filteredAlerts.length}
          onClose={onClose}
          onClearAll={handleClearAll}
        />

        {/* Filters */}
        <div className="border-b border-gray-200 p-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          {showFilters && (
            <div className="mt-3 space-y-3">
              {/* Severity filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Severity
                </label>
                <div className="flex flex-wrap gap-1">
                  {(['critical', 'high', 'medium', 'low'] as const).map(severity => (
                    <button
                      key={severity}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          severity: prev.severity?.includes(severity)
                            ? prev.severity.filter(s => s !== severity)
                            : [...(prev.severity || []), severity]
                        }))
                      }}
                      className={cn(
                        'px-2 py-1 text-xs rounded-full border',
                        filters.severity?.includes(severity)
                          ? 'bg-primary-100 border-primary-300 text-primary-800'
                          : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                      )}
                    >
                      {severity}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Status filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex flex-wrap gap-1">
                  {(['active', 'acknowledged', 'resolved', 'dismissed'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          status: prev.status?.includes(status)
                            ? prev.status.filter(s => s !== status)
                            : [...(prev.status || []), status]
                        }))
                      }}
                      className={cn(
                        'px-2 py-1 text-xs rounded-full border',
                        filters.status?.includes(status)
                          ? 'bg-primary-100 border-primary-300 text-primary-800'
                          : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Alert list */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex space-x-3">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedAlerts.length === 0 ? (
            <div className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No alerts found
              </h3>
              <p className="text-sm text-gray-500">
                {alerts.length === 0 
                  ? "You're all caught up! No alerts at the moment."
                  : "No alerts match your current filters."
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedAlerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  onAcknowledge={onAcknowledge}
                  onDismiss={onDismiss}
                  onClick={onAlertClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
