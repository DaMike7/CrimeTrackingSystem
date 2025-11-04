import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Search, 
  LocateFixed,
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Activity,
  MapPin,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import AuthService from '../services/AuthService';
import CaseService from '../services/CaseServices';

const AddCase = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [caseNumber, setCaseNumber] = useState('');
  
  const { logOutUser, authUser } = AuthService();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    caseTitle: '',
    caseType: '',
    description: '',
    location: '',
    incidentDate: '',
    suspects: '',
    status: 'open',
    assignedOfficer: ''
  });

  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    if (authUser?._id) {
      setFormData(prev => ({ ...prev, assignedOfficer: authUser._id }));
    }
  }, [authUser]);
  const fullName= authUser.full_name.split(" ").slice(0, 2).join(" ");


  useEffect(() => {
    const mockOfficers = [
      { _id: '1', fullName: 'Officer Smith' },
      { _id: '2', fullName: 'Officer Johnson' },
      { _id: '3', fullName: 'Detective Martinez' },
    ];
    setOfficers(mockOfficers);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    const result = await logOutUser();
    if (result.status === 200) {
      navigate('/admin/signin');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(formData)

    if (!formData.caseTitle || !formData.caseType || !formData.description || 
        !formData.location || !formData.incidentDate || !formData.assignedOfficer) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const result = await CaseService.createCase(formData);

    if (result.success) {
      setSuccess(true);
      setCaseNumber(result.data.caseNumber);
      setFormData({
        caseTitle: '',
        caseType: '',
        description: '',
        location: '',
        incidentDate: '',
        suspects: '',
        status: 'open',
        assignedOfficer: authUser?._id || ''
      });
      
      setTimeout(() => {
        navigate('/cases/all-cases');
      }, 3000);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const caseTypes = [
    { id: 'theft', name: 'Theft', icon: '🔒' },
    { id: 'assault', name: 'Assault', icon: '⚠️' },
    { id: 'homicide', name: 'Homicide', icon: '☠️' },
    { id: 'drugs', name: 'Drugs', icon: '💊' },
    { id: 'fraud', name: 'Fraud', icon: '💳' },
    { id: 'vandalism', name: 'Vandalism', icon: '🔨' },
    { id: 'other', name: 'Other', icon: '📋' }
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Case Created Successfully!</h2>
            <p className="text-gray-600">The case has been added to the system</p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Case Number</p>
            <p className="text-2xl font-bold text-[#2E7BC4] mb-2">{caseNumber}</p>
            <p className="text-xs text-gray-500">This case has been assigned and is now being tracked</p>
          </div>

          <button
            onClick={() => navigate('/cases/all-cases')}
            className="w-full bg-[#2E7BC4] text-white py-3 rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors"
          >
            View All Cases
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                {authUser.userType}
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
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out mt-16 lg:mt-0`}>
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6">{fullName || 'Officer'}</h2>
            <nav className="space-y-2">
              <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
                <LayoutDashboard size={20} />
                Dashboard
              </a>
              <a href="/cases/all-cases" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#2E7BC4] rounded-lg font-medium">
                <Activity size={20} />
                Cases
              </a>
              <a href="/reports/all" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Create New Case</h1>
              <p className="text-gray-600">Fill in the details to open a new case</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 space-y-6">
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText size={18} />
                    Case Title *
                  </label>
                  <input
                    type="text"
                    name="caseTitle"
                    value={formData.caseTitle}
                    onChange={handleInputChange}
                    placeholder="Enter a brief title for the case"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Case Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {caseTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, caseType: type.id }))}
                        className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                          formData.caseType === type.id
                            ? 'border-[#2E7BC4] bg-blue-50'
                            : 'border-gray-200 hover:border-[#2E7BC4]'
                        }`}
                      >
                        <div className="text-3xl mb-1">{type.icon}</div>
                        <div className="text-sm font-semibold text-gray-800">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={18} />
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter location of incident"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={18} />
                      Incident Date *
                    </label>
                    <input
                      type="datetime-local"
                      name="incidentDate"
                      value={formData.incidentDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText size={18} />
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide detailed description of the case..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4] resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User size={18} />
                    Suspects (Optional)
                  </label>
                  <textarea
                    name="suspects"
                    value={formData.suspects}
                    onChange={handleInputChange}
                    placeholder="Enter suspect information if available..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4] resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User size={18} />
                      Assigned Officer *
                    </label>
                    <select
                      name="assignedOfficer"
                      value={formData.assignedOfficer}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    >
                      <option value="">Select Officer</option>
                      {authUser && (
                        <option value={authUser._id}>{authUser.fullName} (Me)</option>
                      )}
                      {officers.map(officer => (
                        <option key={officer._id} value={officer._id}>
                          {officer.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <AlertCircle size={18} />
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    >
                      <option value="open">Open</option>
                      <option value="investigating">Investigating</option>
                      <option value="solved">Solved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-4 rounded-b-xl">
                <button
                  type="button"
                  onClick={() => navigate('/cases/all-cases')}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Creating Case...
                    </>
                  ) : (
                    'Create Case'
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCase;