import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  LocateFixed,
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  UserCheck,
  Shield,
  Activity,
  Loader
} from 'lucide-react';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router';

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const {authUser, logOutUser} = AuthService()
  const fullName= authUser.full_name.split(" ").slice(0, 2).join(" ");


  const { allUsers, isUsersLoading, getUsers } = UserService();

  // Fetch users on component mount and when page changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    const result = await getUsers(currentPage);
    if (!result.success) {
      console.error('Failed to fetch users:', result.message);
    }
  };

  // Filter users based on search term and filter type
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.badge_number?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || user.userType === filterType;

    return matchesSearch && matchesFilter;
  });

  // Calculate stats from allUsers
  const stats = {
    total: allUsers.length,
    officers: allUsers.filter(u => u.userType === 'officer').length,
    admins: allUsers.filter(u => u.userType === 'admin').length,
    active: allUsers.filter(u => u.isActive).length,
  };

  const statsData = [
    { label: 'Total Users', value: stats.total.toString(), color: 'bg-blue-500' },
    { label: 'Officers', value: stats.officers.toString(), color: 'bg-green-500' },
    { label: 'Admins', value: stats.admins.toString(), color: 'bg-purple-500' },
    { label: 'Active', value: stats.active.toString(), color: 'bg-orange-500' },
  ];

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">User Management</h1>
              <p className="text-gray-600">Manage officers and admin accounts</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statsData.map((stat, index) => (
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
              {isUsersLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader className="animate-spin text-[#2E7BC4]" size={40} />
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No users found</p>
                </div>
              ) : (
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
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                          {/* User Info */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#2E7BC4] to-[#1a5a94] rounded-full flex items-center justify-center text-white font-semibold">
                                {user.full_name?.charAt(0) || 'U'}
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
                              {user.userType?.toUpperCase()}
                            </span>
                          </td>

                          {/* Badge/Rank */}
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-800">{user.badge_number || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{user.rank || 'N/A'}</p>
                          </td>

                          {/* Department */}
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-800">{user.department || 'N/A'}</p>
                          </td>

                          {/* Created */}
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">by {user.createdBy?.full_name || 'System'}</p>
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
              )}

              {/* Pagination */}
              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-600">Showing {filteredUsers.length} users</p>
                <div className="flex gap-2">
                  <button 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-[#2E7BC4] text-white rounded-lg hover:bg-[#1a5a94] transition-colors font-medium"
                  >
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