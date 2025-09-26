import React, { useState, useEffect } from 'react'
import { Plus, X, Play, Save, ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn, generateId } from '@/lib/utils'
import type { Rule, RuleCondition, RuleAction } from '@/types/types'
import type {
  RuleBuilderProps,
  RuleConditionBuilderProps,
  RuleActionBuilderProps,
  ConditionRowProps,
  ActionRowProps,
  FieldOption,
  ActionOption,
  RuleTestProps,
  RulePreviewProps
} from './RuleBuilder.types'

// Default field options for manufacturing context
const defaultFields: FieldOption[] = [
  { value: 'defect_count', label: 'Defect Count', type: 'number', description: 'Number of defects detected' },
  { value: 'quality_score', label: 'Quality Score', type: 'number', description: 'Overall quality score (0-1)' },
  { value: 'confidence', label: 'Confidence', type: 'number', description: 'AI model confidence (0-1)' },
  { value: 'processing_time', label: 'Processing Time', type: 'number', description: 'Time taken to process (ms)' },
  { value: 'camera_status', label: 'Camera Status', type: 'string', description: 'Camera operational status' },
  { value: 'inspection_status', label: 'Inspection Status', type: 'string', description: 'Current inspection status' },
  { value: 'temperature', label: 'Temperature', type: 'number', description: 'Equipment temperature' },
  { value: 'timestamp', label: 'Timestamp', type: 'date', description: 'Event timestamp' },
]

// Default action options
const defaultActions: ActionOption[] = [
  {
    value: 'alert',
    label: 'Create Alert',
    description: 'Generate an alert notification',
    parameters: [
      { name: 'severity', label: 'Severity', type: 'select', required: true, options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Critical', value: 'critical' }
      ]},
      { name: 'message', label: 'Message', type: 'string', required: true, placeholder: 'Alert message' }
    ]
  },
  {
    value: 'email',
    label: 'Send Email',
    description: 'Send email notification',
    parameters: [
      { name: 'to', label: 'Recipients', type: 'string', required: true, placeholder: 'email1@example.com, email2@example.com' },
      { name: 'subject', label: 'Subject', type: 'string', required: true, placeholder: 'Email subject' },
      { name: 'body', label: 'Body', type: 'string', placeholder: 'Email body' }
    ]
  },
  {
    value: 'webhook',
    label: 'Call Webhook',
    description: 'Send HTTP request to webhook URL',
    parameters: [
      { name: 'url', label: 'URL', type: 'string', required: true, placeholder: 'https://example.com/webhook' },
      { name: 'method', label: 'Method', type: 'select', options: [
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' }
      ]}
    ]
  },
  {
    value: 'stop_inspection',
    label: 'Stop Inspection',
    description: 'Stop the current inspection process',
    parameters: [
      { name: 'reason', label: 'Reason', type: 'string', placeholder: 'Reason for stopping inspection' }
    ]
  }
]

