import React, { useState } from 'react';
import { Shield, MapPin, Calendar, FileText, Upload, CheckCircle, ChevronRight, ChevronLeft,ArrowLeft, LocateFixed } from 'lucide-react';
import { Link } from 'react-router';

const AnonymousReport = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    crimeType: '',
    location: '',
    date: '',
    time: '',
    description: '',
    evidence: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const crimeTypes = [
    { id: 'theft', name: 'Theft', icon: '🔓' },
    { id: 'assault', name: 'Assault', icon: '⚠️' },
    { id: 'drugs', name: 'Drug Activity', icon: '💊' },
    { id: 'vandalism', name: 'Vandalism', icon: '🔨' },
    { id: 'suspicious', name: 'Suspicious Activity', icon: '👁️' },
    { id: 'other', name: 'Other', icon: '📋' }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const refNum = 'CR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setReferenceNumber(refNum);
    setSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Report Submitted</h2>
            <p className="text-gray-600">Your report has been received anonymously</p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Reference Number</p>
            <p className="text-2xl font-bold text-[#2E7BC4] mb-2">{referenceNumber}</p>
            <p className="text-xs text-gray-500">Save this number to track your report status</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Your identity remains completely anonymous</span>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#2E7BC4] text-white py-3 rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
    {/* Header */}
    <div className="max-w-4xl mx-auto mb-8">
    <div className="bg-white rounded-xl shadow-md p-6 pt-4">
        {/* Header Row */}
        <div className="relative flex items-center justify-center mb-8 pt-4">
        <Link
            to="/"
            className="absolute left-0 text-sm font-semibold flex items-center gap-2"
        >
            <ArrowLeft />
            <span>Back</span>
        </Link>

        {/* Center Logo */}
        <Link
            to="/"
            className="text-lg sm:text-xl font-bold flex items-center gap-2 justify-center"
        >
            <LocateFixed className="text-wbprimary w-6 h-6" />
            <span>C-TRACK</span>
        </Link>
        </div>

        {/* Main Header Content */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Anonymous Crime Report
            </h1>
            <p className="text-sm text-gray-500">
                Your identity is completely protected
            </p>
            </div>
        </div>

        <div className="px-4 py-2 bg-wbprimary rounded-lg border border-wbprimary">
            <span className="text-white font-semibold text-sm">
            🔒 100% Anonymous
            </span>
        </div>
        </div>
    </div>
    </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-[#2E7BC4] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-[#2E7BC4]' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600 px-2">
          <span>Crime Type</span>
          <span>Location</span>
          <span>Details</span>
          <span>Evidence</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Step 1: Crime Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What type of crime do you want to report?</h2>
              <p className="text-gray-600 mb-6">Select the category that best describes the incident</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {crimeTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateFormData('crimeType', type.id)}
                    className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                      formData.crimeType === type.id
                        ? 'border-[#2E7BC4] bg-blue-50'
                        : 'border-gray-200 hover:border-[#2E7BC4]'
                    }`}
                  >
                    <div className="text-4xl mb-2">{type.icon}</div>
                    <div className="font-semibold text-gray-800">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Location & Date */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Where and when did this happen?</h2>
              <p className="text-gray-600 mb-6">Provide location and time details</p>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 font-semibold" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="Enter address or landmark (e.g., Near City Hall, Main Street)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateFormData('date', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Time (Optional)
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => updateFormData('time', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Description */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us what happened</h2>
              <p className="text-gray-600 mb-6">Provide as much detail as possible</p>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Describe the incident in detail. Include what you saw, heard, or experienced..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4] resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Be as specific as possible. Include details about people, vehicles, or any identifying information.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Evidence Upload */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload evidence (Optional)</h2>
              <p className="text-gray-600 mb-6">Add photos, videos, or documents if available</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#2E7BC4] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-xs text-gray-500">Supported: Images</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Files are uploaded anonymously. Metadata is automatically removed to protect your identity.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                step === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.crimeType) ||
                  (step === 2 && (!formData.location || !formData.date)) ||
                  (step === 3 && !formData.description)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  (step === 1 && !formData.crimeType) ||
                  (step === 2 && (!formData.location || !formData.date)) ||
                  (step === 3 && !formData.description)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#2E7BC4] text-white hover:bg-[#1a5a94]'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Submit Report
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AnonymousReport;``