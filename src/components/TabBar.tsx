import React from 'react'

interface TabBarProps {
  tabs: {
    id: string
    label: string
  }[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-4 font-medium text-sm relative ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabBar
