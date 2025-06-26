import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, MapPin, Send, AlertTriangle, HelpCircle, CheckCircle } from 'lucide-react';

const RaiseQuery = () => {
  const navigate = useNavigate();
  const [queryText, setQueryText] = useState('');
  const [queryType, setQueryType] = useState('assistance');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState('');
  const cartNumber = localStorage.getItem('cartNumber') || 'CART-001';
  
  // Get current in-store location 
  useEffect(() => {
    // In a real app, this would use indoor positioning technology
    // For this demo, we'll simulate with aisle positions
    const aisles = ['Aisle 1 - Dairy Section', 'Aisle 2 - Bakery', 'Aisle 3 - Produce', 'Aisle 4 - Beverages', 'Checkout Lane 2'];
    const randomAisle = aisles[Math.floor(Math.random() * aisles.length)];
    setLocation(randomAisle);
  }, []);

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    // Simulating API call to submit query to backend
    setTimeout(() => {
      // Generate random employee ID (in a real app this would be assigned based on query type and employee availability)
      const employeeNumbers = ['EMP001', 'EMP042', 'EMP107', 'EMP023', 'EMP056'];
      const randomEmployee = employeeNumbers[Math.floor(Math.random() * employeeNumbers.length)];
      
      setAssignedEmployee(randomEmployee);
      setSubmitting(false);
      setSuccess(true);
      
      // Store query data in localStorage to simulate persistence
      const queryData = {
        id: Date.now(),
        text: queryText,
        type: queryType,
        location: location,
        employee: randomEmployee,
        timestamp: new Date().toISOString(),
        status: 'pending',
        cartNumber: cartNumber
      };
      
      // Get existing queries or initialize empty array
      const existingQueries = JSON.parse(localStorage.getItem('customerQueries') || '[]');
      existingQueries.push(queryData);
      localStorage.setItem('customerQueries', JSON.stringify(existingQueries));
    }, 1500);
  };

  const getQueryTypeIcon = (type) => {
    switch (type) {
      case 'assistance': return <HelpCircle className="h-5 w-5" />;
      case 'technical': return <AlertTriangle className="h-5 w-5" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };

  const handleNewQuery = () => {
    setSuccess(false);
    setQueryText('');
    setQueryType('assistance');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/customer')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Raise a Query</h1>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Customer Support</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!success ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">How can we help you?</h2>
              <p className="text-gray-600">Submit your query and a store employee will assist you promptly.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <form onSubmit={handleSubmitQuery}>
                <div className="mb-6">
                  <label htmlFor="queryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Query Type
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'assistance', label: 'General Assistance', icon: HelpCircle, color: 'from-blue-500 to-blue-600' },
                      { id: 'technical', label: 'Technical Issue', icon: AlertTriangle, color: 'from-orange-500 to-orange-600' },
                      { id: 'product', label: 'Product Query', icon: MessageSquare, color: 'from-purple-500 to-purple-600' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          queryType === type.id 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        } flex flex-col items-center text-center`}
                        onClick={() => setQueryType(type.id)}
                      >
                        <div className={`w-10 h-10 mb-2 rounded-full flex items-center justify-center bg-gradient-to-r ${type.color} text-white`}>
                          <type.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-800">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Current Location
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-800">{location || 'Detecting location...'}</span>
                    <span className="ml-auto text-xs text-green-600 font-medium">Auto-detected</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Your location will be shared with the employee to assist you better
                  </p>
                </div>

                <div className="mb-6">
                  <label htmlFor="queryText" className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your query
                  </label>
                  <textarea
                    id="queryText"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="Please describe how we can help you..."
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={4}
                  ></textarea>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !queryText}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                    submitting || !queryText
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                  }`}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Query</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Query Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your query has been received and a store employee will assist you shortly.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white">
                  {getQueryTypeIcon(queryType)}
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-800">Your Query</h4>
                  <p className="text-sm text-gray-600">Cart: {cartNumber}</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4 text-left">{queryText}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{location}</span>
                </div>
                <span className="text-gray-500">Just now</span>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
              <h3 className="font-semibold text-blue-800 mb-3">Employee Assigned to You</h3>
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">{assignedEmployee.substring(3)}</span>
              </div>
              <p className="text-blue-800 font-bold text-xl mb-1">ID: {assignedEmployee}</p>
              <p className="text-gray-600 text-sm">Employee will contact you shortly</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={handleNewQuery}
                className="flex-1 py-3 border border-green-500 text-green-600 rounded-xl hover:bg-green-50 transition-colors font-medium"
              >
                New Query
              </button>
              <button
                onClick={() => navigate('/customer')}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Information Cards */}
        {!success && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Need Help?</h3>
              </div>
              <p className="text-gray-600">
                Our store employees are ready to assist you with any questions or concerns you might have during your shopping experience.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Quick Resolution</h3>
              </div>
              <p className="text-gray-600">
                We aim to resolve all customer queries within minutes. Your satisfaction is our top priority.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaiseQuery;