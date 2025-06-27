import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Shield,
  Phone,
  UserPlus,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
} from "lucide-react"

// Custom Toast Component
const Toast = ({
  message,
  type,
  onClose,
}: { message: string; type: "success" | "error" | "info"; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle,
  }

  const colors = {
    success: "from-green-500 to-emerald-500",
    error: "from-red-500 to-red-600",
    info: "from-green-600 to-green-700",
  }

  const Icon = icons[type]

  return (
    <div
      className={`fixed top-4 right-4 z-50 bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5" />
        <span className="font-medium">{message}</span>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 bg-white/30 animate-shrink`}></div>
    </div>
  )
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-1">
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
  </div>
)

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("customer")
  const [customerLoginMode, setCustomerLoginMode] = useState("phone")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)

  // Phone/OTP login states
  const [mobileNumber, setMobileNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  // Credentials login states
  const [customerId, setCustomerId] = useState("")
  const [customerPassword, setCustomerPassword] = useState("")

  // Employee login states
  const [employeeId, setEmployeeId] = useState("")
  const [password, setPassword] = useState("")

  // Registration states
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    city: "",
    state: "",
    pincode: "",
    preferredStore: "",
  })

  const [cartNumber, setCartNumber] = useState("")

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type })
  }

  const handlePhoneInput = (value: string, field = "mobile") => {
    const numericValue = value.replace(/\D/g, "").slice(0, 10)
    if (field === "mobile") {
      setMobileNumber(numericValue)
    } else if (field === "register") {
      setRegistrationData((prev) => ({ ...prev, phone: numericValue }))
    }
  }

  const handlePincodeInput = (value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6)
    setRegistrationData((prev) => ({ ...prev, pincode: numericValue }))
  }

  const handleSendOTP = async () => {
    if (mobileNumber.length === 10) {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setOtpSent(true)
      setCartNumber(
        `CART-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
      )
      showToast("OTP sent successfully! 🛒", "success")
      setLoading(false)
    }
  }

  const handleCustomerPhoneLogin = async () => {
    if (otp.length === 6) {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showToast("Welcome to SmartCart! Login successful! 🛍️", "success")
      setLoading(false)
      setTimeout(() => {
        navigate('/customer')
      }, 1000)
    }
  }

  const handleCustomerCredentialsLogin = async () => {
    if (customerId && customerPassword) {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showToast("Welcome back to SmartCart! 🛒", "success")
      setLoading(false)
      setTimeout(() => {
        navigate('/customer')
      }, 1000)
    }
  }

  const handleEmployeeLogin = async () => {
    if (employeeId && password) {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (employeeId.startsWith("MGR")) {
        showToast("Manager access granted! 👨‍💼", "success")
        setTimeout(() => {
          navigate('/manager')
        }, 1000)
      } else {
        showToast("Employee login successful! 👩‍💼", "success")
        setTimeout(() => {
          navigate('/employee')
        }, 1000)
      }
      setLoading(false)
    }
  }

  const handleRegistration = async () => {
    const requiredFields = ["firstName", "lastName", "phone", "dateOfBirth", "city", "state", "pincode"]
    const missingFields = requiredFields.filter((field) => !registrationData[field].trim())

    if (missingFields.length > 0) {
      showToast(`Please fill: ${missingFields.join(", ")}`, "error")
      return
    }

    if (registrationData.phone.length !== 10) {
      showToast("Please enter a valid 10-digit phone number", "error")
      return
    }

    if (registrationData.pincode.length !== 6) {
      showToast("Please enter a valid 6-digit pincode", "error")
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    showToast("Account created successfully! Welcome to SmartCart! 🎉", "success")
    setCustomerLoginMode("phone")
    setRegistrationData({
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      city: "",
      state: "",
      pincode: "",
      preferredStore: "",
    })
    setLoading(false)
  }

  const updateRegistrationData = (field: string, value: string) => {
    setRegistrationData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 transition-all duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SmartCart</h1>
            <p className="text-gray-600">Your Smart Shopping Experience</p>
          </div>

          {/* Login Type Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setLoginType("customer")}
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  loginType === "customer"
                    ? "bg-white text-green-600 shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Customer
              </button>
              <button
                onClick={() => setLoginType("employee")}
                className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  loginType === "employee"
                    ? "bg-white text-green-600 shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Shield className="h-4 w-4 inline mr-2" />
                Staff
              </button>
            </div>
          </div>

          {/* Customer Login Options */}
          {loginType === "customer" && (
            <>
              {/* Customer Login Mode Selection */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => {
                      setCustomerLoginMode("phone")
                      setOtpSent(false)
                      setOtp("")
                      setMobileNumber("")
                    }}
                    className={`py-2 px-2 rounded-lg font-medium text-xs transition-all duration-300 ${
                      customerLoginMode === "phone"
                        ? "bg-white text-green-600 shadow-md"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Phone/OTP
                  </button>
                  <button
                    onClick={() => setCustomerLoginMode("credentials")}
                    className={`py-2 px-2 rounded-lg font-medium text-xs transition-all duration-300 ${
                      customerLoginMode === "credentials"
                        ? "bg-white text-green-600 shadow-md"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    ID/Password
                  </button>
                  <button
                    onClick={() => setCustomerLoginMode("register")}
                    className={`py-2 px-2 rounded-lg font-medium text-xs transition-all duration-300 ${
                      customerLoginMode === "register"
                        ? "bg-white text-green-600 shadow-md"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Phone/OTP Login */}
              {customerLoginMode === "phone" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => handlePhoneInput(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {!otpSent ? (
                    <button
                      onClick={handleSendOTP}
                      disabled={mobileNumber.length !== 10 || loading}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        mobileNumber.length === 10 && !loading
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {loading ? <LoadingSpinner /> : "Send OTP"}
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="6-digit OTP"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest transition-all duration-300"
                        />
                      </div>

                      {cartNumber && (
                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <ShoppingCart className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-green-800">Cart Detected!</p>
                              <p className="text-sm text-green-600">Cart Number: {cartNumber}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleCustomerPhoneLogin}
                        disabled={otp.length !== 6 || loading}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                          otp.length === 6 && !loading
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {loading ? <LoadingSpinner /> : "Login"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ID/Password Login */}
              {customerLoginMode === "credentials" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer ID</label>
                    <input
                      type="text"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="Enter Customer ID"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={customerPassword}
                      onChange={(e) => setCustomerPassword(e.target.value)}
                      placeholder="Enter any password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">Any password works for demo!</p>
                  </div>

                  <button
                    onClick={handleCustomerCredentialsLogin}
                    disabled={!customerId || !customerPassword || loading}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      customerId && customerPassword && !loading
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading ? <LoadingSpinner /> : "Login"}
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => setCustomerLoginMode("register")}
                      className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-300"
                    >
                      Don't have an account? Create one
                    </button>
                  </div>
                </div>
              )}

              {/* Registration Form */}
              {customerLoginMode === "register" && (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-center mb-4">
                    <UserPlus className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Create Account</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={registrationData.firstName}
                        onChange={(e) => updateRegistrationData("firstName", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={registrationData.lastName}
                        onChange={(e) => updateRegistrationData("lastName", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        value={registrationData.phone}
                        onChange={(e) => handlePhoneInput(e.target.value, "register")}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="date"
                          value={registrationData.dateOfBirth}
                          onChange={(e) => updateRegistrationData("dateOfBirth", e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        value={registrationData.gender}
                        onChange={(e) => updateRegistrationData("gender", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={registrationData.city}
                        onChange={(e) => updateRegistrationData("city", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <select
                        value={registrationData.state}
                        onChange={(e) => updateRegistrationData("state", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                      >
                        <option value="">Select State</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="delhi">Delhi</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="tamil-nadu">Tamil Nadu</option>
                        <option value="gujarat">Gujarat</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      value={registrationData.pincode}
                      onChange={(e) => handlePincodeInput(e.target.value)}
                      placeholder="6-digit pincode"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Store</label>
                    <select
                      value={registrationData.preferredStore}
                      onChange={(e) => updateRegistrationData("preferredStore", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300"
                    >
                      <option value="">Select Store</option>
                      <option value="store-1">SmartCart Mall Road</option>
                      <option value="store-2">SmartCart City Center</option>
                      <option value="store-3">SmartCart Downtown</option>
                      <option value="store-4">SmartCart Suburb Plaza</option>
                    </select>
                  </div>

                  <button
                    onClick={handleRegistration}
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                  >
                    {loading ? <LoadingSpinner /> : "Create Account"}
                  </button>

                  <div className="text-center">
                    <button
                      onClick={() => setCustomerLoginMode("phone")}
                      className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-300"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Employee/Manager Login */}
          {loginType === "employee" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="EMP001 or MGR001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <p className="text-xs text-gray-500 mt-1">Use MGR prefix for manager access</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter any password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <p className="text-xs text-gray-500 mt-1">Any password works for demo!</p>
              </div>

              <button
                onClick={handleEmployeeLogin}
                disabled={!employeeId || !password || loading}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  employeeId && password && !loading
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? <LoadingSpinner /> : "Login"}
              </button>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-medium text-gray-800 mb-2 flex items-center">
              <Package className="h-4 w-4 mr-2 text-green-600" />
              Demo Credentials:
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Customer Phone:</strong> Any 10-digit mobile + OTP: 123456
              </p>
              <p>
                <strong>Customer ID:</strong> Any ID + Any Password
              </p>
              <p>
                <strong>Employee:</strong> EMP001 + Any Password
              </p>
              <p>
                <strong>Manager:</strong> MGR001 + Any Password
              </p>
              <p className="text-xs text-green-600 mt-2">🛒 All passwords work for demo!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

export default Login
