import type { ROIArea } from '@/types/types'

export interface ROIOverlayProps {
  roiAreas: ROIArea[]
  imageWidth: number
  imageHeight: number
  containerWidth?: number
  containerHeight?: number
  className?: string
  onROIClick?: (roi: ROIArea) => void
  onROIHover?: (roi: ROIArea | null) => void
  showLabels?: boolean
  interactive?: boolean
  selectedROI?: string
}

export interface ROIAreaProps {
  roi: ROIArea
  scale: { x: number; y: number }
  onClick?: (roi: ROIArea) => void
  onHover?: (roi: ROIArea | null) => void
  showLabel?: boolean
  interactive?: boolean
  isSelected?: boolean
  className?: string
}

export interface ROILabelProps {
  roi: ROIArea
  position: { x: number; y: number }
  className?: string
}

export interface ROIControlsProps {
  roiAreas: ROIArea[]
  onToggleROI?: (roiId: string) => void
  onDeleteROI?: (roiId: string) => void
  onEditROI?: (roi: ROIArea) => void
  className?: string
}

export interface CreateROIProps {
  imageWidth: number
  imageHeight: number
  onCreateROI?: (roi: Omit<ROIArea, 'id'>) => void
  defaultType?: ROIArea['type']
  className?: string
}
