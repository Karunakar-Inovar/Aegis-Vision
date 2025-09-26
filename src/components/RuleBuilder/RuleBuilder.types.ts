import type { Rule, RuleCondition, RuleAction } from '@/types/types'

export interface RuleBuilderProps {
  rule?: Rule
  onSave: (rule: Rule) => void
  onCancel: () => void
  className?: string
  availableFields?: FieldOption[]
  availableActions?: ActionOption[]
}

export interface RuleConditionBuilderProps {
  conditions: RuleCondition[]
  onChange: (conditions: RuleCondition[]) => void
  availableFields?: FieldOption[]
  className?: string
}

export interface RuleActionBuilderProps {
  actions: RuleAction[]
  onChange: (actions: RuleAction[]) => void
  availableActions?: ActionOption[]
  className?: string
}

export interface ConditionRowProps {
  condition: RuleCondition
  onChange: (condition: RuleCondition) => void
  onRemove: () => void
  availableFields?: FieldOption[]
  showRemove?: boolean
  className?: string
}

export interface ActionRowProps {
  action: RuleAction
  onChange: (action: RuleAction) => void
  onRemove: () => void
  availableActions?: ActionOption[]
  showRemove?: boolean
  className?: string
}

export interface FieldOption {
  value: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'date'
  description?: string
}

export interface ActionOption {
  value: RuleAction['type']
  label: string
  description?: string
  parameters?: ParameterOption[]
}

export interface ParameterOption {
  name: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select'
  required?: boolean
  options?: { label: string; value: string }[]
  placeholder?: string
  description?: string
}

export interface RuleTestProps {
  rule: Rule
  testData?: Record<string, any>
  onTest?: (rule: Rule, data: Record<string, any>) => Promise<boolean>
  className?: string
}

export interface RulePreviewProps {
  rule: Rule
  className?: string
}
