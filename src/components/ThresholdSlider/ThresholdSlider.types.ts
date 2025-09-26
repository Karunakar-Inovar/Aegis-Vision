export interface ThresholdSliderProps {
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  label?: string
  description?: string
  onChange: (value: number) => void
  onChangeCommitted?: (value: number) => void
  className?: string
  disabled?: boolean
  color?: 'primary' | 'success' | 'warning' | 'error'
  showValue?: boolean
  showMarks?: boolean
  marks?: ThresholdMark[]
  size?: 'sm' | 'md' | 'lg'
}

export interface ThresholdMark {
  value: number
  label: string
  color?: string
}

export interface ThresholdRangeProps {
  values: [number, number]
  min: number
  max: number
  step?: number
  unit?: string
  labels?: [string, string]
  onChange: (values: [number, number]) => void
  onChangeCommitted?: (values: [number, number]) => void
  className?: string
  disabled?: boolean
  color?: 'primary' | 'success' | 'warning' | 'error'
}

export interface ThresholdDisplayProps {
  value: number
  min: number
  max: number
  unit?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
