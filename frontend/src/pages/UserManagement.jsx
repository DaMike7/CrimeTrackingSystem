import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  LocateFixed,
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  UserCheck,
  Shield,
  Activity,
} from 'lucide-react';

const UserManagement = () =>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const users = [
    {
      id: '1',
      email: 'john.smith@police.gov',
      full_name: 'John Smith',
      phone_number: '+1234567890',
      username: 'jsmith',
      profile_picture: '',
      userType: 'officer',
      badge_number: 'BD-2024-001',
      rank: 'Detective',
      department: 'Criminal Investigation',
      createdBy: 'Admin',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      email: 'sarah.johnson@police.gov',
      full_name: 'Sarah Johnson',
      phone_number: '+1234567891',
      username: 'sjohnson',
      profile_picture: '',
      userType: 'officer',
      badge_number: 'BD-2024-002',
      rank: 'Officer',
      department: 'Patrol Division',
      createdBy: 'Admin',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      email: 'mike.williams@police.gov',
      full_name: 'Mike Williams',
      phone_number: '+1234567892',
      username: 'mwilliams',
      profile_picture: '',
      userType: 'officer',
      badge_number: 'BD-2024-003',
      rank: 'Sergeant',
      department: 'Traffic Division',
      createdBy: 'Admin',
      createdAt: '2024-01-12'
    },
    {
      id: '4',
      email: 'admin@police.gov',
      full_name: 'Admin User',
      phone_number: '+1234567893',
      username: 'admin',
      profile_picture: '',
      userType: 'admin',
      badge_number: 'N/A',
      rank: 'N/A',
      department: 'Administration',
      createdBy: 'System',
      createdAt: '2024-01-01'
    },
  ];

  const stats = [
    { label: 'Total Users', value: '48', color: 'bg-blue-500' },
    { label: 'Officers', value: '42', color: 'bg-green-500' },
    { label: 'Admins', value: '6', color: 'bg-purple-500' },
    { label: 'Active Today', value: '35', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <LocateFixed className="text-[#2E7BC4]" size={28} />
                <span className="text-xl font-black text-gray-800">C-TRACK</span>
              </div>
              <span className="hidden sm:block px-3 py-1 bg-blue-100 text-[#2E7BC4] text-xs font-semibold rounded-full">
                ADMIN
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-64"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2E7BC4] to-[#1a5a94] rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out mt-16 lg:mt-0`}>
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Admin Interface</h2>
            <nav className="space-y-2">
              <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <LayoutDashboard size={20} />
                Dashboard
              </a>
              <a href="/cases/all-cases" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Activity size={20} />
                Cases
              </a>
              <a href="/users/all" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
                <Users size={20} />
                User Management
              </a>
              <a href="/reports/all" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <FileText size={20} />
                Crime Reports
              </a>
              <a href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Users size={20} />
                Profile
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Settings size={20} />
                Logout
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">User Management</h1>
              <p className="text-gray-600">Manage officers and admin accounts</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className={`${stat.color} w-3 h-12 rounded-full mb-2`}></div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-lg">
              {/* Search and Filter Bar */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search by name, email, badge number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    />
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filterType === 'all'
                          ? 'bg-[#2E7BC4] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Users
                    </button>
                    <button
                      onClick={() => setFilterType('officer')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filterType === 'officer'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Officers
                    </button>
                    <button
                      onClick={() => setFilterType('admin')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filterType === 'admin'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Admins
                    </button>
                  </div>

                  {/* Add User Button */}
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors whitespace-nowrap">
                    <Plus size={20} />
                    Add User
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Badge/Rank
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        {/* User Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#2E7BC4] to-[#1a5a94] rounded-full flex items-center justify-center text-white font-semibold">
                              {user.full_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{user.full_name}</p>
                              <p className="text-sm text-gray-500">@{user.username}</p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800">{user.email}</p>
                          <p className="text-sm text-gray-500">{user.phone_number}</p>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            user.userType === 'admin' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {user.userType === 'admin' ? <Shield size={12} /> : <UserCheck size={12} />}
                            {user.userType.toUpperCase()}
                          </span>
                        </td>

                        {/* Badge/Rank */}
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-800">{user.badge_number}</p>
                          <p className="text-sm text-gray-500">{user.rank}</p>
                        </td>

                        {/* Department */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800">{user.department}</p>
                        </td>

                        {/* Created */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-800">{user.createdAt}</p>
                          <p className="text-sm text-gray-500">by {user.createdBy}</p>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Edit size={18} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-600">Showing 1-4 of 48 users</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-[#2E7BC4] text-white rounded-lg hover:bg-[#1a5a94] transition-colors font-medium">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default UserManagement