import React, { useState,useEffect } from 'react';
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
  Search,
  Activity
} from 'lucide-react';
import AuthService from '../services/AuthService';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const{authUser} = AuthService()
  const fullName = authUser?.full_name
    ? authUser.full_name.split(" ").slice(0, 2).join(" ")
    : "User";

  useEffect(() => {
      console.log(authUser)
  }, [authUser]);

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
                {authUser.userType.toUpperCase()}
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
                  {authUser.full_name.charAt(0)}
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
              { authUser?.userType === 'admin' && (
              <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <LayoutDashboard size={20} />
                Dashboard
              </a>
              )}
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
              <a href="/profile" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
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
                      {authUser.full_name.charAt(0)}
                    </div>
                    <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                      <Camera size={18} className="text-gray-600" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{authUser.full_name}</h2>
                        <p className="text-gray-600">@{authUser.username}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            authUser.userType === 'admin' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {authUser.userType === 'admin' ? <Shield size={12} /> : <UserCheck size={12} />}
                            {authUser.userType.toUpperCase()}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            ● ACTIVE
                          </span>
                        </div>
                      </div>
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
                        <p className="font-medium text-gray-800">{authUser.email}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                        <p className="font-medium text-gray-800">{authUser.phone_number}</p>
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
                          <p className="font-medium text-gray-800">{authUser.badge_number}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                        <Shield className="text-[#2E7BC4]" size={20} />
                        <div>
                          <p className="text-xs text-gray-500">Rank</p>
                          <p className="font-medium text-gray-800">{authUser.rank}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                        <Building2 className="text-[#2E7BC4]" size={20} />
                        <div>
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="font-medium text-gray-800">{authUser.department}</p>
                        </div>
                      </div>
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