import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LiveTile } from './LiveTile'
import type { LiveTileProps } from './LiveTile.types'

// Mock the utils module
vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
  formatTimestamp: (date: Date) => date.toLocaleString()
}))

const defaultProps: LiveTileProps = {
  id: 'test-tile',
  title: 'Test Metric',
  value: 42,
  unit: '%',
  status: 'success',
  trend: 'up',
  trendValue: 5,
  lastUpdated: new Date('2024-01-15T10:30:00Z')
}

describe('LiveTile', () => {
  it('renders correctly with all props', () => {
    render(<LiveTile {...defaultProps} />)
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('%')).toBeInTheDocument()
  })

  it('renders without unit when not provided', () => {
    const props = { ...defaultProps, unit: undefined }
    render(<LiveTile {...props} />)
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.queryByText('%')).not.toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<LiveTile {...defaultProps} onClick={handleClick} />)
    
    const tile = screen.getByRole('button')
    fireEvent.click(tile)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Enter key is pressed', () => {
    const handleClick = vi.fn()
    render(<LiveTile {...defaultProps} onClick={handleClick} />)
    
    const tile = screen.getByRole('button')
    fireEvent.keyDown(tile, { key: 'Enter' })
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Space key is pressed', () => {
    const handleClick = vi.fn()
    render(<LiveTile {...defaultProps} onClick={handleClick} />)
    
    const tile = screen.getByRole('button')
    fireEvent.keyDown(tile, { key: ' ' })
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when other keys are pressed', () => {
    const handleClick = vi.fn()
    render(<LiveTile {...defaultProps} onClick={handleClick} />)
    
    const tile = screen.getByRole('button')
    fireEvent.keyDown(tile, { key: 'a' })
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders as article when onClick is not provided', () => {
    const props = { ...defaultProps, onClick: undefined }
    render(<LiveTile {...props} />)
    
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<LiveTile {...defaultProps} loading={true} />)
    
    expect(screen.queryByText('Test Metric')).not.toBeInTheDocument()
    expect(screen.queryByText('42')).not.toBeInTheDocument()
  })

  it('formats large numbers correctly', () => {
    const props = { ...defaultProps, value: 1234567 }
    render(<LiveTile {...props} />)
    
    expect(screen.getByText('1,234,567')).toBeInTheDocument()
  })

  it('handles string values', () => {
    const props = { ...defaultProps, value: 'Online' }
    render(<LiveTile {...props} />)
    
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('renders different status indicators', () => {
    const { rerender } = render(<LiveTile {...defaultProps} status="success" />)
    expect(document.querySelector('.live-tile--success')).toBeInTheDocument()

    rerender(<LiveTile {...defaultProps} status="warning" />)
    expect(document.querySelector('.live-tile--warning')).toBeInTheDocument()

    rerender(<LiveTile {...defaultProps} status="error" />)
    expect(document.querySelector('.live-tile--error')).toBeInTheDocument()

    rerender(<LiveTile {...defaultProps} status="info" />)
    expect(document.querySelector('.live-tile--info')).toBeInTheDocument()
  })

  it('renders different trend indicators', () => {
    const { rerender } = render(<LiveTile {...defaultProps} trend="up" />)
    expect(screen.getByText('+5')).toBeInTheDocument()

    rerender(<LiveTile {...defaultProps} trend="down" trendValue={3} />)
    expect(screen.getByText('-3')).toBeInTheDocument()

    rerender(<LiveTile {...defaultProps} trend="stable" trendValue={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders without trend when not provided', () => {
    const props = { ...defaultProps, trend: undefined, trendValue: undefined }
    render(<LiveTile {...props} />)
    
    expect(screen.queryByText('+5')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<LiveTile {...defaultProps} className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has correct accessibility attributes', () => {
    render(<LiveTile {...defaultProps} onClick={() => {}} />)
    
    const tile = screen.getByRole('button')
    expect(tile).toHaveAttribute('aria-label', 'Test Metric: 42 %')
    expect(tile).toHaveAttribute('tabIndex', '0')
  })

  it('has correct accessibility attributes when not clickable', () => {
    render(<LiveTile {...defaultProps} />)
    
    const tile = screen.getByRole('article')
    expect(tile).toHaveAttribute('tabIndex', '-1')
  })
})
