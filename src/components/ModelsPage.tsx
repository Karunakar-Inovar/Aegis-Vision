import { useState } from 'react'
import MainLayout from './MainLayout'
import ModelTrainingJobsPage from './ModelTrainingJobsPage'
import ModelPerformancePage from './ModelPerformancePage'
import ModelVersionsPage from './ModelVersionsPage'
import ModelDeploymentPage from './ModelDeploymentPage'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'

const ModelsPage = () => {
  const { loading, isAuthenticated } = useAuthRedirect()
  const [activeTab, setActiveTab] = useState('training')

  const modelsTabs = [
    { id: 'training', label: 'Model Training Jobs' },
    { id: 'performance', label: 'Performance' },
    { id: 'versions', label: 'Versions' },
    { id: 'deployment', label: 'Deployment' },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'training':
        return <ModelTrainingJobsPage />
      case 'performance':
        return <ModelPerformancePage />
      case 'versions':
        return <ModelVersionsPage />
      case 'deployment':
        return <ModelDeploymentPage />
      default:
        return <ModelTrainingJobsPage />
    }
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white text-lg">Loading models...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (redirect will happen in useAuthRedirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <MainLayout
      activeModule="models"
      tabs={modelsTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {renderTabContent()}
    </MainLayout>
  )
}

export default ModelsPage