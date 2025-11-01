import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          {/* Main 404 Text with Animation */}
          <h1 className="text-9xl md:text-[200px] font-black text-gray-200 animate-bounce">
            404
          </h1>
          
          {/* Floating Police Badge Animation */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#2E7BC4] to-[#1a5a94] rounded-full flex items-center justify-center shadow-2xl">
              <Search className="text-white" size={48} />
            </div>
          </div>

          {/* Floating Circles Animation */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-ping"></div>
          <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-blue-300 rounded-full opacity-50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Error Message */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-2">
            Oops! The page you're looking for has gone missing.
          </p>
          <p className="text-gray-500 text-sm">
            It seems we couldn't locate what you were searching for.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-[#2E7BC4] text-white rounded-lg font-semibold hover:bg-[#1a5a94] transition-all hover:scale-105 shadow-lg"
          >
            <Home size={20} />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg border border-gray-200"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Additional Help Text */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>Need help? Contact support or return to the homepage.</p>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
};