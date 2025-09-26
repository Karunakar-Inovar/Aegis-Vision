import React, { useState } from 'react'
import Header from './Header'
import CameraGrid from './CameraGrid'
import AlertDrawer from './AlertDrawer'
import { AlertCircleIcon } from 'lucide-react'

const Dashboard = () => {
  const [isAlertDrawerOpen, setIsAlertDrawerOpen] = useState(false)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      camera: 'Camera 1',
      message: 'Motion detected in restricted area',
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      severity: 'high',
    },
    {
      id: 2,
      camera: 'Camera 3',
      message: 'Person detected in safety zone',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      severity: 'medium',
    },
    {
      id: 3,
      camera: 'Camera 5',
      message: 'Object left unattended',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      severity: 'low',
    },
    {
      id: 4,
      camera: 'Camera 2',
      message: 'Unauthorized access attempt',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      severity: 'high',
    },
  ])

  const toggleAlertDrawer = () => {
    setIsAlertDrawerOpen(!isAlertDrawerOpen)
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white overflow-hidden">
      <Header />
      <div className="relative flex-grow flex">
        <main className="flex-grow p-4">
          <CameraGrid />
        </main>
        <AlertDrawer
          isOpen={isAlertDrawerOpen}
          onClose={() => setIsAlertDrawerOpen(false)}
          alerts={alerts}
        />
        <button
          onClick={toggleAlertDrawer}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
          aria-label="Toggle alerts"
        >
          <AlertCircleIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {alerts.length}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Dashboard
