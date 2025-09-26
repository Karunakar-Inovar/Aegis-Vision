import React, { useState } from 'react'
import Sidebar from './Sidebar'
import TabBar from './TabBar'

interface MainLayoutProps {
  children: React.ReactNode
  activeModule: string
  tabs?: {
    id: string
    label: string
  }[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activeModule,
  tabs = [],
  activeTab = '',
  onTabChange = () => {},
}) => {
  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeModule={activeModule} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tab Bar - only show if tabs are provided */}
        {tabs.length > 0 && (
          <TabBar tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        )}
        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
