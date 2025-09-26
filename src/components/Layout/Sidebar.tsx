import React from 'react'
import { 
  Home,
  Camera,
  Search,
  FileText,
  Brain,
  Settings,
  AlertTriangle,
  BarChart3,
  Users,
  HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
  isActive?: boolean
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    isActive: true,
  },
  {
    id: 'camera-setup',
    label: 'Camera Setup',
    icon: Camera,
    href: '/camera-setup',
  },
  {
    id: 'inspection',
    label: 'Inspection',
    icon: Search,
    href: '/inspection',
    badge: '3',
  },
  {
    id: 'annotation',
    label: 'Annotation',
    icon: FileText,
    href: '/annotation',
  },
  {
    id: 'model-training',
    label: 'Model Training',
    icon: Brain,
    href: '/model-training',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: AlertTriangle,
    href: '/alerts',
    badge: '5',
  },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    href: '/users',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: HelpCircle,
    href: '/help',
  },
]

export const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  isOpen = true, 
  onClose 
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Logo/Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-sm font-bold text-white">AV</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              Aegis Vision
            </span>
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 md:hidden"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                  item.isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    className={cn(
                      'w-5 h-5',
                      item.isActive 
                        ? 'text-primary-600' 
                        : 'text-gray-400 group-hover:text-gray-600'
                    )} 
                  />
                  <span>{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-md bg-gray-50">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">JS</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                John Smith
              </p>
              <p className="text-xs text-gray-500 truncate">
                Operator
              </p>
            </div>
            <button className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
