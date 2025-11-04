import React, { useState, useEffect } from 'react';
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
  Settings,
  Activity,
  Loader
} from 'lucide-react';
import { Link } from 'react-router';
import CaseService from '../services/CaseServices';
import AuthService from '../services/AuthService';
import { Navigate,useNavigate } from 'react-router';

export default function CasesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const {authUser,logOutUser} = AuthService()
  const fullName= authUser.full_name.split(" ").slice(0, 2).join(" ");


  // Fetch cases on component mount and when filters change
  useEffect(() => {
    fetchCases();
  }, [selectedFilter, currentPage, searchTerm]);

  const fetchCases = async () => {
    setLoading(true);
    
    const params = {
      page: currentPage,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };

    // Add status filter if not 'all'
    if (selectedFilter !== 'all') {
      params.status = selectedFilter;
    }

    // Add search term
    if (searchTerm.trim()) {
      params.search = searchTerm.trim();
    }

    const result = await CaseService.getAllCases(params);

    if (result.success) {
      setCases(result.data || []);
      setPagination(result.pagination);
      setStats(result.stats);
    } else {
      console.error('Error fetching cases:', result.message);
      setCases([]);
    }

    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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


  const getStatusConfig = (status) => {
    const configs = {
      'open': { 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: Clock,
        label: 'Open'
      },
      'investigating': { 
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: AlertCircle,
        label: 'Investigating'
      },
      'solved': { 
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle,
        label: 'Solved'
      },
      'closed': { 
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: XCircle,
        label: 'Closed'
      }
    };
    return configs[status] || configs['open'];
  };

  const statsData = [
    { label: 'Total Cases', value: stats?.total || '0', color: 'bg-blue-500' },
    { label: 'Open Cases', value: stats?.open || '0', color: 'bg-yellow-500' },
    { label: 'Investigating', value: stats?.investigating || '0', color: 'bg-orange-500' },
    { label: 'Solved', value: stats?.solved || '0', color: 'bg-green-500' },
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
                {authUser.userType}
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
              <a href="/cases/all-cases" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
                <Activity size={20} />
                Cases
              </a>
              <a href="/users/all" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Users size={20} />
                User Management
              </a>
              <a href="/reports/all" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <FileText size={20} />
                Crime Report
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Case Management</h1>
              <p className="text-gray-600">View and manage all criminal cases</p>
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
                      placeholder="Search by case number, title, or location..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    />
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleFilterChange('all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'all'
                          ? 'bg-[#2E7BC4] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleFilterChange('open')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'open'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleFilterChange('investigating')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'investigating'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Investigating
                    </button>
                    <button
                      onClick={() => handleFilterChange('solved')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'solved'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Solved
                    </button>
                  </div>

                  {/* New Case Button */}
                  <Link to='/cases/new-case' className="flex items-center gap-2 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors whitespace-nowrap">
                    <Plus size={20} />
                    New Case
                  </Link>
                </div>
              </div>

              {/* Case List */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader className="animate-spin text-[#2E7BC4]" size={40} />
                </div>
              ) : cases.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No cases found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cases.map((caseItem) => {
                    const statusConfig = getStatusConfig(caseItem.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={caseItem._id}
                        className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          {/* Left Section */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="font-bold text-gray-800 text-lg">{caseItem.caseNumber}</span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color} flex items-center gap-1`}>
                                    <StatusIcon size={14} />
                                    {statusConfig.label}
                                  </span>
                                </div>
                                
                                <p className="text-gray-800 font-medium mb-1">{caseItem.caseTitle}</p>
                                <p className="text-gray-600 text-sm mb-2">{caseItem.description}</p>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                  <span>📍 {caseItem.location}</span>
                                  <span>📅 {new Date(caseItem.incidentDate).toLocaleDateString()}</span>
                                  <span>👮 {caseItem.assignedOfficer?.full_name || 'Unassigned'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Section - Action Button */}
                          <div>
                            <Link 
                              to={`/cases/${caseItem.caseNumber}`}
                              className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                              <Eye size={18} />
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {pagination && (
                <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {pagination.currentPage * pagination.limit - pagination.limit + 1}-
                    {Math.min(pagination.currentPage * pagination.limit, pagination.total)} of {pagination.total} cases
                  </p>
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
                      disabled={currentPage >= pagination.totalPages}
                      className="px-4 py-2 bg-[#2E7BC4] text-white rounded-lg hover:bg-[#1a5a94] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}