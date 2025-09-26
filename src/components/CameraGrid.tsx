import React from 'react'
import CameraFeed from './CameraFeed'

const CameraGrid = () => {
  // Mock camera feed data
  const cameras = [
    {
      id: 1,
      name: 'Main Entrance',
      status: 'active',
      roiStatus: 'normal',
      imageUrl:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Parking Lot',
      status: 'active',
      roiStatus: 'warning',
      imageUrl:
        'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Warehouse',
      status: 'active',
      roiStatus: 'alert',
      imageUrl:
        'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      name: 'Server Room',
      status: 'active',
      roiStatus: 'normal',
      imageUrl:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      name: 'Loading Dock',
      status: 'active',
      roiStatus: 'normal',
      imageUrl:
        'https://images.unsplash.com/photo-1597149565096-4b5dbd9c3262?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      name: 'Hallway',
      status: 'active',
      roiStatus: 'normal',
      imageUrl:
        'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 7,
      name: 'Office Area',
      status: 'active',
      roiStatus: 'warning',
      imageUrl:
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 8,
      name: 'Perimeter',
      status: 'active',
      roiStatus: 'normal',
      imageUrl:
        'https://images.unsplash.com/photo-1523346830303-4673c7f3a086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cameras.map((camera) => (
        <CameraFeed key={camera.id} camera={camera} />
      ))}
    </div>
  )
}

export default CameraGrid
