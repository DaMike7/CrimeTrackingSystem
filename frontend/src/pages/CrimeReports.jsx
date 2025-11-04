import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { 
  Search, 
  Plus, 
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
  MapPin,
  Calendar,
  ChevronRight,
  Image,
  Download,
  Activity,
  Loader
} from 'lucide-react';
import AuthService from '../services/AuthService';
import CrimeService from '../services/CrimeServices';

const CrimeReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logoutError, setLogoutError] = useState(null);

  const { logOutUser, authUser } = AuthService();
  const{getAllReports,getReportByReference ,getReportStats } = CrimeService()
  const navigate = useNavigate();
  const fullName= authUser.full_name.split(" ").slice(0, 2).join(" ");

  // Fetch reports
  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    
    const filters = {
      status: selectedFilter === 'all' ? '' : selectedFilter,
      search: searchTerm,
      page: currentPage,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };

    const result = await getAllReports(filters);
    
    if (result.success) {
      setReports(result.data);
      setStats(result.stats);
      setPagination(result.pagination);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  // Initial fetch and refetch when filters change
  useEffect(() => {
    fetchReports();
  }, [selectedFilter, currentPage]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        setCurrentPage(1); // Reset to first page on search
        fetchReports();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && pagination?.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && pagination?.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const viewReportDetails = async (referenceNumber) => {
    const result = await getReportByReference(referenceNumber);
    if (result.success) {
      setSelectedReport(result.data);
    } else {
      setError(result.message);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      'pending': { 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: Clock,
        label: 'Pending'
      },
      'investigating': { 
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: AlertCircle,
        label: 'Investigating'
      },
      'resolved': { 
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle,
        label: 'Resolved'
      },
      'closed': { 
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: XCircle,
        label: 'Closed'
      }
    };
    return configs[status] || configs['pending'];
  };

  const getCrimeTypeConfig = (type) => {
    const configs = {
      'theft': { color: 'bg-orange-500', label: 'Theft', icon: '🔒' },
      'assault': { color: 'bg-red-500', label: 'Assault', icon: '⚠️' },
      'drugs': { color: 'bg-purple-500', label: 'Drugs', icon: '💊' },
      'vandalism': { color: 'bg-yellow-500', label: 'Vandalism', icon: '🔨' },
      'suspicious': { color: 'bg-blue-500', label: 'Suspicious Activity', icon: '👁️' },
      'other': { color: 'bg-gray-500', label: 'Other', icon: '📋' }
    };
    return configs[type] || configs['other'];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statsDisplay = stats ? [
    { label: 'Total Reports', value: stats.total || 0, color: 'bg-blue-500' },
    { label: 'Pending', value: stats.pending || 0, color: 'bg-yellow-500' },
    { label: 'Investigating', value: stats.investigating || 0, color: 'bg-orange-500' },
    { label: 'Resolved', value: stats.resolved || 0, color: 'bg-green-500' },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
              <a href="/reports/all" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
                <FileText size={20} />
                Crime Reports
              </a>
              <a href="/users/all" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Users size={20} />
                User Management
              </a>
              <a href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Users size={20} />
                Profile
              </a>
              <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Crime Reports</h1>
              <p className="text-gray-600">View and manage all reported crimes</p>
            </div>

            {/* Stats Cards */}
            {statsDisplay.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statsDisplay.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                    <div className={`${stat.color} w-3 h-12 rounded-full mb-2`}></div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

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
                      placeholder="Search by reference number, description, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                      onClick={() => handleFilterChange('pending')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Pending
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
                      onClick={() => handleFilterChange('resolved')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'resolved'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Resolved
                    </button>
                  </div>

                  {/* New Report Button */}
                  <button 
                    onClick={() => navigate('/report/form')}
                    className="flex items-center gap-2 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors whitespace-nowrap"
                  >
                    <Plus size={20} />
                    New Report
                  </button>
                </div>
              </div>

              {/* Reports List */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader className="animate-spin text-[#2E7BC4]" size={40} />
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No reports found</p>
                  <p className="text-sm">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {reports.map((report) => {
                    const statusConfig = getStatusConfig(report.status);
                    const crimeTypeConfig = getCrimeTypeConfig(report.crimeType);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <div
                        key={report._id}
                        onClick={() => viewReportDetails(report.referenceNumber)}
                        className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          {/* Left Section */}
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              {/* Crime Type Indicator */}
                              <div className={`w-1 h-16 ${crimeTypeConfig.color} rounded-full flex-shrink-0`}></div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap mb-2">
                                  <span className="font-bold text-gray-800 text-lg">{report.referenceNumber}</span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color} flex items-center gap-1`}>
                                    <StatusIcon size={14} />
                                    {statusConfig.label}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${crimeTypeConfig.color}`}>
                                    {crimeTypeConfig.icon} {crimeTypeConfig.label}
                                  </span>
                                  {report.evidence && (
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold flex items-center gap-1">
                                      <Image size={12} />
                                      Evidence
                                    </span>
                                  )}
                                </div>
                                
                                <p className="text-gray-700 mb-3 line-clamp-2">{report.description}</p>
                                
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {report.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {formatDate(report.incidentDate)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Section - Action Button */}
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                              View Details
                              <ChevronRight size={18} />
                            </button>
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
                    Showing {((pagination.currentPage - 1) * pagination.limit) + 1}-
                    {Math.min(pagination.currentPage * pagination.limit, pagination.totalReports)} of {pagination.totalReports} reports
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handlePageChange('prev')}
                      disabled={!pagination.hasPrevPage}
                      className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors font-medium ${
                        pagination.hasPrevPage 
                          ? 'hover:bg-gray-50 cursor-pointer' 
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      Previous
                    </button>
                    <button 
                      onClick={() => handlePageChange('next')}
                      disabled={!pagination.hasNextPage}
                      className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                        pagination.hasNextPage
                          ? 'bg-[#2E7BC4] text-white hover:bg-[#1a5a94] cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
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

      {/* Modal Popup */}
      {selectedReport && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedReport(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedReport.referenceNumber}</h2>
                <p className="text-sm text-gray-500 mt-1">Reported on {formatDate(selectedReport.createdAt)}</p>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Status and Crime Type */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {(() => {
                  const statusConfig = getStatusConfig(selectedReport.status);
                  const crimeTypeConfig = getCrimeTypeConfig(selectedReport.crimeType);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <>
                      <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${statusConfig.color} flex items-center gap-2`}>
                        <StatusIcon size={16} />
                        {statusConfig.label}
                      </span>
                      <span className={`px-4 py-2 rounded-lg text-sm font-bold text-white ${crimeTypeConfig.color}`}>
                        {crimeTypeConfig.icon} {crimeTypeConfig.label}
                      </span>
                    </>
                  );
                })()}
              </div>

              {/* Evidence Image */}
              {selectedReport.evidence && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Image size={20} />
                    Evidence
                  </h3>
                  <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                    <img 
                      src={selectedReport.evidence} 
                      alt="Evidence" 
                      className="w-full h-96 object-cover"
                    />
                    <button className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-lg shadow-lg transition-all">
                      <Download size={20} className="text-gray-700" />
                    </button>
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Location</h3>
                  <p className="text-gray-800 flex items-center gap-2">
                    <MapPin size={18} className="text-[#2E7BC4]" />
                    {selectedReport.location}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Incident Date</h3>
                  <p className="text-gray-800 flex items-center gap-2">
                    <Calendar size={18} className="text-[#2E7BC4]" />
                    {formatDate(selectedReport.incidentDate)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedReport.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 flex-wrap">
                <button 
                  onClick={() => navigate('/cases/all-cases')}
                  className="flex-1 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors"
                >
                  Assign to Case
                </button>
                <select
                  value={selectedReport.status}
                  onChange={(e) => handleStatusUpdate(selectedReport.referenceNumber, e.target.value)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrimeReports;