import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, Shield, Phone, MessageSquare } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('customer');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [cartNumber, setCartNumber] = useState('');

  const handleSendOTP = () => {
    if (mobileNumber.length === 10) {
      setOtpSent(true);
      // Simulate cart number detection
      setCartNumber(`CART-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
    }
  };

  const handleCustomerLogin = () => {
    if (otp.length === 6) {
      localStorage.setItem('userType', 'customer');
      localStorage.setItem('cartNumber', cartNumber);
      navigate('/customer');
    }
  };

  const handleEmployeeLogin = () => {
    // Simple validation - in real app, this would be server-side
    if (employeeId && password) {
      if (employeeId.startsWith('MGR')) {
        localStorage.setItem('userType', 'manager');
        navigate('/manager');
      } else {
        localStorage.setItem('userType', 'employee');
        navigate('/employee');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SmartStore</h1>
            <p className="text-gray-600">Welcome to the future of shopping</p>
          </div>

          {/* Login Type Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setLoginType('customer')}
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  loginType === 'customer'
                    ? 'bg-white text-emerald-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Customer
              </button>
              <button
                onClick={() => setLoginType('employee')}
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  loginType === 'employee'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Shield className="h-4 w-4 inline mr-2" />
                Staff
              </button>
            </div>
          </div>

          {/* Customer Login */}
          {loginType === 'customer' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    maxLength={10}
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  onClick={handleSendOTP}
                  disabled={mobileNumber.length !== 10}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    mobileNumber.length === 10
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Send OTP
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit OTP"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  {cartNumber && (
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-emerald-800">Cart Detected!</p>
                          <p className="text-sm text-emerald-600">Cart Number: {cartNumber}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleCustomerLogin}
                    disabled={otp.length !== 6}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      otp.length === 6
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Employee/Manager Login */}
          {loginType === 'employee' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="EMP001 or MGR001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use MGR prefix for manager access
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleEmployeeLogin}
                disabled={!employeeId || !password}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  employeeId && password
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Login
              </button>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-800 mb-2">Demo Credentials:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Customer:</strong> Any 10-digit mobile + OTP: 123456</p>
              <p><strong>Employee:</strong> EMP001 / password123</p>
              <p><strong>Manager:</strong> MGR001 / manager123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;