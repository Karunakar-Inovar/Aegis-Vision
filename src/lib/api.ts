// API configuration and utilities for Aegis Vision AI Manufacturing Platform

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// API response types
export interface ApiResponse<T = any> {
  data: T
  message: string
  status: 'success' | 'error'
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// HTTP client configuration
class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  removeAuthToken() {
    delete this.defaultHeaders['Authorization']
  }
}

// Create and export API client instance
export const apiClient = new ApiClient()

// Camera management API
export const cameraApi = {
  async getCameras() {
    return apiClient.get<any[]>('/cameras')
  },

  async getCamera(id: string) {
    return apiClient.get<any>(`/cameras/${id}`)
  },

  async createCamera(data: any) {
    return apiClient.post<any>('/cameras', data)
  },

  async updateCamera(id: string, data: any) {
    return apiClient.put<any>(`/cameras/${id}`, data)
  },

  async deleteCamera(id: string) {
    return apiClient.delete<any>(`/cameras/${id}`)
  },

  async getCameraFeed(id: string) {
    return apiClient.get<any>(`/cameras/${id}/feed`)
  },
}

// Inspection API
export const inspectionApi = {
  async getInspections() {
    return apiClient.get<any[]>('/inspections')
  },

  async getInspection(id: string) {
    return apiClient.get<any>(`/inspections/${id}`)
  },

  async createInspection(data: any) {
    return apiClient.post<any>('/inspections', data)
  },

  async updateInspection(id: string, data: any) {
    return apiClient.put<any>(`/inspections/${id}`, data)
  },

  async deleteInspection(id: string) {
    return apiClient.delete<any>(`/inspections/${id}`)
  },

  async runInspection(id: string, imageData: any) {
    return apiClient.post<any>(`/inspections/${id}/run`, { imageData })
  },
}

// Model training API
export const modelApi = {
  async getModels() {
    return apiClient.get<any[]>('/models')
  },

  async getModel(id: string) {
    return apiClient.get<any>(`/models/${id}`)
  },

  async createModel(data: any) {
    return apiClient.post<any>('/models', data)
  },

  async updateModel(id: string, data: any) {
    return apiClient.put<any>(`/models/${id}`, data)
  },

  async deleteModel(id: string) {
    return apiClient.delete<any>(`/models/${id}`)
  },

  async trainModel(id: string, trainingData: any) {
    return apiClient.post<any>(`/models/${id}/train`, trainingData)
  },

  async getTrainingStatus(id: string) {
    return apiClient.get<any>(`/models/${id}/training-status`)
  },
}

// Annotation API
export const annotationApi = {
  async getAnnotations(imageId: string) {
    return apiClient.get<any[]>(`/annotations?imageId=${imageId}`)
  },

  async createAnnotation(data: any) {
    return apiClient.post<any>('/annotations', data)
  },

  async updateAnnotation(id: string, data: any) {
    return apiClient.put<any>(`/annotations/${id}`, data)
  },

  async deleteAnnotation(id: string) {
    return apiClient.delete<any>(`/annotations/${id}`)
  },
}

// Analytics API
export const analyticsApi = {
  async getDashboardMetrics() {
    return apiClient.get<any>('/analytics/dashboard')
  },

  async getQualityMetrics(timeRange: string) {
    return apiClient.get<any>(`/analytics/quality?timeRange=${timeRange}`)
  },

  async getDefectTrends(timeRange: string) {
    return apiClient.get<any>(`/analytics/defects?timeRange=${timeRange}`)
  },

  async getProductionMetrics(timeRange: string) {
    return apiClient.get<any>(`/analytics/production?timeRange=${timeRange}`)
  },
}

// Alert API
export const alertApi = {
  async getAlerts() {
    return apiClient.get<any[]>('/alerts')
  },

  async getAlert(id: string) {
    return apiClient.get<any>(`/alerts/${id}`)
  },

  async acknowledgeAlert(id: string) {
    return apiClient.put<any>(`/alerts/${id}/acknowledge`, {})
  },

  async dismissAlert(id: string) {
    return apiClient.put<any>(`/alerts/${id}/dismiss`, {})
  },

  async createAlert(data: any) {
    return apiClient.post<any>('/alerts', data)
  },
}

// WebSocket connection for real-time updates
export class WebSocketClient {
  private ws: WebSocket | null = null
  private url: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectInterval = 1000

  constructor(url: string = 'ws://localhost:8000/ws') {
    this.url = url
  }

  connect(onMessage: (data: any) => void, onError?: (error: Event) => void) {
    try {
      this.ws = new WebSocket(this.url)

      this.ws.onopen = () => {
        console.log('WebSocket connected')
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onMessage(data)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('WebSocket disconnected')
        this.reconnect(onMessage, onError)
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        if (onError) onError(error)
      }
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
    }
  }

  private reconnect(onMessage: (data: any) => void, onError?: (error: Event) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect(onMessage, onError)
      }, this.reconnectInterval * this.reconnectAttempts)
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const wsClient = new WebSocketClient()
