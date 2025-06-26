import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Calendar, 
  Clock, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  ArrowLeft,
  Download,
  Filter,
  FileText
} from 'lucide-react';

/**
 * @typedef {Object} OrderItem
 * @property {number} id
 * @property {string} name
 * @property {number} quantity
 * @property {number} price
 * @property {boolean} eco
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} date
 * @property {string} time
 * @property {'delivered' | 'processing' | 'shipped'} status
 * @property {OrderItem[]} items
 * @property {number} total
 * @property {string} paymentMethod
 */

const OrderHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  
  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would be a fetch call to an API
    const mockOrders = [
      {
        id: 'ORD-2023-001',
        date: '2023-06-15',
        time: '14:30',
        status: 'delivered',
        total: 48.97,
        paymentMethod: 'Credit Card',
        items: [
          { id: 1, name: 'Organic Bananas', quantity: 2, price: 4.99, eco: true },
          { id: 2, name: 'Whole Grain Bread', quantity: 1, price: 3.49, eco: true },
          { id: 3, name: 'Greek Yogurt', quantity: 3, price: 5.99, eco: false },
          { id: 4, name: 'Free Range Eggs', quantity: 1, price: 6.99, eco: true },
          { id: 5, name: 'Organic Spinach', quantity: 1, price: 3.49, eco: true },
        ]
      },
      {
        id: 'ORD-2023-002',
        date: '2023-06-02',
        time: '10:15',
        status: 'delivered',
        total: 32.45,
        paymentMethod: 'Debit Card',
        items: [
          { id: 6, name: 'Almond Milk', quantity: 2, price: 4.29, eco: true },
          { id: 7, name: 'Organic Apples', quantity: 4, price: 1.99, eco: true },
          { id: 8, name: 'Whole Wheat Pasta', quantity: 2, price: 2.99, eco: false },
        ]
      },
      {
        id: 'ORD-2023-003',
        date: '2023-05-20',
        time: '16:45',
        status: 'delivered',
        total: 65.32,
        paymentMethod: 'Credit Card',
        items: [
          { id: 9, name: 'Organic Chicken', quantity: 1, price: 15.99, eco: true },
          { id: 10, name: 'Sweet Potatoes', quantity: 3, price: 2.49, eco: true },
          { id: 11, name: 'Quinoa', quantity: 1, price: 8.99, eco: true },
          { id: 12, name: 'Avocados', quantity: 4, price: 2.50, eco: true },
          { id: 13, name: 'Blueberries', quantity: 2, price: 5.99, eco: false },
        ]
      },
      {
        id: 'ORD-2023-004',
        date: '2023-05-10',
        time: '09:30',
        status: 'delivered',
        total: 28.75,
        paymentMethod: 'PayPal',
        items: [
          { id: 14, name: 'Almond Butter', quantity: 1, price: 9.99, eco: false },
          { id: 15, name: 'Brown Rice', quantity: 2, price: 3.49, eco: true },
          { id: 16, name: 'Organic Carrots', quantity: 1, price: 2.99, eco: true },
          { id: 17, name: 'Hummus', quantity: 1, price: 4.99, eco: false },
        ]
      },
      {
        id: 'ORD-2023-005',
        date: '2023-06-20',
        time: '11:20',
        status: 'processing',
        total: 53.67,
        paymentMethod: 'Credit Card',
        items: [
          { id: 18, name: 'Organic Salmon', quantity: 1, price: 18.99, eco: true },
          { id: 19, name: 'Mixed Greens', quantity: 2, price: 4.99, eco: true },
          { id: 20, name: 'Cherry Tomatoes', quantity: 1, price: 3.99, eco: true },
          { id: 21, name: 'Coconut Water', quantity: 3, price: 3.99, eco: false },
        ]
      },
      {
        id: 'ORD-2023-006',
        date: '2023-06-18',
        time: '13:45',
        status: 'shipped',
        total: 42.87,
        paymentMethod: 'Debit Card',
        items: [
          { id: 22, name: 'Grass-fed Beef', quantity: 1, price: 15.99, eco: true },
          { id: 23, name: 'Organic Broccoli', quantity: 2, price: 3.49, eco: true },
          { id: 24, name: 'Wild Rice', quantity: 1, price: 7.99, eco: false },
          { id: 25, name: 'Organic Oranges', quantity: 5, price: 1.29, eco: true },
        ]
      }
    ];
    setOrders(mockOrders);
  }, []);

  const ordersPerPage = 3;
  
  const filteredOrders = orders.filter(order => {
    // Apply status filter if selected
    if (statusFilter && order.status !== statusFilter) return false;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      // Search in order ID
      if (order.id.toLowerCase().includes(searchLower)) return true;
      
      // Search in items
      const hasMatchingItem = order.items.some(item => 
        item.name.toLowerCase().includes(searchLower)
      );
      
      if (hasMatchingItem) return true;
      return false;
    }
    
    return true;
  });
  
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };
  
  const renderOrderCard = (order) => {
    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    
    return (
      <div 
        key={order.id}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">{order.id}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{order.date}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{order.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Package className="h-4 w-4" />
            <span>{totalItems} items</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>{order.paymentMethod}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="font-bold text-lg text-gray-800">
            ${order.total.toFixed(2)}
          </div>
          <button 
            onClick={() => handleViewOrderDetails(order)}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };
  
  const renderOrderDetails = () => {
    if (!selectedOrder) return null;
    
    const ecoItems = selectedOrder.items.filter(item => item.eco).length;
    const ecoPercentage = Math.round((ecoItems / selectedOrder.items.length) * 100);
    
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-6">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handleBackToOrders}
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Orders</span>
          </button>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
              <Download className="h-4 w-4" />
              <span className="text-sm">Receipt</span>
            </button>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
              {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{selectedOrder.id}</h2>
          <p className="text-gray-600">
            Ordered on {selectedOrder.date} at {selectedOrder.time}
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedOrder.items.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          {item.eco && (
                            <div className="text-xs text-green-600 flex items-center mt-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              Eco-friendly
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <div className="md:w-1/2">
            <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800">${(selectedOrder.total * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax:</span>
                <span className="text-gray-800">${(selectedOrder.total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-gray-800">${selectedOrder.total.toFixed(2)}</span>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                Paid with {selectedOrder.paymentMethod}
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="font-semibold text-gray-800 mb-3">Eco Impact</h3>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-gray-700">Eco-friendly items:</span>
                <span className="font-bold text-green-600">{ecoItems} of {selectedOrder.items.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${ecoPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                {ecoPercentage >= 75
                  ? "Great job choosing eco-friendly products!"
                  : ecoPercentage >= 50
                  ? "Good eco-friendly choices, keep it up!"
                  : "Consider more eco-friendly options next time!"}
              </p>
            </div>
            
            <div className="mt-4">
              <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-2 rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300">
                Reorder These Items
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/customer')} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">Order History</span>
              </button>
            </div>
            <button
              onClick={() => navigate('/customer')}
              className="bg-white/90 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedOrder ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Order History</h1>
              <p className="text-gray-600">Track and manage all your past orders</p>
            </div>
            
            {/* Filters and Search */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm border border-gray-100 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">Filter by status:</span>
                <div className="flex space-x-2">
                  {['all', 'delivered', 'processing', 'shipped'].map(status => (
                    <button
                      key={status}
                      className={`px-3 py-1 rounded-full text-xs ${
                        (statusFilter === status || (status === 'all' && statusFilter === null))
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setStatusFilter(status === 'all' ? null : status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {currentOrders.length > 0 ? (
              <>
                {/* Order List */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                  {currentOrders.map(renderOrderCard)}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg ${
                        currentPage === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePageChange(idx + 1)}
                        className={`w-8 h-8 rounded-lg ${
                          currentPage === idx + 1
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg ${
                        currentPage === totalPages
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">No orders found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter
                    ? "No orders match your filter criteria. Try adjusting your search."
                    : "You haven't placed any orders yet. Start shopping to see your orders here."}
                </p>
                {(searchTerm || statusFilter) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter(null);
                    }}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          renderOrderDetails()
        )}
      </div>
    </div>
  );
};

export default OrderHistory;