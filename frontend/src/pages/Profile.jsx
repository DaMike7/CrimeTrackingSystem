import React, { useState } from 'react';
import { 
  LocateFixed,
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  Shield,
  Award,
  Building2,
  Edit,
  Camera,
  UserCheck,
  Search
} from 'lucide-react';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user data
  const user = {
    email: 'john.smith@police.gov',
    full_name: 'John Smith',
    phone_number: '+1 (234) 567-8900',
    username: 'jsmith',
    profile_picture: '',
    userType: 'officer',
    badge_number: 'BD-2024-001',
    rank: 'Detective',
    department: 'Criminal Investigation',
    createdAt: '2024-01-15',
    lastLogin: '2024-11-02 14:30',
    casesAssigned: 23,
    casesCompleted: 18,
    status: 'Active'
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
                  {user.full_name.charAt(0)}
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
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
              <p className="text-gray-600">View and manage your account information</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              {/* Cover/Header Section */}
              <div className="h-32 bg-gradient-to-r from-[#2E7BC4] to-[#1a5a94]"></div>
              
              {/* Profile Info Section */}
              <div className="px-6 pb-6">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#2E7BC4] to-[#1a5a94] rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {user.full_name.charAt(0)}
                    </div>
                    <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                      <Camera size={18} className="text-gray-600" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{user.full_name}</h2>
                        <p className="text-gray-600">@{user.username}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            user.userType === 'admin' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {user.userType === 'admin' ? <Shield size={12} /> : <UserCheck size={12} />}
                            {user.userType.toUpperCase()}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            ● {user.status}
                          </span>
                        </div>
                      </div>

                      <button className="flex items-center gap-2 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors">
                        <Edit size={18} />
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Mail className="text-[#2E7BC4]" size={20} />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Email Address</p>
                        <p className="font-medium text-gray-800">{user.email}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                        <p className="font-medium text-gray-800">{user.phone_number}</p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Shield className="text-[#2E7BC4]" size={20} />
                      Professional Details
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                        <Award className="text-[#2E7BC4]" size={20} />
                        <div>
                          <p className="text-xs text-gray-500">Badge Number</p>
                          <p className="font-medium text-gray-800">{user.badge_number}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                        <Shield className="text-[#2E7BC4]" size={20} />
                        <div>
                          <p className="text-xs text-gray-500">Rank</p>
                          <p className="font-medium text-gray-800">{user.rank}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                        <Building2 className="text-[#2E7BC4]" size={20} />
                        <div>
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="font-medium text-gray-800">{user.department}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="text-[#2E7BC4]" size={20} />
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">Account Created</p>
                      <p className="font-medium text-gray-800">{user.createdAt}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">Last Login</p>
                      <p className="font-medium text-gray-800">{user.lastLogin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Profile