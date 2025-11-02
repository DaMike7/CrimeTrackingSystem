import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  LocateFixed,
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings
} from 'lucide-react';

export default function CasesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const cases = [
    { 
      id: '1234', 
      caseNumber: 'CASE-2024-1234',
      description: 'Theft at Downtown Market - Suspect fled on motorcycle',
      status: 'open',
      priority: 'high',
      date: '2024-01-15',
      location: 'Downtown Market',
      assignedTo: 'Officer Smith'
    },
    { 
      id: '5678', 
      caseNumber: 'CASE-2024-5678',
      description: 'Assault case near Park Avenue - Two suspects identified',
      status: 'in-progress',
      priority: 'urgent',
      date: '2024-01-14',
      location: 'Park Avenue',
      assignedTo: 'Detective Johnson'
    },
    { 
      id: '9101', 
      caseNumber: 'CASE-2024-9101',
      description: 'Vandalism at City Hall - Property damage reported',
      status: 'closed',
      priority: 'low',
      date: '2024-01-10',
      location: 'City Hall',
      assignedTo: 'Officer Williams'
    },
    { 
      id: '1121', 
      caseNumber: 'CASE-2024-1121',
      description: 'Drug trafficking investigation - Multiple suspects under surveillance',
      status: 'in-progress',
      priority: 'urgent',
      date: '2024-01-12',
      location: 'East District',
      assignedTo: 'Detective Martinez'
    },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      'open': { 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: Clock,
        label: 'Open'
      },
      'in-progress': { 
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: AlertCircle,
        label: 'In Progress'
      },
      'closed': { 
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle,
        label: 'Closed'
      },
      'dismissed': { 
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: XCircle,
        label: 'Dismissed'
      }
    };
    return configs[status] || configs['open'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'bg-gray-500',
      'medium': 'bg-blue-500',
      'high': 'bg-orange-500',
      'urgent': 'bg-red-500'
    };
    return colors[priority] || colors['medium'];
  };

  const stats = [
    { label: 'Total Cases', value: '156', color: 'bg-blue-500' },
    { label: 'Open Cases', value: '42', color: 'bg-yellow-500' },
    { label: 'In Progress', value: '67', color: 'bg-orange-500' },
    { label: 'Closed', value: '47', color: 'bg-green-500' },
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
                OFFICER
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
                  O
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
            <h2 className="text-lg font-bold text-gray-800 mb-6">Officer Interface</h2>
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <LayoutDashboard size={20} />
                Dashboard
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
                <FileText size={20} />
                Cases
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Users size={20} />
                Reports
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <AlertCircle size={20} />
                Alerts
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Case Management</h1>
              <p className="text-gray-600">View and manage all criminal cases</p>
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
                      placeholder="Search by case number, description, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    />
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedFilter('all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'all'
                          ? 'bg-[#2E7BC4] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setSelectedFilter('open')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'open'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => setSelectedFilter('in-progress')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'in-progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => setSelectedFilter('closed')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'closed'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Closed
                    </button>
                  </div>

                  {/* New Case Button */}
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors whitespace-nowrap">
                    <Plus size={20} />
                    New Case
                  </button>
                </div>
              </div>

              {/* Case List */}
              <div className="divide-y divide-gray-200">
                {cases.map((caseItem) => {
                  const statusConfig = getStatusConfig(caseItem.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={caseItem.id}
                      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left Section */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {/* Priority Indicator */}
                            <div className={`w-1 h-12 ${getPriorityColor(caseItem.priority)} rounded-full`}></div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-bold text-gray-800 text-lg">{caseItem.caseNumber}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color} flex items-center gap-1`}>
                                  <StatusIcon size={14} />
                                  {statusConfig.label}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getPriorityColor(caseItem.priority)}`}>
                                  {caseItem.priority.toUpperCase()}
                                </span>
                              </div>
                              
                              <p className="text-gray-700 mb-2">{caseItem.description}</p>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span>📍 {caseItem.location}</span>
                                <span>📅 {caseItem.date}</span>
                                <span>👮 {caseItem.assignedTo}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Action Button */}
                        <div>
                          <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                            <Eye size={18} />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-600">Showing 1-4 of 156 cases</p>
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