const ConditionRow: React.FC<ConditionRowProps> = ({
  condition,
  onChange,
  onRemove,
  availableFields = defaultFields,
  showRemove = true,
  className
}) => {
  const selectedField = availableFields.find(f => f.value === condition.field)
  const fieldType = selectedField?.type || 'string'

  const operators = {
    string: [
      { value: 'equals', label: 'equals' },
      { value: 'not_equals', label: 'does not equal' },
      { value: 'contains', label: 'contains' }
    ],
    number: [
      { value: 'equals', label: 'equals' },
      { value: 'not_equals', label: 'does not equal' },
      { value: 'greater_than', label: 'is greater than' },
      { value: 'less_than', label: 'is less than' }
    ],
    boolean: [
      { value: 'equals', label: 'equals' }
    ],
    date: [
      { value: 'equals', label: 'equals' },
      { value: 'greater_than', label: 'is after' },
      { value: 'less_than', label: 'is before' }
    ]
  }

  const availableOperators = operators[fieldType] || operators.string

  return (
    <div className={cn('flex items-center space-x-2 p-3 bg-gray-50 rounded-lg', className)}>
      {/* Field selector */}
      <select
        value={condition.field}
        onChange={(e) => onChange({ ...condition, field: e.target.value })}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="">Select field...</option>
        {availableFields.map(field => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>

      {/* Operator selector */}
      <select
        value={condition.operator}
        onChange={(e) => onChange({ ...condition, operator: e.target.value as any })}
        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        disabled={!condition.field}
      >
        {availableOperators.map(op => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {/* Value input */}
      <input
        type={fieldType === 'number' ? 'number' : fieldType === 'date' ? 'datetime-local' : 'text'}
        value={condition.value}
        onChange={(e) => onChange({ ...condition, value: fieldType === 'number' ? Number(e.target.value) : e.target.value })}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        placeholder="Enter value..."
        disabled={!condition.field}
      />

      {/* Remove button */}
      {showRemove && (
        <button
          onClick={onRemove}
          className="p-2 text-red-600 hover:bg-red-100 rounded-md"
          title="Remove condition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

const ActionRow: React.FC<ActionRowProps> = ({
  action,
  onChange,
  onRemove,
  availableActions = defaultActions,
  showRemove = true,
  className
}) => {
  const selectedAction = availableActions.find(a => a.value === action.type)

  return (
    <div className={cn('space-y-3 p-3 bg-gray-50 rounded-lg', className)}>
      <div className="flex items-center justify-between">
        {/* Action type selector */}
        <select
          value={action.type}
          onChange={(e) => onChange({ ...action, type: e.target.value as any, parameters: {} })}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 mr-2"
        >
          <option value="">Select action...</option>
          {availableActions.map(actionType => (
            <option key={actionType.value} value={actionType.value}>
              {actionType.label}
            </option>
          ))}
        </select>

        {/* Remove button */}
        {showRemove && (
          <button
            onClick={onRemove}
            className="p-2 text-red-600 hover:bg-red-100 rounded-md"
            title="Remove action"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Action parameters */}
      {selectedAction?.parameters && (
        <div className="space-y-2">
          {selectedAction.parameters.map(param => (
            <div key={param.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {param.label}
                {param.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {param.type === 'select' ? (
                <select
                  value={action.parameters[param.name] || ''}
                  onChange={(e) => onChange({
                    ...action,
                    parameters: { ...action.parameters, [param.name]: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select {param.label.toLowerCase()}...</option>
                  {param.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={param.type === 'number' ? 'number' : 'text'}
                  value={action.parameters[param.name] || ''}
                  onChange={(e) => onChange({
                    ...action,
                    parameters: { ...action.parameters, [param.name]: e.target.value }
                  })}
                  placeholder={param.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              )}
              {param.description && (
                <p className="text-xs text-gray-500 mt-1">{param.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const RuleConditionBuilder: React.FC<RuleConditionBuilderProps> = ({
  conditions,
  onChange,
  availableFields,
  className
}) => {
  const addCondition = () => {
    const newCondition: RuleCondition = {
      field: '',
      operator: 'equals',
      value: ''
    }
    onChange([...conditions, newCondition])
  }

  const updateCondition = (index: number, condition: RuleCondition) => {
    const updated = [...conditions]
    updated[index] = condition
    onChange(updated)
  }

  const removeCondition = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index))
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Conditions</h3>
        <button
          onClick={addCondition}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Condition</span>
        </button>
      </div>

      {conditions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No conditions defined. Add at least one condition to create a rule.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {conditions.map((condition, index) => (
            <div key={index}>
              {index > 0 && (
                <div className="flex justify-center py-2">
                  <span className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                    AND
                  </span>
                </div>
              )}
              <ConditionRow
                condition={condition}
                onChange={(updated) => updateCondition(index, updated)}
                onRemove={() => removeCondition(index)}
                availableFields={availableFields}
                showRemove={conditions.length > 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const RuleActionBuilder: React.FC<RuleActionBuilderProps> = ({
  actions,
  onChange,
  availableActions,
  className
}) => {
  const addAction = () => {
    const newAction: RuleAction = {
      type: 'alert',
      parameters: {}
    }
    onChange([...actions, newAction])
  }

  const updateAction = (index: number, action: RuleAction) => {
    const updated = [...actions]
    updated[index] = action
    onChange(updated)
  }

  const removeAction = (index: number) => {
    onChange(actions.filter((_, i) => i !== index))
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Actions</h3>
        <button
          onClick={addAction}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Action</span>
        </button>
      </div>

      {actions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No actions defined. Add at least one action to specify what happens when conditions are met.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {actions.map((action, index) => (
            <ActionRow
              key={index}
              action={action}
              onChange={(updated) => updateAction(index, updated)}
              onRemove={() => removeAction(index)}
              availableActions={availableActions}
              showRemove={actions.length > 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const RulePreview: React.FC<RulePreviewProps> = ({ rule, className }) => {
  const formatCondition = (condition: RuleCondition) => {
    return `${condition.field} ${condition.operator.replace('_', ' ')} ${condition.value}`
  }

  const formatAction = (action: RuleAction) => {
    const params = Object.entries(action.parameters)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')
    return `${action.type}${params ? ` (${params})` : ''}`
  }

  return (
    <div className={cn('bg-blue-50 border border-blue-200 rounded-lg p-4', className)}>
      <h4 className="font-medium text-blue-900 mb-2">Rule Preview</h4>
      <div className="text-sm text-blue-800">
        <p className="mb-2">
          <strong>IF:</strong> {rule.conditions.map(formatCondition).join(' AND ')}
        </p>
        <p>
          <strong>THEN:</strong> {rule.actions.map(formatAction).join(', ')}
        </p>
      </div>
    </div>
  )
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({
  rule,
  onSave,
  onCancel,
  className,
  availableFields = defaultFields,
  availableActions = defaultActions
}) => {
  const [currentRule, setCurrentRule] = useState<Rule>(
    rule || {
      id: generateId('rule'),
      name: '',
      description: '',
      conditions: [{ field: '', operator: 'equals', value: '' }],
      actions: [{ type: 'alert', parameters: {} }],
      isActive: true
    }
  )

  const [errors, setErrors] = useState<string[]>([])

  const validateRule = (): string[] => {
    const errors: string[] = []

    if (!currentRule.name.trim()) {
      errors.push('Rule name is required')
    }

    if (currentRule.conditions.length === 0) {
      errors.push('At least one condition is required')
    }

    currentRule.conditions.forEach((condition, index) => {
      if (!condition.field) {
        errors.push(`Condition ${index + 1}: Field is required`)
      }
      if (!condition.value) {
        errors.push(`Condition ${index + 1}: Value is required`)
      }
    })

    if (currentRule.actions.length === 0) {
      errors.push('At least one action is required')
    }

    currentRule.actions.forEach((action, index) => {
      if (!action.type) {
        errors.push(`Action ${index + 1}: Action type is required`)
      }
      
      const actionDef = availableActions.find(a => a.value === action.type)
      if (actionDef?.parameters) {
        actionDef.parameters.forEach(param => {
          if (param.required && !action.parameters[param.name]) {
            errors.push(`Action ${index + 1}: ${param.label} is required`)
          }
        })
      }
    })

    return errors
  }

  const handleSave = () => {
    const validationErrors = validateRule()
    setErrors(validationErrors)

    if (validationErrors.length === 0) {
      onSave(currentRule)
    }
  }

  return (
    <div className={cn('max-w-4xl mx-auto space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {rule ? 'Edit Rule' : 'Create Rule'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <Save className="w-4 h-4" />
            <span>Save Rule</span>
          </button>
        </div>
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-medium text-red-800">Please fix the following errors:</h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Basic info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Rule Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rule Name *
            </label>
            <input
              type="text"
              value={currentRule.name}
              onChange={(e) => setCurrentRule({ ...currentRule, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter rule name..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={currentRule.description || ''}
              onChange={(e) => setCurrentRule({ ...currentRule, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe what this rule does..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={currentRule.isActive}
              onChange={(e) => setCurrentRule({ ...currentRule, isActive: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Rule is active
            </label>
          </div>
        </div>
      </div>

      {/* Conditions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <RuleConditionBuilder
          conditions={currentRule.conditions}
          onChange={(conditions) => setCurrentRule({ ...currentRule, conditions })}
          availableFields={availableFields}
        />
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <RuleActionBuilder
          actions={currentRule.actions}
          onChange={(actions) => setCurrentRule({ ...currentRule, actions })}
          availableActions={availableActions}
        />
      </div>

      {/* Preview */}
      {currentRule.conditions.length > 0 && currentRule.actions.length > 0 && (
        <RulePreview rule={currentRule} />
      )}
    </div>
  )
}
