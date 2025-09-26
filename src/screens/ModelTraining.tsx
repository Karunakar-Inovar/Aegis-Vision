import React, { useState } from 'react'
import { PageWrapper } from '@/components/Layout/PageWrapper'
import { Play, Pause, Download, Upload, Brain, TrendingUp } from 'lucide-react'
import { mockModels } from '@/mock/modelData'
import type { Model } from '@/types/types'

export const ModelTraining: React.FC = () => {
  const [models] = useState(mockModels)
  const [selectedModel, setSelectedModel] = useState<Model | null>(models[0])

  const getStatusColor = (status: Model['status']) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'training':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <PageWrapper title="Model Training">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Model Training</h1>
            <p className="text-gray-600">Train and manage your AI models</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              <Upload className="w-4 h-4" />
              <span>Import Model</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              <Brain className="w-4 h-4" />
              <span>New Model</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Models</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {models.map((model: Model) => (
                  <div
                    key={model.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedModel?.id === model.id ? 'bg-primary-50 border-r-2 border-r-primary-600' : ''
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{model.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <div>Version: {model.version}</div>
                      <div>Type: {model.type}</div>
                      {model.status === 'ready' && (
                        <div className="flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                          <span>Accuracy: {model.accuracy}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Model Details */}
          <div className="lg:col-span-2">
            {selectedModel ? (
              <div className="space-y-6">
                {/* Model Info */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedModel.name}</h2>
                    <div className="flex items-center space-x-2">
                      {selectedModel.status === 'training' ? (
                        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                          <Pause className="w-4 h-4" />
                          <span>Stop Training</span>
                        </button>
                      ) : (
                        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                          <Play className="w-4 h-4" />
                          <span>Start Training</span>
                        </button>
                      )}
                      
                      {selectedModel.status === 'ready' && (
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          <Download className="w-4 h-4" />
                          <span>Export</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Model Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Version:</span>
                          <span className="text-gray-900">{selectedModel.version}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Type:</span>
                          <span className="text-gray-900 capitalize">{selectedModel.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className={`capitalize ${
                            selectedModel.status === 'ready' ? 'text-green-600' :
                            selectedModel.status === 'training' ? 'text-blue-600' :
                            'text-red-600'
                          }`}>
                            {selectedModel.status}
                          </span>
                        </div>
                        {selectedModel.status === 'ready' && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Accuracy:</span>
                            <span className="text-gray-900 font-medium">{selectedModel.accuracy}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Training Data</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Images:</span>
                          <span className="text-gray-900">{selectedModel.trainingData.totalImages.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Annotated:</span>
                          <span className="text-gray-900">{selectedModel.trainingData.annotatedImages.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Classes:</span>
                          <span className="text-gray-900">{selectedModel.trainingData.classes.length}</span>
                        </div>
                        {selectedModel.trainingData.lastTrainingDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Last Training:</span>
                            <span className="text-gray-900">
                              {new Date(selectedModel.trainingData.lastTrainingDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training Progress */}
                {selectedModel.status === 'training' && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Training Progress</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>67%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Current Epoch:</span>
                          <span className="ml-2 font-medium">67 / 100</span>
                        </div>
                        <div>
                          <span className="text-gray-500">ETA:</span>
                          <span className="ml-2 font-medium">2h 15m</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Loss:</span>
                          <span className="ml-2 font-medium">0.045</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Validation Acc:</span>
                          <span className="ml-2 font-medium">94.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Configuration */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Training Configuration</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Epochs</label>
                        <input
                          type="number"
                          value={selectedModel.configuration.epochs}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          disabled={selectedModel.status === 'training'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Batch Size</label>
                        <input
                          type="number"
                          value={selectedModel.configuration.batchSize}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          disabled={selectedModel.status === 'training'}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Learning Rate</label>
                        <input
                          type="number"
                          step="0.0001"
                          value={selectedModel.configuration.learningRate}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          disabled={selectedModel.status === 'training'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Validation Split</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          value={selectedModel.configuration.validationSplit}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          disabled={selectedModel.status === 'training'}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedModel.configuration.augmentation}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        disabled={selectedModel.status === 'training'}
                      />
                      <span className="ml-2 text-sm text-gray-700">Enable data augmentation</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Model Selected</h3>
                <p className="text-gray-500">Select a model from the list to view its details and configuration.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
