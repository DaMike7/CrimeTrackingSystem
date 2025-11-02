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
  Settings,
  MapPin,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Image,
  Download
} from 'lucide-react';

const CrimeReports =() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    { 
      id: '1',
      referenceNumber: 'RPT-2024-001234',
      crimeType: 'theft',
      location: 'Downtown Market, Lagos Island',
      incidentDate: '2024-01-15T14:30:00',
      description: 'Suspect stole a motorcycle from the parking area. Witnesses reported seeing a male suspect wearing a black hoodie fleeing the scene on the stolen vehicle. CCTV footage available.',
      status: 'investigating',
      evidence: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
      createdAt: '2024-01-15T15:00:00'
    },
    { 
      id: '2',
      referenceNumber: 'RPT-2024-001235',
      crimeType: 'assault',
      location: 'Park Avenue, Victoria Island',
      incidentDate: '2024-01-14T20:15:00',
      description: 'Physical altercation between two individuals near the park entrance. Victim sustained minor injuries and was treated at the scene. Two suspects identified and currently being sought.',
      status: 'investigating',
      evidence: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?w=800&h=600&fit=crop',
      createdAt: '2024-01-14T20:45:00'
    },
    { 
      id: '3',
      referenceNumber: 'RPT-2024-001236',
      crimeType: 'vandalism',
      location: 'City Hall, Ikeja',
      incidentDate: '2024-01-10T03:00:00',
      description: 'Graffiti and property damage reported on the exterior walls of City Hall. Estimated repair costs being assessed. No suspects identified at this time.',
      status: 'resolved',
      evidence: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
      createdAt: '2024-01-10T08:30:00'
    },
    { 
      id: '4',
      referenceNumber: 'RPT-2024-001237',
      crimeType: 'drugs',
      location: 'East District, Surulere',
      incidentDate: '2024-01-12T18:00:00',
      description: 'Anonymous tip led to discovery of illegal substances in abandoned building. Multiple suspects detained for questioning. Evidence collected and being processed.',
      status: 'investigating',
      evidence: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
      createdAt: '2024-01-12T19:00:00'
    },
    { 
      id: '5',
      referenceNumber: 'RPT-2024-001238',
      crimeType: 'suspicious',
      location: 'Harbor Road, Apapa',
      incidentDate: '2024-01-13T22:30:00',
      description: 'Resident reported suspicious activity near warehouse district. Patrol officers investigated and found no immediate threat. Area remains under increased surveillance.',
      status: 'closed',
      evidence: null,
      createdAt: '2024-01-13T23:00:00'
    },
    { 
      id: '6',
      referenceNumber: 'RPT-2024-001239',
      crimeType: 'theft',
      location: 'Shopping Mall, Lekki',
      incidentDate: '2024-01-16T11:00:00',
      description: 'Shoplifting incident reported at electronics store. Suspect caught on surveillance camera. Store security detained individual until officers arrived.',
      status: 'pending',
      evidence: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop',
      createdAt: '2024-01-16T11:30:00'
    },
  ];

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

  const stats = [
    { label: 'Total Reports', value: '234', color: 'bg-blue-500' },
    { label: 'Pending', value: '45', color: 'bg-yellow-500' },
    { label: 'Investigating', value: '89', color: 'bg-orange-500' },
    { label: 'Resolved', value: '100', color: 'bg-green-500' },
  ];

  const filteredReports = reports.filter(report => {
    const matchesFilter = selectedFilter === 'all' || report.status === selectedFilter;
    const matchesSearch = report.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <FileText size={20} />
                Cases
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
                <AlertTriangle size={20} />
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Crime Reports</h1>
              <p className="text-gray-600">View and manage all reported crimes</p>
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
                      placeholder="Search by reference number, description, or location..."
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
                      onClick={() => setSelectedFilter('pending')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setSelectedFilter('investigating')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedFilter === 'investigating'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Investigating
                    </button>
                    <button
                      onClick={() => setSelectedFilter('resolved')}
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
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors whitespace-nowrap">
                    <Plus size={20} />
                    New Report
                  </button>
                </div>
              </div>

              {/* Reports List */}
              <div className="divide-y divide-gray-200">
                {filteredReports.map((report) => {
                  const statusConfig = getStatusConfig(report.status);
                  const crimeTypeConfig = getCrimeTypeConfig(report.crimeType);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
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

              {/* Pagination */}
              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-600">Showing 1-{filteredReports.length} of 234 reports</p>
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
              <div className="flex gap-3 mb-6">
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
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors">
                  Assign to Case
                </button>
                <button className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Update Status
                </button>
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