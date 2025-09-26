import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import { Sidebar as EnhancedSidebar } from '@/components/Layout/Sidebar'
import { designTokens } from '@/lib/designTokens'

// For the compact sidebar, we'll use the same Layout Sidebar but with different props
const CompactSidebar = EnhancedSidebar

// Example 1: Basic Sidebar with design tokens
export function BasicSidebarExample() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main 
          className="flex-1 p-8"
          style={{
            backgroundColor: designTokens.colors['surface-secondary'],
            padding: designTokens.spacing['space-4'],
          }}
        >
          <h1 
            style={{
              fontSize: designTokens.typography['font-xl'].fontSize,
              fontWeight: designTokens.typography['font-xl'].fontWeight,
              color: designTokens.colors['on-surface'],
              marginBottom: designTokens.spacing['space-4'],
            }}
          >
            Vision AI Dashboard
          </h1>
          
          <div 
            style={{
              backgroundColor: designTokens.colors['surface-primary'],
              padding: designTokens.spacing['space-4'],
              borderRadius: designTokens.radius['radius-md'],
              boxShadow: designTokens.elevation['elevation-1'],
            }}
          >
            <p style={{ color: designTokens.colors['on-surface-secondary'] }}>
              This is the main content area. The sidebar uses React Router for navigation
              and design tokens for consistent styling.
            </p>
          </div>
        </main>
      </div>
    </Router>
  )
}

// Example 2: Enhanced Sidebar with more features
export function EnhancedSidebarExample() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <EnhancedSidebar />
        <main 
          style={{
            flex: 1,
            backgroundColor: designTokens.colors['surface-secondary'],
            padding: designTokens.spacing['space-4'],
          }}
        >
          <div 
            style={{
              backgroundColor: designTokens.colors['surface-primary'],
              padding: designTokens.spacing['space-4'],
              borderRadius: designTokens.radius['radius-lg'],
              boxShadow: designTokens.elevation['elevation-2'],
              marginBottom: designTokens.spacing['space-4'],
            }}
          >
            <h2 
              style={{
                fontSize: designTokens.typography['font-large'].fontSize,
                fontWeight: designTokens.typography['font-large'].fontWeight,
                color: designTokens.colors['on-surface'],
                marginBottom: designTokens.spacing['space-3'],
              }}
            >
              Enhanced Sidebar Features
            </h2>
            
            <ul 
              style={{
                color: designTokens.colors['on-surface-secondary'],
                fontSize: designTokens.typography['font-base'].fontSize,
                listStyle: 'disc',
                paddingLeft: designTokens.spacing['space-4'],
              }}
            >
              <li>Active state indicators with design token colors</li>
              <li>Hover effects using consistent transitions</li>
              <li>System status footer with operational indicators</li>
              <li>Proper spacing using design token values</li>
              <li>React Router integration for navigation</li>
            </ul>
          </div>
          
          {/* Status Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <StatusCard 
              title="Cameras Online"
              value="12/15"
              status="success"
            />
            <StatusCard 
              title="Active Models"
              value="3"
              status="success"
            />
            <StatusCard 
              title="Pending Incidents"
              value="2"
              status="warning"
            />
          </div>
        </main>
      </div>
    </Router>
  )
}

// Example 3: Compact Sidebar for space-constrained layouts
export function CompactSidebarExample() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <CompactSidebar />
        <main 
          style={{
            flex: 1,
            backgroundColor: designTokens.colors['surface-secondary'],
            padding: designTokens.spacing['space-4'],
          }}
        >
          <h1 
            style={{
              fontSize: designTokens.typography['font-xl'].fontSize,
              fontWeight: designTokens.typography['font-xl'].fontWeight,
              color: designTokens.colors['on-surface'],
              marginBottom: designTokens.spacing['space-4'],
            }}
          >
            Compact Layout
          </h1>
          
          <p 
            style={{
              color: designTokens.colors['on-surface-secondary'],
              marginBottom: designTokens.spacing['space-4'],
            }}
          >
            This layout uses a compact sidebar with icon-only navigation, 
            perfect for maximizing content space while maintaining easy navigation.
          </p>
          
          <div 
            style={{
              backgroundColor: designTokens.colors['surface-primary'],
              padding: designTokens.spacing['space-4'],
              borderRadius: designTokens.radius['radius-md'],
              boxShadow: designTokens.elevation['elevation-1'],
            }}
          >
            <h3 
              style={{
                fontSize: designTokens.typography['font-large'].fontSize,
                fontWeight: designTokens.typography['font-large'].fontWeight,
                color: designTokens.colors['on-surface'],
                marginBottom: designTokens.spacing['space-2'],
              }}
            >
              Compact Sidebar Benefits
            </h3>
            <ul 
              style={{
                color: designTokens.colors['on-surface-secondary'],
                listStyle: 'disc',
                paddingLeft: designTokens.spacing['space-4'],
              }}
            >
              <li>Maximizes content area</li>
              <li>Icon-based navigation with tooltips</li>
              <li>Consistent hover and active states</li>
              <li>Perfect for dashboard-heavy applications</li>
            </ul>
          </div>
        </main>
      </div>
    </Router>
  )
}

// Helper component for status cards
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
          marginBottom: designTokens.spacing['space-2'],
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

// Example with Tailwind classes (alternative approach)
export function TailwindSidebarExample() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Using Tailwind classes that map to design tokens */}
        <aside className="w-64 bg-surface-primary border-r border-neutral-200 p-4">
          <div className="text-xl font-bold mb-6 text-on-surface">Vision AI</div>
          <nav className="space-y-2">
            <a href="#" className="block p-2 rounded hover:bg-neutral-100 text-on-surface-secondary">
              Dashboard
            </a>
            <a href="#" className="block p-2 rounded bg-primary-light text-primary border-r-2 border-primary">
              Cameras (Active)
            </a>
            <a href="#" className="block p-2 rounded hover:bg-neutral-100 text-on-surface-secondary">
              Models
            </a>
          </nav>
        </aside>
        
        <main className="flex-1 bg-surface-secondary p-4">
          <h1 className="text-xl font-bold text-on-surface mb-4">
            Tailwind + Design Tokens Example
          </h1>
          <div className="bg-surface-primary p-4 rounded-lg shadow-sm">
            <p className="text-on-surface-secondary">
              This example shows how to use Tailwind classes that are mapped to design tokens.
            </p>
          </div>
        </main>
      </div>
    </Router>
  )
}
