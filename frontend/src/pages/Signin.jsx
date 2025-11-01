import React, { useState } from 'react';
import { Link } from 'react-router';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router';
import { LoaderCircle , LocateFixed , Eye , EyeClosed } from 'lucide-react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [resMsg, setResMsg] = useState(null);
    const [pwdError, setPwdError] = useState(null);
    const [loading,setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const {logInUser , isLoggingIn} = AuthService()

    //
    const handleEmailChange = (value) => {
        let enteredEmail = value.trim();
    
        if (!enteredEmail) {
            setEmailError("Enter Email !");
        } else {
            setEmailError(null)
        }
        setEmail(enteredEmail);
        return true;
    };
    
    const handlePwdChange = (value) => {
        let enteredPwd = value.trim();
    
        if (!enteredPwd) {
            setPwdError("Enter Password !");
        } else {
            setPwdError(null);
        }
    
        setPassword(enteredPwd);
        return true;
    };
    

    //

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        // Input validation
        const isEmailValid = email.trim() !== "";
        const isPasswordValid = password.trim() !== "";
    
        if (!isEmailValid || !isPasswordValid) {
            setLoading(false);
    
            if (!isEmailValid) setEmailError("Email is required.");
            if (!isPasswordValid) setPwdError("Password is required.");
    
            setError("Please enter email and password.");
            return;
        }
    
        const userData = { email, password };
        const result = await logInUser(userData);

        if (result.success) {
            setResMsg('Success !')
            setLoading(false)
            navigate('/cases/all-cases');
        } else {
            setError(result.message);
            setLoading(false);
        }    
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#2E7BC4] to-[#1a5a94] p-8 md:p-12 text-white relative overflow-hidden">
        <Link to='/' className='text-2xl font-black mb-8 md:mb-0 block flex items-center gap-2'><LocateFixed size={32}/> C-TRACK</Link>
          <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center py-8 md:py-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">WELCOME BACK</h1>
            <p className="text-lg md:text-xl font-semibold mb-4">Crime Tracking System</p>
            <p className="text-sm leading-relaxed opacity-90">
              Secure access portal for law enforcement personnel. 
              Manage criminal records, generate reports, and track cases efficiently. 
              Your gateway to comprehensive crime management solutions.
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Sign in</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access the admin panel</p>
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
                onChange={(e) => handleEmailChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4] focus:border-transparent"
                placeholder="Enter your email"
              />
              <span className="mt-2 text-sm font-semibold text-gdaccent">{ emailError && (<h1>{emailError}</h1>) }</span>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePwdChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7BC4] focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
              <span className="mt-2 text-sm font-semibold">{ pwdError && (<h1>{pwdError}</h1>) }</span>
            </div>

            {error && (
              <div className="mt-2 text-sm font-semibold">
                  {error}
              </div>
            )}
            {resMsg && (
                <div className="mt-2 text-sm font-semibold">
                    {resMsg}
                </div>
            )}
            {/* Sign In Button */}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-[#2E7BC4] text-white py-3 rounded-lg font-semibold hover:bg-[#1a5a94] transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={20} />
              ) : (
                "Sign in"
              )}
            </button>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <span>No account yet? </span>
              <Link to="/admin/signup" className="text-[#2E7BC4] hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignIn