import type { Alert } from '@/types/types'

export interface AlertDrawerProps {
  isOpen: boolean
  onClose: () => void
  alerts: Alert[]
  className?: string
  onAlertClick?: (alert: Alert) => void
  onAcknowledge?: (alertId: string) => void
  onDismiss?: (alertId: string) => void
  loading?: boolean
}

export interface AlertItemProps {
  alert: Alert
  onAcknowledge?: (alertId: string) => void
  onDismiss?: (alertId: string) => void
  onClick?: (alert: Alert) => void
  className?: string
}

export interface AlertFilters {
  severity?: Alert['severity'][]
  status?: Alert['status'][]
  type?: Alert['type'][]
  source?: Alert['source'][]
}

export interface AlertDrawerHeaderProps {
  alertCount: number
  onClose: () => void
  onClearAll?: () => void
  className?: string
}
