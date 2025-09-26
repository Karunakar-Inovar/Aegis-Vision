import React from 'react'
import Layout, { SimpleLayout, CustomLayout } from '@/components/Layout'
import { designTokens } from '@/lib/designTokens'

// Example 1: Basic Layout with design tokens
export function BasicLayoutExample() {
  return (
    <Layout title="Dashboard" showSidebar={true} showTopbar={true}>
      <div className="space-y-6">
        <h1 
          className="text-3xl font-bold"
          style={{
            color: designTokens.colors['on-surface'],
            fontSize: designTokens.typography['font-xl'].fontSize,
            fontWeight: designTokens.typography['font-xl'].fontWeight,
          }}
        >
          Welcome to Aegis Vision
        </h1>
        
        <div 
          className="p-6 rounded-lg"
          style={{
            backgroundColor: designTokens.colors['surface-primary'],
            padding: designTokens.spacing['space-4'],
            borderRadius: designTokens.radius['radius-md'],
            boxShadow: designTokens.elevation['elevation-2'],
          }}
        >
          <h2 
            style={{
              fontSize: designTokens.typography['font-large'].fontSize,
              fontWeight: designTokens.typography['font-large'].fontWeight,
              marginBottom: designTokens.spacing['space-3'],
            }}
          >
            Manufacturing Overview
          </h2>
          
          <p style={{ color: designTokens.colors['on-surface-secondary'] }}>
            This is an example of using design tokens directly in components.
          </p>
        </div>
      </div>
    </Layout>
  )
}

// Example 2: Simple Layout (no sidebar/topbar)
export function SimpleLayoutExample() {
  return (
    <SimpleLayout>
      <div 
        className="container mx-auto"
        style={{ padding: designTokens.spacing['space-4'] }}
      >
        <h1 
          style={{
            fontSize: designTokens.typography['font-xl'].fontSize,
            fontWeight: designTokens.typography['font-xl'].fontWeight,
            marginBottom: designTokens.spacing['space-4'],
          }}
        >
          Simple Layout Example
        </h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Status Cards using design tokens */}
          <StatusCard 
            title="Operational"
            value="95%"
            status="success"
          />
          <StatusCard 
            title="Warning"
            value="3"
            status="warning"
          />
          <StatusCard 
            title="Critical"
            value="1"
            status="danger"
          />
        </div>
      </div>
    </SimpleLayout>
  )
}

// Example 3: Custom Layout with different background
export function CustomLayoutExample() {
  return (
    <CustomLayout backgroundColor="surface-primary" padding="space-3">
      <div className="max-w-4xl mx-auto">
        <h1 
          style={{
            fontSize: designTokens.typography['font-xl'].fontSize,
            marginBottom: designTokens.spacing['space-4'],
          }}
        >
          Custom Layout Example
        </h1>
        
        <div className="space-y-4">
          <AlertBox type="success" message="System is operational" />
          <AlertBox type="warning" message="Maintenance scheduled" />
          <AlertBox type="danger" message="Critical alert detected" />
        </div>
      </div>
    </CustomLayout>
  )
}

// Helper Components using design tokens

interface StatusCardProps {
  title: string
  value: string
  status: 'success' | 'warning' | 'danger'
}

function StatusCard({ title, value, status }: StatusCardProps) {
  const statusColors = {
    success: designTokens.colors.success,
    warning: designTokens.colors.warning,
    danger: designTokens.colors.danger,
  }

  return (
    <div
      style={{
        backgroundColor: designTokens.colors['surface-primary'],
        padding: designTokens.spacing['space-4'],
        borderRadius: designTokens.radius['radius-md'],
        boxShadow: designTokens.elevation['elevation-1'],
        borderLeft: `4px solid ${statusColors[status]}`,
      }}
    >
      <h3 
        style={{
          fontSize: designTokens.typography['font-base'].fontSize,
          fontWeight: '600',
          color: designTokens.colors['on-surface-secondary'],
          marginBottom: designTokens.spacing['space-1'],
        }}
      >
        {title}
      </h3>
      
      <div 
        style={{
          fontSize: designTokens.typography['font-large'].fontSize,
          fontWeight: designTokens.typography['font-large'].fontWeight,
          color: statusColors[status],
        }}
      >
        {value}
      </div>
    </div>
  )
}

interface AlertBoxProps {
  type: 'success' | 'warning' | 'danger'
  message: string
}

function AlertBox({ type, message }: AlertBoxProps) {
  const alertStyles = {
    success: {
      backgroundColor: `${designTokens.colors.success}20`,
      borderColor: designTokens.colors.success,
      color: designTokens.colors.success,
    },
    warning: {
      backgroundColor: `${designTokens.colors.warning}20`,
      borderColor: designTokens.colors.warning,
      color: designTokens.colors.warning,
    },
    danger: {
      backgroundColor: `${designTokens.colors.danger}20`,
      borderColor: designTokens.colors.danger,
      color: designTokens.colors.danger,
    },
  }

  return (
    <div
      style={{
        ...alertStyles[type],
        padding: designTokens.spacing['space-3'],
        borderRadius: designTokens.radius['radius-sm'],
        border: `1px solid ${alertStyles[type].borderColor}`,
        fontSize: designTokens.typography['font-base'].fontSize,
      }}
    >
      {message}
    </div>
  )
}

// Example using Tailwind classes with design token integration
export function TailwindLayoutExample() {
  return (
    <Layout title="Tailwind + Tokens">
      <div className="space-y-6">
        {/* Using Tailwind classes that map to design tokens */}
        <div className="bg-surface-primary p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-on-surface mb-3">
            Tailwind + Design Tokens
          </h2>
          <p className="text-on-surface-secondary">
            This example uses Tailwind classes that are mapped to design tokens in the config.
          </p>
        </div>
        
        {/* Status indicators using custom classes */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-surface-primary p-4 rounded-md border-l-4 border-l-success">
            <div className="text-success font-semibold">Operational</div>
            <div className="text-on-surface-secondary">All systems running</div>
          </div>
          
          <div className="bg-surface-primary p-4 rounded-md border-l-4 border-l-warning">
            <div className="text-warning font-semibold">Warning</div>
            <div className="text-on-surface-secondary">Maintenance needed</div>
          </div>
          
          <div className="bg-surface-primary p-4 rounded-md border-l-4 border-l-danger">
            <div className="text-danger font-semibold">Critical</div>
            <div className="text-on-surface-secondary">Immediate attention</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
