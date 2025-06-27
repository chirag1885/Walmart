import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Package, Users, TrendingUp, AlertTriangle, DollarSign, ShoppingCart, MessageSquare, ArrowLeft, Clock, CheckCircle, Star, Filter, Search, Download, Eye, MapPin, Phone, Mail, Edit, Trash2 } from 'lucide-react';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [customerFilter, setCustomerFilter] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackFilter, setFeedbackFilter] = useState('all');
  type Customer = {
    id: number;
    name: string;
    cartNumber: string;
    entryTime: string;
    exitTime?: string;
    location?: string;
    phone: string;
    email: string;
    items: { name: string; quantity: number; price: number }[];
    totalValue: number;
    status: string;
    paymentMethod?: string;
  };
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const stats = [
    { label: 'Daily Revenue', value: '$12,486', change: '+8.2%', color: 'from-emerald-500 to-emerald-600', icon: DollarSign },
    { label: 'Total Orders', value: '347', change: '+12.5%', color: 'from-blue-500 to-blue-600', icon: ShoppingCart },
    { label: 'Active Customers', value: '89', change: '+5.3%', color: 'from-purple-500 to-purple-600', icon: Users },
    { label: 'Inventory Items', value: '2,847', change: '-2.1%', color: 'from-orange-500 to-orange-600', icon: Package },
  ];

  const activeCustomers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      cartNumber: 'CART-001',
      entryTime: '2:15 PM',
      location: 'Aisle 3 - Produce',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
      items: [
        { name: 'Organic Bananas', quantity: 2, price: 4.99 },
        { name: 'Greek Yogurt', quantity: 1, price: 6.99 },
        { name: 'Whole Grain Bread', quantity: 1, price: 3.49 }
      ],
      totalValue: 15.47,
      status: 'shopping',
      exitTime: undefined
    },
    {
      id: 2,
      name: 'Mike Chen',
      cartNumber: 'CART-045',
      entryTime: '1:45 PM',
      location: 'Aisle 1 - Dairy',
      phone: '+1 (555) 987-6543',
      email: 'mike.chen@email.com',
      items: [
        { name: 'Whole Milk', quantity: 2, price: 3.49 },
        { name: 'Cheese Slices', quantity: 1, price: 4.99 },
        { name: 'Butter', quantity: 1, price: 4.99 }
      ],
      totalValue: 13.47,
      status: 'shopping',
      exitTime: undefined
    },
    {
      id: 3,
      name: 'Emma Davis',
      cartNumber: 'CART-023',
      entryTime: '2:30 PM',
      location: 'Checkout Lane 2',
      phone: '+1 (555) 456-7890',
      email: 'emma.davis@email.com',
      items: [
        { name: 'Salmon Fillet', quantity: 1, price: 12.99 },
        { name: 'Asparagus', quantity: 1, price: 3.99 },
        { name: 'Lemon', quantity: 3, price: 0.99 }
      ],
      totalValue: 19.95,
      status: 'checkout',
      exitTime: undefined
    },
    {
      id: 4,
      name: 'John Smith',
      cartNumber: 'CART-067',
      entryTime: '1:20 PM',
      location: 'Aisle 4 - Beverages',
      phone: '+1 (555) 321-0987',
      email: 'john.smith@email.com',
      items: [
        { name: 'Orange Juice', quantity: 2, price: 4.49 },
        { name: 'Sparkling Water', quantity: 1, price: 2.99 },
        { name: 'Coffee Beans', quantity: 1, price: 8.99 }
      ],
      totalValue: 16.97,
      status: 'shopping',
      exitTime: undefined
    }
  ];

  const completedCustomers = [
    {
      id: 5,
      name: 'Lisa Wang',
      cartNumber: 'CART-012',
      entryTime: '12:30 PM',
      exitTime: '1:15 PM',
      location: undefined,
      phone: '+1 (555) 111-2222',
      email: 'lisa.wang@email.com',
      items: [
        { name: 'Chicken Breast', quantity: 2, price: 8.99 },
        { name: 'Broccoli', quantity: 1, price: 2.99 },
        { name: 'Rice', quantity: 1, price: 3.99 },
        { name: 'Soy Sauce', quantity: 1, price: 2.49 }
      ],
      totalValue: 24.46,
      paymentMethod: 'Credit Card',
      status: 'completed'
    },
    {
      id: 6,
      name: 'David Brown',
      cartNumber: 'CART-089',
      entryTime: '11:45 AM',
      exitTime: '12:20 PM',
      location: undefined,
      phone: '+1 (555) 333-4444',
      email: 'david.brown@email.com',
      items: [
        { name: 'Steak', quantity: 1, price: 15.99 },
        { name: 'Potatoes', quantity: 2, price: 1.99 },
        { name: 'Green Beans', quantity: 1, price: 2.99 }
      ],
      totalValue: 20.97,
      paymentMethod: 'Debit Card',
      status: 'completed'
    },
    {
      id: 7,
      name: 'Anna Rodriguez',
      cartNumber: 'CART-156',
      entryTime: '10:30 AM',
      exitTime: '11:10 AM',
      location: undefined,
      phone: '+1 (555) 555-6666',
      email: 'anna.rodriguez@email.com',
      items: [
        { name: 'Organic Apples', quantity: 3, price: 2.99 },
        { name: 'Almond Milk', quantity: 1, price: 4.49 },
        { name: 'Granola', quantity: 1, price: 5.99 },
        { name: 'Honey', quantity: 1, price: 6.99 }
      ],
      totalValue: 20.46,
      paymentMethod: 'Mobile Pay',
      status: 'completed'
    }
  ];

  const [customerFeedback, setCustomerFeedback] = useState([
    {
      id: 1,
      customerName: 'Sarah Johnson',
      cartNumber: 'CART-001',
      rating: 5,
      feedback: 'Amazing shopping experience! The smart cart technology made everything so easy. Found all items quickly with the store map.',
      timestamp: '2024-01-16 14:30',
      category: 'Technology',
      status: 'new'
    },
    {
      id: 2,
      customerName: 'Mike Chen',
      cartNumber: 'CART-045',
      rating: 4,
      feedback: 'Great store layout and helpful staff. The barcode scanner worked perfectly. Only suggestion is to have more checkout lanes open during peak hours.',
      timestamp: '2024-01-16 13:45',
      category: 'Service',
      status: 'reviewed'
    },
    {
      id: 3,
      customerName: 'Emma Davis',
      cartNumber: 'CART-023',
      rating: 5,
      feedback: 'Love the eco-friendly product suggestions! The AI chat was very helpful when I had questions about organic products.',
      timestamp: '2024-01-16 12:20',
      category: 'Products',
      status: 'new'
    },
    {
      id: 4,
      customerName: 'Lisa Wang',
      cartNumber: 'CART-012',
      rating: 4,
      feedback: 'Very clean store and fresh products. The mobile payment was seamless. Would appreciate more variety in the international food section.',
      timestamp: '2024-01-16 11:30',
      category: 'Products',
      status: 'reviewed'
    },
    {
      id: 5,
      customerName: 'David Brown',
      cartNumber: 'CART-089',
      rating: 3,
      feedback: 'Good overall experience but the store map app was a bit slow to load. Also, some price tags were missing in the produce section.',
      timestamp: '2024-01-16 10:15',
      category: 'Technology',
      status: 'action-required'
    },
    {
      id: 6,
      customerName: 'Anna Rodriguez',
      cartNumber: 'CART-156',
      rating: 2,
      feedback: 'Had issues with the smart cart not recognizing some items. Staff was helpful but the technology needs improvement.',
      timestamp: '2024-01-16 09:45',
      category: 'Technology',
      status: 'action-required'
    },
    {
      id: 7,
      customerName: 'Robert Wilson',
      cartNumber: 'CART-078',
      rating: 1,
      feedback: 'Very disappointed with the service today. Long wait times at checkout and several items were out of stock without any notification.',
      timestamp: '2024-01-16 08:30',
      category: 'Service',
      status: 'action-required'
    }
  ]);

  const recentOrders = [
    { id: '#1001', customer: 'Sarah Johnson', amount: '$89.50', status: 'Completed', time: '2 min ago' },
    { id: '#1002', customer: 'Mike Chen', amount: '$156.20', status: 'Processing', time: '5 min ago' },
    { id: '#1003', customer: 'Emma Davis', amount: '$73.80', status: 'Completed', time: '8 min ago' },
    { id: '#1004', customer: 'John Smith', amount: '$234.60', status: 'Pending', time: '12 min ago' },
  ];

  const lowStockItems = [
    { name: 'Organic Bananas', current: 5, minimum: 20, status: 'critical' },
    { name: 'Whole Milk', current: 12, minimum: 30, status: 'low' },
    { name: 'Bread Loaves', current: 8, minimum: 25, status: 'critical' },
    { name: 'Greek Yogurt', current: 15, minimum: 40, status: 'low' },
  ];

  const quickActions = [
    { icon: Package, label: 'Inventory', path: '/inventory', color: 'from-blue-500 to-blue-600' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', color: 'from-purple-500 to-purple-600' },
    { icon: Users, label: 'Customers', action: () => setActiveTab('customers'), color: 'from-emerald-500 to-emerald-600' },
    { icon: MessageSquare, label: 'Feedback', action: () => setActiveTab('feedback'), color: 'from-orange-500 to-orange-600' },
  ];

  // Filter customers based on search term and filter
  const filteredCustomers = (customerFilter === 'active' ? activeCustomers : completedCustomers).filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.cartNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter feedback based on rating and search term
  const filteredFeedback = customerFeedback.filter(feedback => {
    const matchesSearch = feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.cartNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = feedbackFilter === 'all' || 
                         (feedbackFilter === '5star' && feedback.rating === 5) ||
                         (feedbackFilter === '4star' && feedback.rating === 4) ||
                         (feedbackFilter === '3star' && feedback.rating === 3) ||
                         (feedbackFilter === '2star' && feedback.rating === 2) ||
                         (feedbackFilter === '1star' && feedback.rating === 1);
    
    return matchesSearch && matchesRating;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'shopping': return 'bg-blue-100 text-blue-800';
      case 'checkout': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFeedbackStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-green-100 text-green-800';
      case 'action-required': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleTrackLocation = (customer) => {
    alert(`Tracking ${customer.name} at ${customer.location}`);
  };

  const handleMarkAsReviewed = (feedbackId) => {
    setCustomerFeedback(prev => 
      prev.map(feedback => 
        feedback.id === feedbackId 
          ? { ...feedback, status: 'reviewed' }
          : feedback
      )
    );
  };

  const handleTakeAction = (feedbackId) => {
    setCustomerFeedback(prev => 
      prev.map(feedback => 
        feedback.id === feedbackId 
          ? { ...feedback, status: 'reviewed' }
          : feedback
      )
    );
    alert('Action taken on feedback. Issue has been escalated to the appropriate department.');
  };

  const handleRespond = (feedback) => {
    alert(`Responding to ${feedback.customerName}'s feedback...`);
  };

  const handleExportData = (type) => {
    const data = type === 'customers' ? filteredCustomers : filteredFeedback;
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${type}_data_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderOverview = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.path ? () => navigate(action.path) : action.action}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-800">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Recent Orders</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-800">{order.id}</td>
                      <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                      <td className="py-3 px-4 font-semibold text-gray-800">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Low Stock Alert</h3>
                <p className="text-sm text-gray-600">Items need restocking</p>
              </div>
            </div>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.current} / {item.minimum} units</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/inventory')}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              Manage Inventory
            </button>
          </div>

          {/* Performance Summary */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-xl border border-emerald-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Today's Performance</h3>
                <p className="text-sm text-gray-600">Store metrics</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sales Target</span>
                <span className="font-semibold text-gray-800">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-semibold text-emerald-600">9.2/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      {/* Customer Management Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter:</span>
              <select
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active Customers</option>
                <option value="completed">Completed Orders</option>
              </select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              onClick={() => handleExportData('customers')}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{activeCustomers.length}</div>
            <div className="text-sm text-gray-600">Currently Shopping</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{completedCustomers.length}</div>
            <div className="text-sm text-gray-600">Completed Today</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              ${(activeCustomers.reduce((sum, c) => sum + c.totalValue, 0) + completedCustomers.reduce((sum, c) => sum + c.totalValue, 0)).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {customerFilter === 'active' ? 'Active Customers' : 'Completed Orders'} ({filteredCustomers.length})
        </h3>
        
        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{customer.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{customer.name}</h4>
                    <p className="text-sm text-gray-600">Cart: {customer.cartNumber}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                  <div className="text-lg font-bold text-gray-800 mt-1">${customer.totalValue.toFixed(2)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Entry: {customer.entryTime}</span>
                  {customer.exitTime && <span>• Exit: {customer.exitTime}</span>}
                </div>
                {customer.location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{customer.location}</span>
                  </div>
                )}
                {'paymentMethod' in customer && customer.paymentMethod && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Paid via {customer.paymentMethod}</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h5 className="font-medium text-gray-800 mb-2">Items in Cart ({customer.items.length})</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {customer.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">{item.name} x{item.quantity}</span>
                      <span className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-3">
                <button 
                  onClick={() => handleViewDetails(customer)}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  <Eye className="h-3 w-3" />
                  <span>View Details</span>
                </button>
                {customer.status === 'shopping' && (
                  <button 
                    onClick={() => handleTrackLocation(customer)}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                  >
                    <MapPin className="h-3 w-3" />
                    <span>Track Location</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Customer Details</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedCustomer.name}</p>
                    <p><span className="font-medium">Cart:</span> {selectedCustomer.cartNumber}</p>
                    <p><span className="font-medium">Phone:</span> {selectedCustomer.phone}</p>
                    <p><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCustomer.status)}`}>
                        {selectedCustomer.status}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Shopping Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Entry Time:</span> {selectedCustomer.entryTime}</p>
                    {selectedCustomer.exitTime && (
                      <p><span className="font-medium">Exit Time:</span> {selectedCustomer.exitTime}</p>
                    )}
                    {selectedCustomer.location && (
                      <p><span className="font-medium">Current Location:</span> {selectedCustomer.location}</p>
                    )}
                    {selectedCustomer.paymentMethod && (
                      <p><span className="font-medium">Payment Method:</span> {selectedCustomer.paymentMethod}</p>
                    )}
                    <p><span className="font-medium">Total Value:</span> ${selectedCustomer.totalValue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Items in Cart</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {selectedCustomer.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.name} x{item.quantity}</span>
                        <span className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span>${selectedCustomer.totalValue.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      {/* Feedback Management Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Customer Feedback</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={feedbackFilter}
                onChange={(e) => setFeedbackFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5star">5 Stars</option>
                <option value="4star">4 Stars</option>
                <option value="3star">3 Stars</option>
                <option value="2star">2 Stars</option>
                <option value="1star">1 Star</option>
              </select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              onClick={() => handleExportData('feedback')}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Feedback Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{customerFeedback.filter(f => f.status === 'new').length}</div>
            <div className="text-sm text-gray-600">New Feedback</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{customerFeedback.filter(f => f.status === 'reviewed').length}</div>
            <div className="text-sm text-gray-600">Reviewed</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{customerFeedback.filter(f => f.status === 'action-required').length}</div>
            <div className="text-sm text-gray-600">Action Required</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {(customerFeedback.reduce((sum, f) => sum + f.rating, 0) / customerFeedback.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">{filteredFeedback.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
        </div>
      </div>

      {/* Star Rating Distribution */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = customerFeedback.filter(f => f.rating === rating).length;
            const percentage = (count / customerFeedback.length) * 100;
            return (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{count}</span>
                <span className="text-sm text-gray-500 w-12">{percentage.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Customer Feedback ({filteredFeedback.length})
        </h3>
        
        <div className="space-y-4">
          {filteredFeedback.map((feedback) => (
            <div key={feedback.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{feedback.customerName.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{feedback.customerName}</h4>
                    <p className="text-sm text-gray-600">Cart: {feedback.cartNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFeedbackStatusColor(feedback.status)}`}>
                    {feedback.status.replace('-', ' ')}
                  </span>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(feedback.rating)}
                    <span className="text-sm text-gray-600 ml-2">({feedback.rating}/5)</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-gray-800">{feedback.feedback}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{feedback.timestamp}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {feedback.category}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {feedback.status === 'new' && (
                    <button 
                      onClick={() => handleMarkAsReviewed(feedback.id)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                    >
                      Mark as Reviewed
                    </button>
                  )}
                  {feedback.status === 'action-required' && (
                    <button 
                      onClick={() => handleTakeAction(feedback.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      Take Action
                    </button>
                  )}
                  <button 
                    onClick={() => handleRespond(feedback)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Respond
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/')} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">SmartStore</span>
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Manager Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              {activeTab !== 'overview' && (
                <button
                  onClick={() => setActiveTab('overview')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Overview</span>
                </button>
              )}
              <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <AlertTriangle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {activeTab === 'overview' && 'Store Management'}
            {activeTab === 'customers' && 'Customer Management'}
            {activeTab === 'feedback' && 'Customer Feedback'}
          </h1>
          <p className="text-gray-600 text-lg">
            {activeTab === 'overview' && 'Monitor and manage your store operations'}
            {activeTab === 'customers' && 'Track active customers and completed orders'}
            {activeTab === 'feedback' && 'Review and respond to customer feedback'}
          </p>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'feedback' && renderFeedback()}
      </div>
    </div>
  );
};

export default ManagerDashboard;