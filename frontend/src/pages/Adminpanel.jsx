import React, { useState,useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  UserPlus, 
  UserCheck, 
  Eye, 
  FilePlus,
  PieChart,
  TrendingUp,
  Bell,
  Search,
  Menu,
  X,
  LocateFixed,
  Activity
} from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router';
import AuthService from '../services/AuthService';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {authUser,logOutUser} = AuthService()
  const fullName= authUser.full_name.split(" ").slice(0, 2).join(" ");
  
  const stats = [
    { label: 'Total Cases', value: '2', icon: FileText, color: 'bg-blue-500' },
    { label: 'Total Officers', value: '0', icon: Users, color: 'bg-red-500' },
    { label: 'Total Crime Reports', value: '4', icon: TrendingUp, color: 'bg-green-500' },
  ];

  const recentReports = [
    { id: 'CR-A8X9Z', type: 'Theft', location: 'Downtown Market', status: 'Pending', time: '2 hours ago' },
    { id: 'CR-B7Y2M', type: 'Assault', location: 'Park Avenue', status: 'Investigating', time: '5 hours ago' },
    { id: 'CR-C3K5N', type: 'Vandalism', location: 'City Hall', status: 'Closed', time: '1 day ago' },
  ];

   useEffect(() => {
      console.log(authUser)
    }, [authUser]);

    const navigate = useNavigate()
    const handleLogout = async (e) => {
      e.preventDefault();
      const result = await logOutUser();
      if (result.status === 200) {
        console.log("User Logged Out!");
        navigate('/admin/signin');
        console.log(result.message);
      } else {
        setLogoutError(result.message);
      }
    };

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
                  {fullName?.charAt(0).toUpperCase() || 'O'}
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
            <h2 className="text-lg font-bold text-gray-800 mb-6">{fullName}</h2>
            <nav className="space-y-2">
              <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
                <LayoutDashboard size={20} />
                Dashboard
              </a>
              <a href="/cases/all-cases" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Activity size={20} />
                Cases
              </a>
              <a href="/users/all" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Settings size={20} />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* User Management */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">User Management</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-shadow">
                    <UserPlus className="text-[#2E7BC4] mb-3" size={32} />
                    <span className="font-semibold text-gray-800">Create Account</span>
                  </button>
                </div>
              </div>

              {/* Crime Reports */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Crime Reports</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Link to='/reports/all' className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-shadow">
                    <Eye className="text-purple-600 mb-3" size={32} />
                    <span className="font-semibold text-gray-800">View Reports</span>
                  </Link>
                  <Link to='/reports/form' className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-md transition-shadow">
                    <FilePlus className="text-orange-600 mb-3" size={32} />
                    <span className="font-semibold text-gray-800">Add Report</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Data Analytics & Recent Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Data Analytics */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Data Analytics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl hover:shadow-md transition-shadow">
                    <BarChart3 className="text-cyan-600 mb-3" size={32} />
                    <span className="font-semibold text-gray-800">Dominant Reports</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl hover:shadow-md transition-shadow">
                    <PieChart className="text-pink-600 mb-3" size={32} />
                    <span className="font-semibold text-gray-800">Mobilization</span>
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