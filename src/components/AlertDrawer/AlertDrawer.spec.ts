import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AlertDrawer } from './AlertDrawer'
import type { Alert } from '@/types/types'
import type { AlertDrawerProps } from './AlertDrawer.types'

// Mock the utils module
vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
  formatTimestamp: (date: Date) => date.toLocaleString()
}))

const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'defect_detected',
    severity: 'high',
    title: 'Critical Defect Detected',
    message: 'Multiple defects found in assembly line',
    source: 'inspection',
    sourceId: 'insp-001',
    status: 'active',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: 'alert-2',
    type: 'system_error',
    severity: 'medium',
    title: 'Camera Connection Lost',
    message: 'Camera 3 has lost connection',
    source: 'camera',
    sourceId: 'cam-003',
    status: 'acknowledged',
    acknowledgedBy: 'user-001',
    acknowledgedAt: new Date('2024-01-15T09:20:00Z'),
    createdAt: new Date('2024-01-15T09:15:00Z'),
    updatedAt: new Date('2024-01-15T09:20:00Z'),
  },
]

const defaultProps: AlertDrawerProps = {
  isOpen: true,
  onClose: vi.fn(),
  alerts: mockAlerts,
}

describe('AlertDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders when open', () => {
    render(<AlertDrawer {...defaultProps} />)
    
    expect(screen.getByText('Alerts')).toBeInTheDocument()
    expect(screen.getByText('2 alerts')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<AlertDrawer {...defaultProps} isOpen={false} />)
    
    expect(screen.queryByText('Alerts')).not.toBeInTheDocument()
  })

  it('displays alerts correctly', () => {
    render(<AlertDrawer {...defaultProps} />)
    
    expect(screen.getByText('Critical Defect Detected')).toBeInTheDocument()
    expect(screen.getByText('Multiple defects found in assembly line')).toBeInTheDocument()
    expect(screen.getByText('Camera Connection Lost')).toBeInTheDocument()
    expect(screen.getByText('Camera 3 has lost connection')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<AlertDrawer {...defaultProps} onClose={onClose} />)
    
    const closeButton = screen.getByLabelText('Close alerts')
    fireEvent.click(closeButton)
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    const { container } = render(<AlertDrawer {...defaultProps} onClose={onClose} />)
    
    const backdrop = container.querySelector('.fixed.inset-0.z-40')
    expect(backdrop).toBeInTheDocument()
    
    fireEvent.click(backdrop!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onAlertClick when alert is clicked', () => {
    const onAlertClick = vi.fn()
    render(<AlertDrawer {...defaultProps} onAlertClick={onAlertClick} />)
    
    const alert = screen.getByText('Critical Defect Detected').closest('div')
    fireEvent.click(alert!)
    
    expect(onAlertClick).toHaveBeenCalledWith(mockAlerts[0])
  })

  it('calls onAcknowledge when acknowledge button is clicked', () => {
    const onAcknowledge = vi.fn()
    render(<AlertDrawer {...defaultProps} onAcknowledge={onAcknowledge} />)
    
    const acknowledgeButtons = screen.getAllByLabelText('Acknowledge alert')
    fireEvent.click(acknowledgeButtons[0])
    
    expect(onAcknowledge).toHaveBeenCalledWith('alert-1')
  })

  it('calls onDismiss when dismiss button is clicked', () => {
    const onDismiss = vi.fn()
    render(<AlertDrawer {...defaultProps} onDismiss={onDismiss} />)
    
    const dismissButtons = screen.getAllByLabelText('Dismiss alert')
    fireEvent.click(dismissButtons[0])
    
    expect(onDismiss).toHaveBeenCalledWith('alert-1')
  })

  it('shows loading state', () => {
    render(<AlertDrawer {...defaultProps} loading={true} />)
    
    expect(screen.queryByText('Critical Defect Detected')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.animate-pulse')).toHaveLength(5)
  })

  it('shows empty state when no alerts', () => {
    render(<AlertDrawer {...defaultProps} alerts={[]} />)
    
    expect(screen.getByText('No alerts found')).toBeInTheDocument()
    expect(screen.getByText("You're all caught up! No alerts at the moment.")).toBeInTheDocument()
  })

  it('shows filtered empty state', () => {
    render(<AlertDrawer {...defaultProps} />)
    
    // Open filters
    const filtersButton = screen.getByText('Filters')
    fireEvent.click(filtersButton)
    
    // Apply a filter that excludes all alerts
    const lowSeverityFilter = screen.getByText('low')
    fireEvent.click(lowSeverityFilter)
    
    expect(screen.getByText('No alerts found')).toBeInTheDocument()
    expect(screen.getByText('No alerts match your current filters.')).toBeInTheDocument()
  })

  it('filters alerts by severity', () => {
    render(<AlertDrawer {...defaultProps} />)
    
    // Open filters
    const filtersButton = screen.getByText('Filters')
    fireEvent.click(filtersButton)
    
    // Filter by high severity
    const highSeverityFilter = screen.getByText('high')
    fireEvent.click(highSeverityFilter)
    
    expect(screen.getByText('Critical Defect Detected')).toBeInTheDocument()
    expect(screen.queryByText('Camera Connection Lost')).not.toBeInTheDocument()
  })

  it('filters alerts by status', () => {
    render(<AlertDrawer {...defaultProps} />)
    
    // Open filters
    const filtersButton = screen.getByText('Filters')
    fireEvent.click(filtersButton)
    
    // Filter by acknowledged status
    const acknowledgedStatusFilter = screen.getByText('acknowledged')
    fireEvent.click(acknowledgedStatusFilter)
    
    expect(screen.queryByText('Critical Defect Detected')).not.toBeInTheDocument()
    expect(screen.getByText('Camera Connection Lost')).toBeInTheDocument()
  })

  it('sorts alerts correctly', () => {
    const alertsWithDifferentStatuses: Alert[] = [
      {
        ...mockAlerts[0],
        status: 'resolved',
        severity: 'low',
        createdAt: new Date('2024-01-15T12:00:00Z'),
      },
      {
        ...mockAlerts[1],
        status: 'active',
        severity: 'critical',
        createdAt: new Date('2024-01-15T11:00:00Z'),
      },
    ]

    render(<AlertDrawer {...defaultProps} alerts={alertsWithDifferentStatuses} />)
    
    const alertElements = screen.getAllByText(/Defect Detected|Connection Lost/)
    // Active critical alert should come first
    expect(alertElements[0]).toHaveTextContent('Camera Connection Lost')
    expect(alertElements[1]).toHaveTextContent('Critical Defect Detected')
  })

  it('shows correct status badges', () => {
    render(<AlertDrawer {...defaultProps} />)
    
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Acknowledged')).toBeInTheDocument()
  })

  it('handles keyboard navigation', () => {
    const onClose = vi.fn()
    render(<AlertDrawer {...defaultProps} onClose={onClose} />)
    
    // Simulate Escape key press
    fireEvent.keyDown(document, { key: 'Escape' })
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('prevents event bubbling on action buttons', () => {
    const onAlertClick = vi.fn()
    const onAcknowledge = vi.fn()
    
    render(<AlertDrawer {...defaultProps} onAlertClick={onAlertClick} onAcknowledge={onAcknowledge} />)
    
    const acknowledgeButton = screen.getAllByLabelText('Acknowledge alert')[0]
    fireEvent.click(acknowledgeButton)
    
    expect(onAcknowledge).toHaveBeenCalledWith('alert-1')
    expect(onAlertClick).not.toHaveBeenCalled()
  })

  it('shows acknowledge button only for active alerts', () => {
    render(<AlertDrawer {...defaultProps} />)
    
    const acknowledgeButtons = screen.getAllByLabelText('Acknowledge alert')
    expect(acknowledgeButtons).toHaveLength(1) // Only the active alert should have an acknowledge button
  })

  it('applies custom className', () => {
    const { container } = render(<AlertDrawer {...defaultProps} className="custom-class" />)
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})
