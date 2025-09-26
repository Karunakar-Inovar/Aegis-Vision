import React, { useState } from 'react'
import { Sidebar } from './Layout/Sidebar'
import { Topbar } from './Layout/Topbar'
import { cn } from '@/lib/utils'
import { designTokens } from '@/lib/designTokens'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  className?: string
  showSidebar?: boolean
  showTopbar?: boolean
}

export default function Layout({ 
  children, 
  title,
  className,
  showSidebar = true,
  showTopbar = true
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div 
      className="flex min-h-screen"
      style={{
        backgroundColor: designTokens.colors['surface-secondary'],
      }}
    >
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={handleSidebarClose}
        />
      )}

      {/* Main content area */}
      <div className={cn(
        'flex-1 flex flex-col',
        showSidebar && 'md:ml-64'
      )}>
        {/* Topbar */}
        {showTopbar && (
          <Topbar 
            title={title}
            onMenuClick={handleMenuClick}
          />
        )}

        {/* Page content */}
        <main 
          className={cn(
            'flex-1 p-4',
            className
          )}
          style={{
            backgroundColor: designTokens.colors['surface-secondary'],
            padding: designTokens.spacing['space-4'],
          }}
        >
          <div 
            className="mx-auto max-w-7xl"
            style={{
              color: designTokens.colors['on-surface'],
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

// Alternative simplified layout for specific use cases
export function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: designTokens.colors['surface-primary'],
        color: designTokens.colors['on-surface'],
        fontFamily: designTokens.typography.fontFamily.sans.join(', '),
        fontSize: designTokens.typography['font-base'].fontSize,
        lineHeight: designTokens.typography['font-base'].lineHeight,
      }}
    >
      {children}
    </div>
  )
}

// Layout with custom background
export function CustomLayout({ 
  children, 
  backgroundColor = 'surface-primary',
  padding = 'space-4'
}: { 
  children: React.ReactNode
  backgroundColor?: keyof typeof designTokens.colors
  padding?: keyof typeof designTokens.spacing
}) {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: designTokens.colors[backgroundColor],
        color: designTokens.colors['on-surface'],
        padding: designTokens.spacing[padding],
      }}
    >
      {children}
    </div>
  )
}
