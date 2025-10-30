import React, { useState } from 'react';
import { Link } from 'react-router';
import { LocateFixed } from 'lucide-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in attempt:', { email, password, rememberMe });
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Side - Welcome Section */}
        <div className="w-1/2 bg-gradient-to-br from-wbprimary to-wbsecondary p-12 text-white relative overflow-hidden">
          {/* Decorative circles */}
        <Link to='/' className='text-2xl font-black flex items-center gap-2'>
          <LocateFixed size={32}/>
          C-TRACK
        </Link>

          <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Crime Tracking System</h1>
            <p className="text-sm leading-relaxed opacity-90">
              Secure access portal for law enforcement personnel. 
              Manage criminal records, generate reports, and track cases efficiently. 
              Your gateway to comprehensive crime management solutions.
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create An Account</h2>
            <p className="text-sm text-gray-500">Enter your details to sign up</p>
          </div>

          <div>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4] focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#2E7BC4] border-gray-300 rounded focus:ring-[#2E7BC4]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#2E7BC4] text-white py-3 rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors duration-200"
            >
              Sign in
            </button>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <span>Already Have An Account? </span>
              <Link to="/admin/signin" className="text-[#2E7BC4] hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp