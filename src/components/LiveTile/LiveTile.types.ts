export interface LiveTileProps {
  id: string
  title: string
  value: string | number
  unit?: string
  status: 'success' | 'warning' | 'error' | 'info'
  trend?: 'up' | 'down' | 'stable'
  trendValue?: number
  lastUpdated: Date
  className?: string
  onClick?: () => void
  loading?: boolean
}

export interface TrendIndicatorProps {
  trend: 'up' | 'down' | 'stable'
  value?: number
  className?: string
}

export interface StatusIndicatorProps {
  status: 'success' | 'warning' | 'error' | 'info'
  className?: string
}
