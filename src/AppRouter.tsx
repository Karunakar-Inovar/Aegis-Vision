import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import DashboardPage from './components/DashboardPage'
import InspectionPage from './components/InspectionPage'
import DatasetsPage from './components/DatasetsPage'
import ModelsPage from './components/ModelsPage'
import CamerasPage from './components/CamerasPage'
import IncidentsPage from './components/IncidentsPage'
import AnalyticsPage from './components/AnalyticsPage'
import AdminPage from './components/AdminPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes - redirect to dashboard if authenticated */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected routes - require authentication */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inspection" 
            element={
              <ProtectedRoute>
                <InspectionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/datasets" 
            element={
              <ProtectedRoute>
                <DatasetsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/models" 
            element={
              <ProtectedRoute>
                <ModelsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cameras" 
            element={
              <ProtectedRoute>
                <CamerasPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/incidents" 
            element={
              <ProtectedRoute>
                <IncidentsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
