import React, { useState } from 'react'
import MainLayout from './MainLayout'
import {
  UserIcon,
  UsersIcon,
  ShieldIcon,
  SettingsIcon,
  ServerIcon,
  DatabaseIcon,
  BellIcon,
  KeyIcon,
  LogOutIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
} from 'lucide-react'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users')
  const adminTabs = [
    {
      id: 'users',
      label: 'Users & Access',
    },
    {
      id: 'system',
      label: 'System Settings',
    },
    {
      id: 'storage',
      label: 'Storage Management',
    },
    {
      id: 'logs',
      label: 'System Logs',
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      role: 'Administrator',
      status: 'Active',
      lastActive: '2023-06-15T09:32:45',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 2,
      name: 'Jamie Wilson',
      email: 'jamie.wilson@example.com',
      role: 'Supervisor',
      status: 'Active',
      lastActive: '2023-06-15T10:15:22',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 3,
      name: 'Taylor Reed',
      email: 'taylor.reed@example.com',
      role: 'Technician',
      status: 'Active',
      lastActive: '2023-06-14T16:45:11',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 4,
      name: 'Jordan Casey',
      email: 'jordan.casey@example.com',
      role: 'Operator',
      status: 'Inactive',
      lastActive: '2023-06-10T11:23:56',
      avatar:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
    {
      id: 5,
      name: 'Riley Zhang',
      email: 'riley.zhang@example.com',
      role: 'Viewer',
      status: 'Pending',
      lastActive: null,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    },
  ]

  // User roles with permissions
  const roles = [
    {
      name: 'Administrator',
      permissions: [
        'Full system access',
        'User management',
        'System configuration',
        'Camera management',
        'Model training',
        'Analytics access',
      ],
      users: 2,
    },
    {
      name: 'Supervisor',
      permissions: [
        'View all cameras',
        'Review incidents',
        'Access analytics',
        'Export reports',
      ],
      users: 3,
    },
    {
      name: 'Technician',
      permissions: ['Camera setup', 'System maintenance', 'View analytics'],
      users: 5,
    },
    {
      name: 'Operator',
      permissions: [
        'View assigned cameras',
        'Report incidents',
        'Basic analytics',
      ],
      users: 8,
    },
    {
      name: 'Viewer',
      permissions: ['View dashboards', 'View reports'],
      users: 6,
    },
  ]

  return (
    <MainLayout
      activeModule="admin"
      tabs={adminTabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Users & Access Management</h1>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm flex items-center">
                <PlusIcon size={16} className="mr-2" />
                Add User
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm flex items-center">
                <ShieldIcon size={16} className="mr-2" />
                Manage Roles
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-700 px-4 py-3 flex items-center justify-between">
              <h3 className="font-medium">System Users</h3>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-sm w-64"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-750">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'Administrator'
                              ? 'bg-purple-500/20 text-purple-400'
                              : user.role === 'Supervisor'
                              ? 'bg-blue-500/20 text-blue-400'
                              : user.role === 'Technician'
                              ? 'bg-green-500/20 text-green-400'
                              : user.role === 'Operator'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.status === 'Active'
                              ? 'bg-green-500/20 text-green-400'
                              : user.status === 'Inactive'
                              ? 'bg-gray-500/20 text-gray-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                        {user.lastActive
                          ? new Date(user.lastActive).toLocaleString()
                          : 'Never'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="p-1 text-gray-400 hover:text-white">
                            <EditIcon size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-white">
                            <KeyIcon size={16} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-white">
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Roles and Permissions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 px-4 py-3">
                <h3 className="font-medium">User Roles</h3>
              </div>
              <div className="p-4 space-y-4">
                {roles.map((role) => (
                  <div key={role.name} className="bg-gray-750 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <ShieldIcon size={16} className="mr-2 text-blue-400" />
                        <span className="font-medium">{role.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">
                          {role.users} users
                        </span>
                        <button className="p-1 text-gray-400 hover:text-white">
                          <EditIcon size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      {role.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center">
                          <CheckIcon
                            size={12}
                            className="mr-1 text-green-400"
                          />
                          <span>{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 px-4 py-3">
                <h3 className="font-medium">Recent Activity</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                      <img
                        src={users[0].avatar}
                        alt={users[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm">
                        <span className="font-medium">{users[0].name}</span>{' '}
                        changed system settings
                      </div>
                      <div className="text-xs text-gray-400">
                        10 minutes ago
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                      <img
                        src={users[1].avatar}
                        alt={users[1].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm">
                        <span className="font-medium">{users[1].name}</span>{' '}
                        added a new camera
                      </div>
                      <div className="text-xs text-gray-400">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                      <img
                        src={users[0].avatar}
                        alt={users[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm">
                        <span className="font-medium">{users[0].name}</span>{' '}
                        modified user permissions for{' '}
                        <span className="font-medium">{users[2].name}</span>
                      </div>
                      <div className="text-xs text-gray-400">5 hours ago</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                      <img
                        src={users[2].avatar}
                        alt={users[2].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm">
                        <span className="font-medium">{users[2].name}</span>{' '}
                        exported analytics reports
                      </div>
                      <div className="text-xs text-gray-400">
                        Yesterday at 4:30 PM
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                      <img
                        src={users[0].avatar}
                        alt={users[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm">
                        <span className="font-medium">{users[0].name}</span>{' '}
                        created a new user account
                      </div>
                      <div className="text-xs text-gray-400">
                        Yesterday at 2:15 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 px-4 py-3">
                <h3 className="font-medium">General Settings</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm mb-2">System Name</label>
                  <input
                    type="text"
                    defaultValue="Vision AI Quality Control System"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Default Language</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese (Simplified)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Time Zone</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                    <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                    <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                    <option>(UTC+00:00) UTC</option>
                    <option>(UTC+01:00) Central European Time</option>
                    <option>(UTC+08:00) China Standard Time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Date Format</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 px-4 py-3">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-400">
                      Receive system alerts via email
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-gray-400">
                      Receive critical alerts via SMS
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-gray-600 rounded-full relative">
                    <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Browser Notifications</div>
                    <div className="text-sm text-gray-400">
                      Show browser notifications
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    Notification Frequency
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                    <option>Immediately</option>
                    <option>Hourly digest</option>
                    <option>Daily digest</option>
                    <option>Weekly digest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 px-4 py-3">
                <h3 className="font-medium">System Information</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Version</span>
                    <span className="text-sm">2.4.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">License</span>
                    <span className="text-sm">Enterprise</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">
                      License Expires
                    </span>
                    <span className="text-sm">Dec 31, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Last Update</span>
                    <span className="text-sm">Jun 10, 2023</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm">
                    Check for Updates
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="border-b border-gray-700 px-4 py-3">
                <h3 className="font-medium">Security</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-400">
                      Require 2FA for all users
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Password Rotation</div>
                    <div className="text-sm text-gray-400">
                      Require password change every 90 days
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-gray-400">
                      Automatically log out after inactivity
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    Timeout Period (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    min="5"
                    max="120"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'storage' && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center h-64">
          <span className="text-gray-500">
            Storage management interface would appear here
          </span>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center h-64">
          <span className="text-gray-500">System logs would appear here</span>
        </div>
      )}
    </MainLayout>
  )
}

export default AdminPage
