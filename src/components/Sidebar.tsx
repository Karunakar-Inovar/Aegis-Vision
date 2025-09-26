import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboardIcon,
  CameraIcon,
  DatabaseIcon,
  BrainCircuitIcon,
  ScanLineIcon,
  AlertOctagonIcon,
  BarChartIcon,
  ShieldIcon,
  UserIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
  LogOutIcon,
} from 'lucide-react'

interface SidebarProps {
  activeModule: string
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const location = useLocation()
  const { user, signOut } = useAuth()

  const modules = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboardIcon size={20} />,
      path: '/',
    },
    {
      id: 'cameras',
      label: 'Cameras',
      icon: <CameraIcon size={20} />,
      path: '/cameras',
    },
    {
      id: 'datasets',
      label: 'Datasets',
      icon: <DatabaseIcon size={20} />,
      path: '/datasets',
    },
    {
      id: 'models',
      label: 'Models',
      icon: <BrainCircuitIcon size={20} />,
      path: '/models',
    },
    {
      id: 'inspection',
      label: 'Inspection',
      icon: <ScanLineIcon size={20} />,
      path: '/inspection',
    },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: <AlertOctagonIcon size={20} />,
      path: '/incidents',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChartIcon size={20} />,
      path: '/analytics',
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: <ShieldIcon size={20} />,
      path: '/admin',
    },
  ]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      // Navigation will be handled by the AuthContext automatically
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="w-64 h-full bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <img src="/aegis-logo.png" alt="Aegis Vision Logo" className="h-10 w-auto" />
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {modules.map((module) => (
            <li key={module.id}>
              <Link
                to={module.path}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${activeModule === module.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <span className="mr-3">{module.icon}</span>
                <span>{module.label}</span>
                {activeModule === module.id && (
                  <span className="ml-auto w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* User Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {isDarkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>
          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label="Settings"
          >
            <SettingsIcon size={16} />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label="Logout"
            title="Sign out"
          >
            <LogOutIcon size={16} />
          </button>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden mr-3 flex items-center justify-center">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon size={20} className="text-gray-300" />
            )}
          </div>
          <div>
            <div className="font-medium text-sm">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </div>
            <div className="text-xs text-gray-400">
              {user?.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar