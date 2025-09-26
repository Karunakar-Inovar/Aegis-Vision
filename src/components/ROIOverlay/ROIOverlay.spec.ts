import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ROIOverlay, ROIControls } from './ROIOverlay'
import type { ROIArea } from '@/types/types'

// Mock the utils module
vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' ')
}))

const mockROIAreas: ROIArea[] = [
  {
    id: 'roi-1',
    name: 'Defect Zone',
    type: 'defect',
    coordinates: { x: 100, y: 100, width: 200, height: 150 },
    color: '#ef4444',
    isActive: true,
    threshold: 0.8,
  },
  {
    id: 'roi-2',
    name: 'Quality Check',
    type: 'quality',
    coordinates: { x: 350, y: 200, width: 150, height: 100 },
    color: '#22c55e',
    isActive: false,
    threshold: 0.9,
  },
  {
    id: 'roi-3',
    name: 'Measurement Area',
    type: 'measurement',
    coordinates: { x: 50, y: 300, width: 300, height: 200 },
    color: '#3b82f6',
    isActive: true,
    threshold: 0.95,
  },
]

describe('ROIOverlay', () => {
  const defaultProps = {
    roiAreas: mockROIAreas,
    imageWidth: 800,
    imageHeight: 600,
    containerWidth: 800,
    containerHeight: 600,
  }

  it('renders ROI areas correctly', () => {
    render(<ROIOverlay {...defaultProps} />)
    
    // Should render active ROIs only
    const roiElements = document.querySelectorAll('[role="button"]')
    expect(roiElements).toHaveLength(2) // Only active ROIs
  })

  it('applies correct scaling', () => {
    const props = {
      ...defaultProps,
      containerWidth: 400, // Half the image width
      containerHeight: 300, // Half the image height
    }
    
    const { container } = render(<ROIOverlay {...props} />)
    
    const firstROI = container.querySelector('[role="button"]')
    expect(firstROI).toHaveStyle({
      left: '50px', // 100 * 0.5
      top: '50px',   // 100 * 0.5
      width: '100px', // 200 * 0.5
      height: '75px', // 150 * 0.5
    })
  })

  it('calls onROIClick when ROI is clicked', () => {
    const onROIClick = vi.fn()
    render(<ROIOverlay {...defaultProps} onROIClick={onROIClick} />)
    
    const firstROI = document.querySelector('[role="button"]')
    fireEvent.click(firstROI!)
    
    expect(onROIClick).toHaveBeenCalledWith(mockROIAreas[0])
  })

  it('calls onROIHover when ROI is hovered', () => {
    const onROIHover = vi.fn()
    render(<ROIOverlay {...defaultProps} onROIHover={onROIHover} />)
    
    const firstROI = document.querySelector('[role="button"]')
    fireEvent.mouseEnter(firstROI!)
    
    expect(onROIHover).toHaveBeenCalledWith(mockROIAreas[0])
    
    fireEvent.mouseLeave(firstROI!)
    expect(onROIHover).toHaveBeenCalledWith(null)
  })

  it('shows labels on hover when showLabels is true', () => {
    render(<ROIOverlay {...defaultProps} showLabels={true} />)
    
    const firstROI = document.querySelector('[role="button"]')
    fireEvent.mouseEnter(firstROI!)
    
    expect(screen.getByText('Defect Zone')).toBeInTheDocument()
    expect(screen.getByText('(80%)')).toBeInTheDocument()
  })

  it('does not show labels when showLabels is false', () => {
    render(<ROIOverlay {...defaultProps} showLabels={false} />)
    
    const firstROI = document.querySelector('[role="button"]')
    fireEvent.mouseEnter(firstROI!)
    
    expect(screen.queryByText('Defect Zone')).not.toBeInTheDocument()
  })

  it('highlights selected ROI', () => {
    const { container } = render(<ROIOverlay {...defaultProps} selectedROI="roi-1" />)
    
    const selectedROI = container.querySelector('[aria-label="ROI: Defect Zone"]')
    expect(selectedROI).toHaveClass('ring-2 ring-white ring-offset-2')
    
    // Should show corner indicators
    const corners = selectedROI?.querySelectorAll('.absolute.w-2.h-2.bg-white')
    expect(corners).toHaveLength(4)
  })

  it('does not respond to interactions when interactive is false', () => {
    const onROIClick = vi.fn()
    render(<ROIOverlay {...defaultProps} interactive={false} onROIClick={onROIClick} />)
    
    const roiElements = document.querySelectorAll('[role="presentation"]')
    expect(roiElements).toHaveLength(2) // Should be presentation, not button
    
    fireEvent.click(roiElements[0])
    expect(onROIClick).not.toHaveBeenCalled()
  })

  it('filters inactive ROI areas', () => {
    render(<ROIOverlay {...defaultProps} />)
    
    // Should only render active ROIs
    expect(screen.queryByLabelText('ROI: Quality Check')).not.toBeInTheDocument()
    expect(screen.getByLabelText('ROI: Defect Zone')).toBeInTheDocument()
    expect(screen.getByLabelText('ROI: Measurement Area')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<ROIOverlay {...defaultProps} className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles keyboard navigation', () => {
    const onROIClick = vi.fn()
    render(<ROIOverlay {...defaultProps} onROIClick={onROIClick} />)
    
    const firstROI = document.querySelector('[role="button"]')
    expect(firstROI).toHaveAttribute('tabIndex', '0')
  })
})

describe('ROIControls', () => {
  const defaultProps = {
    roiAreas: mockROIAreas,
  }

  it('renders all ROI areas', () => {
    render(<ROIControls {...defaultProps} />)
    
    expect(screen.getByText('Defect Zone')).toBeInTheDocument()
    expect(screen.getByText('Quality Check')).toBeInTheDocument()
    expect(screen.getByText('Measurement Area')).toBeInTheDocument()
  })

  it('shows ROI types', () => {
    render(<ROIControls {...defaultProps} />)
    
    expect(screen.getByText('defect')).toBeInTheDocument()
    expect(screen.getByText('quality')).toBeInTheDocument()
    expect(screen.getByText('measurement')).toBeInTheDocument()
  })

  it('calls onToggleROI when visibility button is clicked', () => {
    const onToggleROI = vi.fn()
    render(<ROIControls {...defaultProps} onToggleROI={onToggleROI} />)
    
    const toggleButtons = screen.getAllByTitle(/Hide ROI|Show ROI/)
    fireEvent.click(toggleButtons[0])
    
    expect(onToggleROI).toHaveBeenCalledWith('roi-1')
  })

  it('calls onEditROI when edit button is clicked', () => {
    const onEditROI = vi.fn()
    render(<ROIControls {...defaultProps} onEditROI={onEditROI} />)
    
    const editButtons = screen.getAllByTitle('Edit ROI')
    fireEvent.click(editButtons[0])
    
    expect(onEditROI).toHaveBeenCalledWith(mockROIAreas[0])
  })

  it('calls onDeleteROI when delete button is clicked', () => {
    const onDeleteROI = vi.fn()
    render(<ROIControls {...defaultProps} onDeleteROI={onDeleteROI} />)
    
    const deleteButtons = screen.getAllByTitle('Delete ROI')
    fireEvent.click(deleteButtons[0])
    
    expect(onDeleteROI).toHaveBeenCalledWith('roi-1')
  })

  it('shows different icons for active/inactive ROIs', () => {
    render(<ROIControls {...defaultProps} />)
    
    // Active ROI should have "Hide ROI" title
    expect(screen.getByTitle('Hide ROI')).toBeInTheDocument()
    
    // Inactive ROI should have "Show ROI" title
    expect(screen.getByTitle('Show ROI')).toBeInTheDocument()
  })

  it('shows empty state when no ROIs', () => {
    render(<ROIControls roiAreas={[]} />)
    
    expect(screen.getByText('No ROI areas defined')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<ROIControls {...defaultProps} className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('shows ROI colors correctly', () => {
    const { container } = render(<ROIControls {...defaultProps} />)
    
    const colorIndicators = container.querySelectorAll('.w-3.h-3.rounded.border')
    expect(colorIndicators[0]).toHaveStyle({ backgroundColor: '#ef4444' })
    expect(colorIndicators[1]).toHaveStyle({ backgroundColor: '#22c55e' })
    expect(colorIndicators[2]).toHaveStyle({ backgroundColor: '#3b82f6' })
  })

  it('handles long ROI names with truncation', () => {
    const longNameROI: ROIArea = {
      ...mockROIAreas[0],
      name: 'This is a very long ROI name that should be truncated',
    }
    
    render(<ROIControls roiAreas={[longNameROI]} />)
    
    const nameElement = screen.getByText('This is a very long ROI name that should be truncated')
    expect(nameElement).toHaveClass('truncate')
  })
})
